import StoryListElement from 'linguin-shared/components/story/StoryListElement';
import UserStatistics from 'linguin-shared/components/user/UserStatistics';
import { useFilteredStories } from 'linguin-shared/context/storyListFilterContext';
import { useAuth } from 'linguin-shared/util/auth';
import { useVisibleStoriesInfinite } from 'linguin-shared/util/clientDb';
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import StoryListFilterMenu from './StoryListFilterMenu';
import { FeedbackModal } from './FeedbackModal';
import { useUserProfileContext } from 'linguin-shared/context/userProfileContext';
import { useLanguageContext } from 'linguin-shared/context/languageContext';

export interface Filter {
    id: string;
    name: string;
    activeValues: string[];
    setActiveValues: (v: string[]) => void;
    options: FilterOption[];
}

export interface BooleanFilter {
    id: string;
    name: string;
    activeValue: boolean;
    setActiveValue: (v: boolean) => void;
}

export interface FilterOption {
    value: string;
    label: string;
}


export default function StoryList({ navigation }) {
    const auth = useAuth();
    const { userProfile } = useUserProfileContext();
    const {
        data: stories,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
    } = useVisibleStoriesInfinite(userProfile.targetLanguage);
    const filteredStories = useFilteredStories(stories?.pages?.flat() ?? []);

    if (isLoading) {
        if (auth?.user) {
            return <ActivityIndicator size="large" color="#0000ff" />;
        }
    }
    return (
        <>
            <StoryListFilterMenu navigation={navigation} />
            {!isLoading &&
                <>
                    {auth?.user && <UserStatistics language={userProfile.targetLanguage} />}
                    <FlatList
                        data={filteredStories}
                        renderItem={({ item: storyListEntity, separators }) => {
                            if (!storyListEntity) return null;
                            return <TouchableOpacity className="bg-white border-b border-gray-200"
                                onPress={() => {
                                    navigation.navigate("Story", { storyTranslationId: storyListEntity.storyTranslationId, storyTitle: storyListEntity.title });
                                }}>
                                <StoryListElement storyListEntity={storyListEntity} />
                            </TouchableOpacity>
                        }}
                        keyExtractor={item => item?.id}
                        onEndReached={() => {
                            if (hasNextPage) fetchNextPage();
                        }}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={
                            hasNextPage ? <ActivityIndicator size="large" color="#0000ff" /> : null
                        }
                        removeClippedSubviews={true}
                    />
                </>
            }
            <FeedbackModal />
        </>
    );
}