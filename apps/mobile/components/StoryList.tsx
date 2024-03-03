import StoryListElement from 'linguin-shared/components/story/StoryListElement';
import UserStatistics from 'linguin-shared/components/user/UserStatistics';
import { useFilteredStories } from 'linguin-shared/context/storyListFilterContext';
import { useVisibleStories } from 'linguin-shared/util/clientDb';
import { FlatList, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import StoryListFilterMenu from './StoryListFilterMenu';

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
    const { data: stories, isSuccess: loaded } = useVisibleStories();
    const filteredStories = useFilteredStories(stories ?? []);

    if (!loaded) {
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
                                onPress={() => navigation.navigate("Story", { storyId: story.id, storyTitle: story.title })}>
                                <StoryListElement story={story} />
                            </TouchableOpacity>}
                        keyExtractor={item => item.id}
                    />
                </>
            }
        </>
    );
}