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

export default function StoryScreen({ route, navigation }) {
  const { storyId } = route.params;
  const { data: story, isSuccess: loaded } = useStory(storyId);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RnSoundContext.Provider value={Sound}>
        <ReadUsageContextProvider story={story}>
          <StoryAudioContextProvider>
            <ScrollView contentContainerStyle={styles.container}>
              <RnTouchableContextProvider>
                {loaded && <Story story={story} />}
              </RnTouchableContextProvider>
            </ScrollView>
            {loaded &&
              <StoryAudioPlayer src={story.audioUrl} />}
          </StoryAudioContextProvider>
        </ReadUsageContextProvider>
      </RnSoundContext.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    marginLeft: 10,
    marginRight: 10,
  },
});
