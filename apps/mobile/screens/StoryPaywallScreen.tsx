import { useStoriesAvailable } from 'linguin-shared/context/rnStoriesAvailableContext';
import { useSubscribedContext } from 'linguin-shared/context/subscribedContext';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import RevenueCatUI from 'react-native-purchases-ui';

export default function PaywallScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const { storyTranslationId, storyTitle } = route.params;
  const { subscribed, setSubscribed, subscribedLoaded } = useSubscribedContext();
  const { storiesAvailable, storiesAvailableLoaded } = useStoriesAvailable();

  const goToStory = () => {
    setIsLoading(true);
    navigation.replace('Story', { storyTranslationId: storyTranslationId, storyTitle: storyTitle })
  };

  const onPurchaseCompleted = () => {
    setSubscribed(true);
    goToStory();
  }

  useEffect(() => {
    if ((subscribedLoaded && subscribed) || (storiesAvailableLoaded && storiesAvailable > 0)) {
      goToStory();
    }
  }, [storiesAvailable, storiesAvailableLoaded, subscribed, subscribedLoaded]);
  
  if (isLoading) return <ActivityIndicator />;

  return (
    <View style={{ flex: 1, marginBottom: "20%" }}>
      <RevenueCatUI.Paywall
        onPurchaseCompleted={onPurchaseCompleted}
       />
    </View>
  );
}