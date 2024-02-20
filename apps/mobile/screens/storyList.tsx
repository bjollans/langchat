import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';
import { useStory } from 'linguin-shared/util/clientDb';
import Story from 'linguin-shared/components/story/Story';
import { RnSoundContext } from 'linguin-shared/context/rnSoundContext';
import RnTouchableContextProvider from 'linguin-shared/context/rnTouchableContext';
import Sound from 'react-native-sound';
import StoryAudioContextProvider from 'linguin-shared/context/storyAudioContext';
import StoryAudioPlayer from 'linguin-shared/components/audio/StoryAudioPlayer';
import ReadUsageContextProvider from 'linguin-shared/context/trackReadContext';
import StoryListElement from 'linguin-shared/components/story/StoryListElement';

export default function StoryListScreen() {
  const { data: story, isSuccess: loaded } = useStory("d02258d7-e59c-4c5a-9c08-a627187ab6ae");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loaded && <StoryListElement story={story} />}
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
