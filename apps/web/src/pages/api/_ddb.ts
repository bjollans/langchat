import { AttributeValue, DynamoDBClient, UpdateItemCommand, PutItemCommand, GetItemCommand, Get } from "@aws-sdk/client-dynamodb";
import { Language } from "@linguin-shared/types/language";
import { DailyUserReadStat } from "linguin-shared/model/stats";

const client = new DynamoDBClient({ region: "eu-west-1" });

export async function upsertUserStat(stat: DailyUserReadStat) {
    for (let i = 0; i < 3; i++) {
        try {
            await _putOrUpdateStat(stat);
            break;
        } catch (error: any) {
            if (error.name === "ConditionalCheckFailedException" && i < 2) {
                await new Promise((resolve) => setTimeout(resolve, 100));
            } else {
                throw error;
            }
        }
    }
}

export async function getUserStats(userId: string, date: string, language: Language): Promise<DailyUserReadStat> {
    const item = await _getItem(userId, date, language);
    if (item) {
        return _mapRecordToStat(item);
    } else {
        return {
            userId: userId,
            date: date,
            language: language,
            wordsSeen: [],
            wordsSeenCount: 0,
            wordsLookedUp: [],
            wordsLookedUpCount: 0,
            storiesViewed: [],
            storiesViewedCount: 0,
            lastUpdatedAt: new Date(),
        };
    }
}

async function _putOrUpdateStat(stat: DailyUserReadStat) {
    const item = await _getItem(stat.userId, stat.date, stat.language);
    if (item) {
        const statToUpdate = _mapRecordToStat(item);
        statToUpdate.wordsSeen = Array.from(new Set([...statToUpdate.wordsSeen, ...stat.wordsSeen]));
        statToUpdate.wordsSeenCount = statToUpdate.wordsSeen.length;
        statToUpdate.wordsLookedUp = Array.from(new Set([...statToUpdate.wordsLookedUp, ...stat.wordsLookedUp]));
        statToUpdate.wordsLookedUpCount = statToUpdate.wordsLookedUp.length;
        statToUpdate.storiesViewed = Array.from(new Set([...statToUpdate.storiesViewed, ...stat.storiesViewed]));
        statToUpdate.storiesViewedCount = statToUpdate.storiesViewed.length;
        statToUpdate.lastUpdatedAt = new Date();
        const statToUpdateRecord = _mapStatToRecord(statToUpdate);
        await _updateItem(statToUpdate.userId, statToUpdate.date, statToUpdate.language, statToUpdateRecord);
    } else {
        const statToPut = _mapStatToRecord(stat);
        await _putItem(stat.userId, stat.date, stat.language, statToPut);
    }
}

function _mapStatToRecord(stat: DailyUserReadStat): Record<string, AttributeValue> {
    const record: Record<string, AttributeValue> = {
        lastUpdatedAt: { S: stat.lastUpdatedAt.toISOString() },
    };
    if (stat.wordsSeen.length > 0) {
        record.wordsSeen = { SS: Array.from(stat.wordsSeen) };
        record.wordsSeenCount = { N: stat.wordsSeenCount.toString() };
    }
    if (stat.wordsLookedUp.length > 0) {
        record.wordsLookedUp = { SS: Array.from(stat.wordsLookedUp) };
        record.wordsLookedUpCount = { N: stat.wordsLookedUpCount.toString() };
    }
    if (stat.storiesViewed.length > 0) {
        record.storiesViewed = { SS: Array.from(stat.storiesViewed) };
        record.storiesViewedCount = { N: stat.storiesViewedCount.toString() };
    }
    return record;
}


function _mapRecordToStat(record: Record<string, AttributeValue>): DailyUserReadStat {
    return {
        userId: record.userId.S!,
        date: record.date_and_language.S!.split("_")[0],
        language: record.date_and_language.S!.split("_")[1] as Language,
        wordsSeen: Array.from(new Set(record.wordsSeen?.SS ?? [])),
        wordsSeenCount: parseInt(record.wordsSeenCount?.N ?? "0"),
        wordsLookedUp: Array.from(new Set(record.wordsLookedUp?.SS ?? [])),
        wordsLookedUpCount: parseInt(record.wordsLookedUpCount?.N ?? "0"),
        storiesViewed: Array.from(new Set(record.storiesViewed?.SS ?? [])),
        storiesViewedCount: parseInt(record.storiesViewedCount?.N ?? "0"),
        lastUpdatedAt: new Date(record.lastUpdatedAt.S!),
    }
};


async function _getItem(userId: string, date: string, language: Language): Promise<Record<string, AttributeValue> | undefined> {
    const command = new GetItemCommand({
        TableName: "linguin-user-stats",
        Key: {
            userId: { S: userId },
            date_and_language: { S: `${date}_${language}` },
        },
    });
    const response = await client.send(command);
    return response.Item;
}

async function _updateItem(userId: string, date: string, language: Language, data: Record<string, any>) {
    let updateExpression = 'SET ';
    const expressionAttributeValues = {};
    const expressionAttributeNames = {};

    Object.keys(data).forEach((key) => {
        const attributeName = `#attr${key}`;
        const attributeValueKey = `:val${key}`;
        updateExpression += `${attributeName} = ${attributeValueKey}, `;
        expressionAttributeValues[attributeValueKey] = data[key];
        expressionAttributeNames[attributeName] = key;
    });

    // Remove the trailing comma and space
    updateExpression = updateExpression.slice(0, -2);

    console.log(expressionAttributeValues);

    const command = new UpdateItemCommand({
        TableName: "linguin-user-stats",
        Key: {
            userId: { S: userId },
            date_and_language: { S: `${date}_${language}` },
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        // if lastUpdateAt is greater than the previous lastUpdateAt, update the item
        ConditionExpression: "lastUpdatedAt < :vallastUpdatedAt",
    });

    await client.send(command);
}

async function _putItem(userId: string, date: string, language: Language, data: Record<string, any>) {
    const command = new PutItemCommand({
        TableName: "linguin-user-stats",
        Item: {
            userId: { S: userId },
            date_and_language: { S: `${date}_${language}` },
            ...data,
        },
    });
    await client.send(command);
}

