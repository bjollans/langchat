import StoryListFilterContextProvider from 'linguin-shared/context/storyListFilterContext';
import { SafeAreaView } from 'react-native';
import StoryList from '../components/StoryList';
import usePostHog from 'linguin-shared/util/usePostHog';
import { useAuth } from 'linguin-shared/util/auth';
import { useEffect } from 'react';

export default function StoryListScreen({ navigation }) {
  const posthog = usePostHog();
  const auth = useAuth();

  useEffect(() => {
    if (!auth?.user?.uid || !posthog) return;
    posthog?.identify(auth?.user?.uid,
      {
        email: auth?.user?.email,
      });
  }, [auth, posthog]);

  return (
    <StoryListFilterContextProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StoryList navigation={navigation} />
      </SafeAreaView>
    </StoryListFilterContextProvider>
  );
}
