import StoryListElement from 'linguin-shared/components/story/StoryListElement';
import UserStatistics from 'linguin-shared/components/user/UserStatistics';
import { useFilteredStories } from 'linguin-shared/context/storyListFilterContext';
import { useUserStoriesReadAutomatic, useVisibleStories } from 'linguin-shared/util/clientDb';
import { FlatList, TouchableOpacity } from 'react-native';
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
    const { data: stories, isSuccess: loaded } = useVisibleStories();
    const filteredStories = useFilteredStories(stories ?? []);
    const { subscribed, subscribedLoaded } = useSubscribedContext();
    const { storiesAvailable, storiesAvailableLoaded } = useStoriesAvailable();
    const { data: userStoriesRead, isSuccess: userStoriesReadLoaded } = useUserStoriesReadAutomatic(auth?.user?.uid ?? null);
    const hasStories = storiesAvailable > 0 || subscribed;

    if (!loaded || !subscribedLoaded || !storiesAvailableLoaded || !userStoriesReadLoaded) {
        return <Spinner
            visible={true}
            textContent={'Loading...'}
            textStyle={{ color: '#FFF' }}
        />;
    }
    return (
        <>
            <StoryListFilterMenu navigation={navigation} />
            {loaded &&
                <>
                    <UserStatistics />
                    <FlatList
                        data={filteredStories}
                        renderItem={({ item: story, separators }) =>
                            <TouchableOpacity className="bg-white border-b border-gray-200"
                                onPress={() => {
                                    console.log('story', story.id, story.title);
                                    const hasAlreadyReadStory = userStoriesRead?.map(x => x.storyId).includes(story.id);
                                    navigation.navigate(hasStories || hasAlreadyReadStory ? "Story" : "StoryPaywall", { storyId: story.id, storyTitle: story.title });
                                }}>
                                <StoryListElement story={story} />
                            </TouchableOpacity>}
                        keyExtractor={item => item.id}
                    />
                </>
            }
        </>
    );
}