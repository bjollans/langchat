import MenuDrawer from 'linguin-shared/components/MenuDrawer';
import StoryListElement from 'linguin-shared/components/story/StoryListElement';
import { useFilteredStories, useStoryFilterContext } from 'linguin-shared/context/storyListFilterContext';
import { useCollectionNames, useVisibleStories, useAvailableStoryDifficultyLevels } from 'linguin-shared/util/clientDb';
import { useEffect, useState } from 'react';
import { FlatList, SectionList, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useAuth } from 'linguin-shared/util/auth';
import { CheckBox } from 'react-native-elements';
import UserStatistics from 'linguin-shared/components/user/UserStatistics';
import Spinner from 'react-native-loading-spinner-overlay';

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
    const { data: allCollections } = useCollectionNames();
    const { data: allDifficulties } = useAvailableStoryDifficultyLevels();
    const filteredStories = useFilteredStories(stories ?? []);
    const { showRead, setShowRead, difficulties, setDifficulties, collectionNames, setCollectionNames, setAllCollectionNames, setAllDifficulties } = useStoryFilterContext();

    const allCollectionNames = allCollections?.map((collection: any) => collection.name);

    useEffect(() => {
        setAllDifficulties(allDifficulties);
        setAllCollectionNames(allCollectionNames);
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        var isOpenClosureState = false;
        navigation.setParams({
            filterButton: () => (
                <TouchableOpacity
                    onPress={() => {
                        isOpenClosureState = !isOpenClosureState;
                        setIsOpen(isOpenClosureState);
                    }}
                >
                    <_FilterIcon />
                </TouchableOpacity>
            )
        });
    }, []);

    const booleanFilters: Array<BooleanFilter> = [];

    if (auth?.user) {
        booleanFilters.push({
            id: 'showRead',
            name: 'Show Read',
            activeValue: showRead,
            setActiveValue: setShowRead,
        });
    }


    const filters: Array<Filter> = [
        {
            id: 'difficulty',
            name: 'Difficulty',
            activeValues: difficulties,
            setActiveValues: setDifficulties,
            options:
                allDifficulties?.map((difficulty: string) => { return { value: difficulty, label: difficulty }; })
        },
        {
            id: 'collection',
            name: 'Topic',
            activeValues: collectionNames,
            setActiveValues: setCollectionNames,
            options:
                allCollectionNames?.map((collectionName: string) => { return { value: collectionName, label: collectionName }; })
        }
    ];

    const sections = filters.map((filter) => {
        return {
            title: filter.name,
            data: filter.options,
        };
    });

    if (!loaded) {
        return <Spinner
            visible={true}
            textContent={'Loading...'}
            textStyle={{ color: '#FFF' }}
        />;
    }
    return (
        <>
            <MenuDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
                {allDifficulties && allCollectionNames &&
                    <>
                        <FlatList
                            className="grow-0 w-full"
                            data={booleanFilters}
                            renderItem={({ item }) => (
                                <CheckBox
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, padding: 0 }}
                                    checked={item.activeValue}
                                    checkedColor='green'
                                    onPress={() => item.setActiveValue(!item.activeValue)}
                                    title={item.name}
                                />
                            )}
                            keyExtractor={item => item.id}
                        />
                        <SectionList
                            className="w-full"
                            sections={sections}
                            renderItem={({ item, section }) => (
                                <FilterCheckboxItem filter={filters.find((f) => f.name == section.title)} item={item} />
                            )}
                            renderSectionHeader={({ section: { title } }) => (
                                <Text className="text-lg text-slate-600 font-semibold mx-2">
                                    {title}</Text>
                            )}
                            keyExtractor={(item, index) => item.label + index}
                        />
                    </>
                }
            </MenuDrawer>
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

const _FilterIcon = () => {
    return (<Svg height="24" viewBox="0 -960 960 960" width="24"><Path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z" /></Svg>);
}


function FilterCheckboxItem({ filter, item }) {
    return (
        <CheckBox
            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, padding: 0 }}
            checked={filter?.activeValues.includes(item.value)}
            checkedColor='green'
            onPress={() => {
                const checked = filter?.activeValues.includes(item.value);
                if (checked) {
                    filter?.setActiveValues(filter.activeValues.filter((v) => v != item.value));
                } else {
                    filter?.setActiveValues([...filter.activeValues, item.value]);
                }
            }}
            title={item.label}
        />
    );
}