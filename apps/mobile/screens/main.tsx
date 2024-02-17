import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';
import { useStory } from 'linguin-shared/util/clientDb';
import Story from 'linguin-shared/components/story/Story';
import { RnSoundContext } from 'linguin-shared/context/rnSoundContext';
import RnTouchableContextProvider from 'linguin-shared/context/rnTouchableContext';
import Sound from 'react-native-sound';
import StoryAudioContextProvider from 'linguin-shared/context/storyAudioContext';

export default function Main() {
  const { data: story, isSuccess: loaded } = useStory("d02258d7-e59c-4c5a-9c08-a627187ab6ae");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RnSoundContext.Provider value={Sound}>
        <StoryAudioContextProvider>
          <ScrollView contentContainerStyle={styles.container}>
            <RnTouchableContextProvider>
              {loaded && <Story story={story} />}
            </RnTouchableContextProvider>
          </ScrollView>
        </StoryAudioContextProvider>
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
  },
});
