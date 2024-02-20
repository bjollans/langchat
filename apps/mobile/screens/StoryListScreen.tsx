import StoryListElement from 'linguin-shared/components/story/StoryListElement';
import { useVisibleStories } from 'linguin-shared/util/clientDb';
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';


export default function StoryListScreen({ navigation }) {
  const { data: stories, isSuccess: loaded } = useVisibleStories();
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
