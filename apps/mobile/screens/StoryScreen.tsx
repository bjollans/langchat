import StoryAudioPlayer from 'linguin-shared/components/audio/StoryAudioPlayer';
import Story from 'linguin-shared/components/story/Story';
import { RnSoundContext } from 'linguin-shared/context/rnSoundContext';
import RnTouchableContextProvider from 'linguin-shared/context/rnTouchableContext';
import StoryAudioContextProvider from 'linguin-shared/context/storyAudioContext';
import ReadUsageContextProvider from 'linguin-shared/context/trackReadContext';
import { useStory } from 'linguin-shared/util/clientDb';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';
import RequireAuth from '../components/RequireAuth';

export default function StoryScreen({ route, navigation }) {
  const { storyId } = route.params;
  const { data: story, isSuccess: loaded } = useStory(storyId);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RequireAuth navigation={navigation}>
        <RnSoundContext.Provider value={Sound}>
          {loaded &&
            <ReadUsageContextProvider story={story}>
              <StoryAudioContextProvider>
                <ScrollView contentContainerStyle={styles.container}>
                  <RnTouchableContextProvider>
                    {loaded && <Story story={story} navigation={navigation} />}
                  </RnTouchableContextProvider>
                </ScrollView>
                {loaded &&
                  <StoryAudioPlayer src={story.audioUrl} />}
              </StoryAudioContextProvider>
            </ReadUsageContextProvider>
            ||
            <ActivityIndicator size="large" color="#0000ff" />
          }
        </RnSoundContext.Provider>
      </RequireAuth>
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
