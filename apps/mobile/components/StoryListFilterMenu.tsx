import MenuDrawer from 'linguin-shared/components/MenuDrawer';
import { useStoryFilterContext } from 'linguin-shared/context/storyListFilterContext';
import { useAuth } from 'linguin-shared/util/auth';
import { useAvailableStoryDifficultyLevels, useCollectionNames } from 'linguin-shared/util/clientDb';
import { useEffect, useState } from 'react';
import { FlatList, SectionList, Text, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Svg, { Path } from 'react-native-svg';

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


export default function StoryListFilterMenu({ navigation }) {
    const auth = useAuth();
    const { data: allCollections } = useCollectionNames();
    const { data: allDifficulties } = useAvailableStoryDifficultyLevels();
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