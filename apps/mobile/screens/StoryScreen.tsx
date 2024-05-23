import StoryAudioPlayer from 'linguin-shared/components/audio/StoryAudioPlayer';
import Story from 'linguin-shared/components/story/Story';
import { RnSoundContext } from 'linguin-shared/context/rnSoundContext';
import RnTouchableContextProvider from 'linguin-shared/context/rnTouchableContext';
import StoryAudioContextProvider from 'linguin-shared/context/storyAudioContext';
import { useStory, useStoryTranslation } from 'linguin-shared/util/clientDb';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';
import RequireAuth from '../components/RequireAuth';

export default function StoryScreen({ route, navigation }) {
  const { storyTranslationId } = route.params;
  const { data: storyTranslation, isSuccess: storyTranslationLoaded } = useStoryTranslation(storyTranslationId);
  const { data: story, isSuccess: storyLoaded } = useStory(storyTranslation?.storyId);
  const loaded = storyTranslationLoaded && storyLoaded;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RequireAuth navigation={navigation}>
        <RnSoundContext.Provider value={Sound}>
          {loaded &&
              <StoryAudioContextProvider>
                <ScrollView contentContainerStyle={styles.container}>
                  <RnTouchableContextProvider>
                    {loaded && <Story story={story} storyTranslation={storyTranslation} navigation={navigation} />}
                  </RnTouchableContextProvider>
                </ScrollView>
                {loaded &&
                  <StoryAudioPlayer src={storyTranslation.audioUrl} />}
              </StoryAudioContextProvider>
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
