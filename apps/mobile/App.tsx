import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Session } from '@supabase/supabase-js';
import StoriesAvailableContextProvider from 'linguin-shared/context/rnStoriesAvailableContext';
import SubscribedContextProvider from 'linguin-shared/context/subscribedContext';
import { AuthProvider } from 'linguin-shared/util/auth';
import { QueryClientProvider } from 'linguin-shared/util/clientDb';
import supabase from 'linguin-shared/util/supabase';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';
import Purchases from 'react-native-purchases';
import 'react-native-url-polyfill/auto';
import AuthForm from './components/AuthForm';
import StoryListScreen from './screens/StoryListScreen';
import StoryPaywallScreen from './screens/StoryPaywallScreen';
import Story from './screens/StoryScreen';

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })
  }, []);

  useEffect(() => {
    if (session?.user) {
      console.log("Setting up purchases for user", session.user.email);
      const apiKey = Platform.OS == "ios" ? "ios" : "goog_vgtgqumQvpccFSJWpKAzOgZsiHN";
      try { Purchases.configure({ apiKey: apiKey, appUserID: session.user.email }); }
      catch (e) {
        console.log('Error configuring purchases: ' + e);
      }
    }
  }, [session?.user]);

  useEffect(() => {
    mobileAds()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,

        // An array of test device IDs to allow.
        testDeviceIdentifiers: ['EMULATOR'],
      })
      .then(() => {
        // Request config successfully set!
      });
  }, []);


  if (!session || !session.user) return <AuthForm />;

  return (
    <QueryClientProvider>
      <AuthProvider>
        <SubscribedContextProvider>
          <StoriesAvailableContextProvider>
            <NavigationContainer className="relative z-80">
              <Stack.Navigator screenOptions={{
                headerTitleStyle: {
                  fontWeight: '700',
                  fontSize: 18,
                }
              }}>
                <Stack.Screen name="StoryList" component={StoryListScreen}
                  options={({ route }) => ({
                    title: "🇮🇳 Hindi Stories",
                    headerRight: (route.params as any)?.filterButton
                  })} />
                <Stack.Screen name="StoryPaywall" component={StoryPaywallScreen}
                  options={({ route }) => ({
                    title: "No Stories Left",
                    headerBackTitle: "Back"
                  })} />
                <Stack.Screen name="Story" component={Story}
                  options={({ route }) => ({
                    title: (route.params as any).storyTitle,
                    headerBackTitle: "Stories"
                  })} />
              </Stack.Navigator>
            </NavigationContainer>
          </StoriesAvailableContextProvider>
        </SubscribedContextProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
