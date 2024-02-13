import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useStory } from 'linguin-shared/util/clientDb';
import Story from 'linguin-shared/components/story/Story';

export default function Main() {
  const {data: story, isSuccess: loaded} = useStory("d02258d7-e59c-4c5a-9c08-a627187ab6ae");
  return (
    <View style={styles.container}>
      {loaded && <Story story={story} />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
