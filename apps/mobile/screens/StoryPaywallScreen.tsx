import { useStoriesAvailable } from 'linguin-shared/context/rnStoriesAvailableContext';
import { useSubscribedContext } from 'linguin-shared/context/subscribedContext';
import { useFeatureFlag } from 'posthog-react-native';
import { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import AdRewarderButton from '../components/AdRewarderButton';
import SubscribeButton from '../components/SubscribeButton';

export default function PaywallScreen({ navigation, route }) {
  const { storyId, storyTitle } = route.params;
  const { subscribed, subscribedLoaded } = useSubscribedContext();
  const { storiesAvailable, storiesAvailableLoaded } = useStoriesAvailable();
  const showAdBtnFirst = useFeatureFlag('flip_native_paywall_buttons');

  useEffect(() => {
    if ((subscribedLoaded && subscribed) || (storiesAvailableLoaded && storiesAvailable > 0)) {
      navigation.replace('Story', { storyId: storyId, storyTitle: storyTitle });
    }
  }, [storiesAvailable, storiesAvailableLoaded, subscribed, subscribedLoaded]);

  return (
    <View className="bg-white h-full px-8 py-4">
      <Text className="tracking-tight text-2xl font-bold text-center my-6">
        You have no free stories left
      </Text>
      <View className="p-4">
        <Image source={require('../assets/logoWithTransparency.png')} className="h-24 mx-auto" style={{ resizeMode: 'contain' }} />
      </View>
      {!showAdBtnFirst && <><Text className="tracking-tight text-4xl font-bold text-center mt-2 mb-2">
        Unlimited Reading
      </Text>
      <SubscribeButton />
      <Text className="tracking-tight text-2xl text-slate-600 font-bold text-center mt-4 mb-2">
        OR
      </Text>
      </>}
      <Text className="tracking-tight text-slate-600 text-2xl font-bold text-center mt-2 mb-2">
        Watch an Ad to Continue Reading
      </Text>
      <AdRewarderButton />
      {showAdBtnFirst && <><Text className="tracking-tight text-2xl text-slate-600 font-bold text-center mt-4 mb-2">
        OR
      </Text>
      <Text className="tracking-tight text-4xl font-bold text-center mt-2 mb-2">
        Unlimited Reading
      </Text>
      <SubscribeButton />
      </>}
      
    </View>
  );
}
