import { Btn, Div, Img, P, Span } from "linguin-shared/components/RnTwComponents";
import { StoryFilterChangeCalls, StoryListFilterContext } from "linguin-shared/context/storyListFilterContext";
import { StoryListEntity } from "linguin-shared/model/translations";
import { useAuth } from "linguin-shared/util/auth";
import { trackStat } from "linguin-shared/util/storyStatistics";
import { UserStoryStatistics, useUserStoryStatistics } from "linguin-shared/util/userStatistics";
import { useContext, useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import { Platform } from "react-native";
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import StoryCompletedCheckMark from "./StoryCompletedCheckMark";

export interface StoryListElementProps {
    storyListEntity: StoryListEntity;
}

export default function StoryListElement(props: StoryListElementProps) {
    const auth = useAuth();
    const userStoryStatistics: UserStoryStatistics = useUserStoryStatistics({ userId: auth?.user?.id ?? null, storyId: props.storyListEntity.id });
    const ageMs = new Date().getTime() - (new Date(props.storyListEntity.createdAt).getTime());
    const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));
    const isNew: boolean = ageDays < 7;
    const { styles } = useStyles(stylesheet, { difficulty: props.storyListEntity.difficulty })

    const [visibilityRef, hasBeenSeen] = useInView({
        threshold: 0.5,
        triggerOnce: true,
        delay: 1000,
    });

    useEffect(() => {
        if (hasBeenSeen) {
            trackStat(props.storyListEntity.id, "views");
        }
    }, [hasBeenSeen]);

    useEffect(() => {
        if (Platform.OS !== 'web') {
            trackStat(props.storyListEntity.id, "views");
        }
    }, []);

    const storyFilterChangeCalls: StoryFilterChangeCalls | undefined = useContext(StoryListFilterContext);

    return (
        <Div innerKey={props.storyListEntity.title}
            style={styles.container}
            innerRef={Platform.OS === 'web' ? visibilityRef : undefined}
            onClick={() => trackStat(props.storyListEntity.id, "clicks")}>
            <Div style={styles.listImage}>
                <Img style={styles.listImage} src={props.storyListEntity.previewImageUrl} alt="" />
            </Div>
            <Div>
                <Div style={styles.titleContainer}>
                    <P style={styles.titleText}>{props.storyListEntity.title}</P>
                    {isNew && <Span style={styles.isNewText}>
                        New
                    </Span>}
                </Div>
                <Div style={styles.informationContainer}>
                    <Div>
                        <Div style={styles.wordCountContainer}>
                            <P style={styles.wordCountHeadingText}>
                                Words:
                                <Span style={styles.wordCountContentText}> {props.storyListEntity.wordCount}</Span>
                            </P>
                            {!userStoryStatistics.hasRead && <P style={styles.wordCountHeadingText}>
                                New:
                                <Span style={styles.wordCountContentText}> {userStoryStatistics.newWords} ({userStoryStatistics.newWordsPercentage}%)</Span>
                            </P>}
                        </Div>
                        <P style={styles.previewText}>{props.storyListEntity.content?.slice(0, 24) + '....'}</P>
                    </Div>
                </Div>

                <Div style={styles.filterButtonContainer}>
                    <Btn
                        key={`${props.storyListEntity.id}-difficulty`}
                        style={styles.difficultyButton}
                        onClick={(e) => {
                            if (!storyFilterChangeCalls) return;
                            e.preventDefault();
                            if (storyFilterChangeCalls!.difficulties.includes(props.storyListEntity.difficulty)) {
                                storyFilterChangeCalls!.onDifficultyRemove(props.storyListEntity.difficulty);
                                return;
                            }
                            storyFilterChangeCalls!.onDifficultyAdd(props.storyListEntity.difficulty);
                        }}
                    >
                        {props.storyListEntity.difficulty}
                    </Btn>
                    {props.storyListEntity.collections?.map((collectionName: any) => <Btn key={props.storyListEntity.title + collectionName}
                        style={styles.collectionFilterButton}
                        onClick={(e) => {
                            e.preventDefault();
                            if (storyFilterChangeCalls!.collectionNames.includes(collectionName)) {
                                storyFilterChangeCalls!.onCollectionRemove(collectionName);
                                return;
                            }
                            storyFilterChangeCalls!.onCollectionAdd(collectionName);
                        }}
                    >
                        {collectionName}
                    </Btn>)}
                </Div>
            </Div>
        </Div>
    );
}

const stylesheet = createStyleSheet((theme: any) => ({
    container: { display: 'flex', flexDirection: 'row', padding: 20, gap: 16, alignItems: 'center', cursor: 'pointer' },
    informationContainer: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 32 },
    listImage: { width: 96, height: 96, objectFit: 'cover', borderRadius: 9999, overflow: 'hidden' },
    difficultyButton: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 8,
        paddingLeft: 8,
        fontSize: 12,
        fontWeight: '500',
        borderRadius: 9999,
        marginRight: 8,
        borderWidth: 1,
        borderStyle: 'solid',
        variants: {
            difficulty: {
                Easy: { backgroundColor: '#e7f5e5', color: '#065f46', borderColor: 'rgba(22, 200, 115, 0.2)' },
                Intermediate: { backgroundColor: '#ebf5ff', color: '#2563eb', borderColor: 'rgba(59, 130, 246, 0.1)' },
                Hard: { backgroundColor: '#f3effb', color: '#7e22ce', borderColor: 'rgba(139, 92, 246, 0.1)' },
            }
        }
    },
    wordCountContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8
    },
    wordCountHeadingText: {
        margin: 4,
        fontSize: 12,
        lineHeight: Platform.OS == "web" ? 1 : 16,
        fontWeight: 'bold',
        color: '#6b7280'
    },
    wordCountContentText: {
        margin: 4,
        fontSize: 12,
        lineHeight: Platform.OS == "web" ? 1 : 16,
        color: '#9ca3af'
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8
    },
    titleText: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: Platform.OS == "web" ? 2 : 24,
        color: '#1f2937'
    },
    previewText: {
        maxWidth: '80%',
        margin: 4,
        fontStyle: 'italic',
        fontSize: 12,
        lineHeight: Platform.OS == "web" ? 1 : 16,
        color: '#9ca3af'
    },
    isNewText: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 9999,
        backgroundColor: '#e7f5e5',
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 2,
        paddingBottom: 2,
        fontSize: 12,
        fontWeight: '500',
        color: '#065f46',
        borderColor: 'rgba(22, 200, 115, 0.2)',
        borderStyle: 'solid',
        borderWidth: 1
    },
    filterButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 16,
        fontSize: 14,
        lineHeight: Platform.OS == "web" ? 1 : 16,
        color: '#6b7280',
        borderRadius: 9999,
        overflow: 'hidden'
    },
    collectionFilterButton: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 8,
        paddingLeft: 8,
        fontSize: 12,
        fontWeight: '500',
        borderRadius: 9999,
        backgroundColor: '#f8fafc',
        color: '#6b7280',
        borderColor: 'rgba(107, 114, 128, 0.1)',
        marginRight: 8,
        borderWidth: 1,
        borderStyle: 'solid',
    }
}));