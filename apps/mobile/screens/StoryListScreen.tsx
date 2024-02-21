import StoryListElement from 'linguin-shared/components/story/StoryListElement';
import { useVisibleStories } from 'linguin-shared/util/clientDb';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MenuDrawer from 'linguin-shared/components/MenuDrawer';
import Svg, { Path } from 'react-native-svg';


export default function StoryListScreen({ navigation }) {
  const { data: stories, isSuccess: loaded } = useVisibleStories();

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MenuDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
      {loaded &&
        <FlatList
          data={stories}
          renderItem={({ item: story, separators }) =>
            <TouchableOpacity className="bg-white border-b border-gray-200"
              onPress={() => navigation.navigate("Story", { storyId: story.id, storyTitle: story.title })}>
              <StoryListElement story={story} />
            </TouchableOpacity>}
          keyExtractor={item => item.id}
        />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
});


const _FilterIcon = () => {
  return (<Svg height="24" viewBox="0 -960 960 960" width="24"><Path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z"/></Svg>);
}
