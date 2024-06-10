import { StoryFilterChangeCalls, StoryListFilterContext } from "linguin-shared/context/storyListFilterContext";
import { StoryListEntity } from "linguin-shared/model/translations";
import { useContext, useEffect } from "react";
import { useAuth } from "linguin-shared/util/auth";
import { UserStoryStatistics, useUserStoryStatistics } from "linguin-shared/util/userStatistics";
import StoryCompletedCheckMark from "./StoryCompletedCheckMark";
import { useInView } from 'react-intersection-observer';
import { trackStat } from "linguin-shared/util/storyStatistics";
import { Div, Span, P, Btn, Img } from "linguin-shared/components/RnTwComponents";
import { Platform } from "react-native";

export interface StoryListElementProps {
    storyListEntity: StoryListEntity;
}

export default function StoryListElement(props: StoryListElementProps) {
    const auth = useAuth();
    const userStoryStatistics: UserStoryStatistics = useUserStoryStatistics({ userId: auth?.user?.id ?? null, storyId: props.storyListEntity.id });
    const ageMs = new Date().getTime() - (new Date(props.storyListEntity.createdAt).getTime());
    const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));
    const isNew: boolean = ageDays < 7;

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

    const difficultyColor = {
        "easy": { backgroundColor: '#e7f5e5', color: '#065f46', borderColor: 'rgba(22, 200, 115, 0.2)' },
        "intermediate": { backgroundColor: '#ebf5ff', color: '#2563eb', borderColor: 'rgba(59, 130, 246, 0.1)' },
        "hard": { backgroundColor: '#f3effb', color: '#7e22ce', borderColor: 'rgba(139, 92, 246, 0.1)' },
    }

    const storyFilterChangeCalls: StoryFilterChangeCalls | undefined = useContext(StoryListFilterContext);

    return (
        <Div innerKey={props.storyListEntity.title} style={{ display: 'flex', flexDirection: 'row', padding: 20, gap: 16, alignItems: 'center', cursor: 'pointer' }} innerRef={Platform.OS === 'web' ? visibilityRef : undefined} onClick={() => trackStat(props.storyListEntity.id, "clicks")}>
            {Platform.OS === 'web' &&
                <Img style={{ width: 96, height: 96, objectFit: 'cover', borderRadius: 9999, overflow: 'hidden' }} src={props.storyListEntity.previewImageUrl} alt="" />
                || <Div style={{ borderRadius: 9999, overflow: 'hidden' }}>
                    <Img style={{ width: 96, height: 96, objectFit: 'cover', borderRadius: 9999 }} src={props.storyListEntity.previewImageUrl} alt="" />
                </Div>
            }
            <Div style={{ flex: 1 }}>
                <Div style={{ minWidth: 0 }}>
                    <Div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                        <P style={{ fontSize: 18, fontWeight: '600', lineHeight: 24, color: '#1f2937' }}>{props.storyListEntity.title}</P>
                        {isNew && <Span style={{ display: 'flex', alignItems: 'center', borderRadius: 9999, backgroundColor: '#e7f5e5', paddingLeft: 6, paddingRight: 6, paddingTop: 2, paddingBottom: 2, fontSize: 12, fontWeight: '500', color: '#065f46', borderColor: 'rgba(22, 200, 115, 0.2)', borderStyle: 'solid', borderWidth: 1 }}>
                            New
                        </Span>}
                    </Div>
                    <Div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 32 }}>
                        <Div>
                            <Div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                                <P style={{ margin: 4, fontSize: 12, lineHeight: 16, fontWeight: 'bold', color: '#6b7280' }}>
                                    Words:
                                    <Span style={{ margin: 4, fontSize: 12, lineHeight: 16, color: '#9ca3af' }}> {props.storyListEntity.wordCount}</Span>
                                </P>
                                {!userStoryStatistics.hasRead && <P style={{ margin: 4, fontSize: 12, lineHeight: 16, fontWeight: 'bold', color: '#6b7280' }}>
                                    New:
                                    <Span style={{ margin: 4, fontSize: 12, lineHeight: 16, color: '#9ca3af' }}> {userStoryStatistics.newWords} ({userStoryStatistics.newWordsPercentage}%)</Span>
                                </P>}
                            </Div>
                            <P style={{ margin: 4, fontStyle: 'italic', fontSize: 12, lineHeight: 16, color: '#9ca3af' }}>{props.storyListEntity.content?.slice(0, 30) + '....'}</P>
                        </Div>
                        <StoryCompletedCheckMark storyId={props.storyListEntity.id} />
                    </Div>
                </Div>
                <Div style={{ display: 'flex', flexDirection: 'row', marginTop: 16, fontSize: 14, lineHeight: 20, color: '#6b7280', borderRadius: 9999, overflow: 'hidden' }}>
                    <Btn
                        key={`${props.storyListEntity.id}-difficulty`}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '4px 8px',
                            fontSize: 12,
                            fontWeight: '500',
                            borderRadius: 9999,
                            borderColor: difficultyColor[props.storyListEntity?.difficulty?.toLowerCase()].borderColor,
                            backgroundColor: difficultyColor[props.storyListEntity?.difficulty?.toLowerCase()].backgroundColor,
                            color: difficultyColor[props.storyListEntity?.difficulty?.toLowerCase()].color,
                            marginRight: 8,
                            borderWidth: 1,
                            borderStyle: 'solid'
                        }}
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
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '4px 8px',
                            fontSize: 12,
                            fontWeight: '500',
                            borderRadius: 9999,
                            backgroundColor: '#f8fafc',
                            color: '#6b7280',
                            borderColor: 'rgba(107, 114, 128, 0.1)',
                            marginRight: 8,
                            borderWidth: 1,
                            borderStyle: 'solid',
                        }}
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