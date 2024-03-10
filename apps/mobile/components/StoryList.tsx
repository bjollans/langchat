import StoryListElement from 'linguin-shared/components/story/StoryListElement';
import UserStatistics from 'linguin-shared/components/user/UserStatistics';
import { useFilteredStories } from 'linguin-shared/context/storyListFilterContext';
import { useUserStoriesReadAutomatic, useVisibleStoriesInfinite } from 'linguin-shared/util/clientDb';
import { FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import StoryListFilterMenu from './StoryListFilterMenu';
import { useSubscribedContext } from 'linguin-shared/context/subscribedContext';
import { useStoriesAvailable } from 'linguin-shared/context/rnStoriesAvailableContext';
import { useAuth } from 'linguin-shared/util/auth';

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
    const {
        data: stories,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
    } = useVisibleStoriesInfinite();
    const filteredStories = useFilteredStories(stories?.pages?.flat() ?? []);
    const { subscribed, subscribedLoaded } = useSubscribedContext();
    const { storiesAvailable, storiesAvailableLoaded } = useStoriesAvailable();
    const { data: userStoriesRead, isSuccess: userStoriesReadLoaded } = useUserStoriesReadAutomatic(auth?.user?.uid ?? null);
    const hasStories = storiesAvailable > 0 || subscribed;

    if (isLoading || !subscribedLoaded || !storiesAvailableLoaded || !userStoriesReadLoaded) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return (
        <>
            <StoryListFilterMenu navigation={navigation} />
            {!isLoading &&
                <>
                    <UserStatistics />
                    <FlatList
                        data={filteredStories}
                        renderItem={({ item: story, separators }) => {
                            const hasAlreadyReadStory = userStoriesRead?.map(x => x.storyId).includes(story.id);
                            return <TouchableOpacity className="bg-white border-b border-gray-200"
                                onPress={() => {
                                    navigation.navigate(hasStories || hasAlreadyReadStory ? "Story" : "StoryPaywall", { storyId: story.id, storyTitle: story.title });
                                }}>
                                <StoryListElement story={story} />
                            </TouchableOpacity>
                        }}
                        keyExtractor={item => item.id}
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
        </>
    );
}