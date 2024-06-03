import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Session } from '@supabase/supabase-js';
import SubscribedContextProvider from 'linguin-shared/context/subscribedContext';
import TargetLanguageContextProvider from 'linguin-shared/context/targetLanguageContext';
import { AuthProvider } from 'linguin-shared/util/auth';
import { QueryClientProvider } from 'linguin-shared/util/clientDb';
import supabase from 'linguin-shared/util/supabase';
import { PostHogProvider } from 'posthog-react-native';
import { useEffect, useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';
import Purchases from 'react-native-purchases';
import Svg, { Path } from 'react-native-svg';
import 'react-native-url-polyfill/auto';
import AccountScreen from './screens/AccountScreen';
import StoryListScreen from './screens/StoryListScreen';
import Story from './screens/StoryScreen';
import { initNotifications, scheduleReminderNotification } from './util/notifications';
import * as Sentry from '@sentry/react-native';
import StoryListTitle from './components/StoryListTitle';

Sentry.init({
  dsn: 'https://4a146848a62a8271f335ecdcc6ea9c5a@o4505409086095360.ingest.us.sentry.io/4506970903805952',
  debug: false,
});

const Stack = createNativeStackNavigator();

function App() {

  const [session, setSession] = useState<Session | null>(null)

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
      const apiKey = Platform.OS == "ios" ? "appl_XlxNBuuhOlCAfoGCZelGwgmmRTS" : "goog_vgtgqumQvpccFSJWpKAzOgZsiHN";
      try {
        Purchases.configure({ apiKey: apiKey, appUserID: session.user.email });
      }
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

  useEffect(() => {
    initNotifications();
    scheduleReminderNotification();
  }, []);

  return (
    <QueryClientProvider>
      <AuthProvider>
        <SubscribedContextProvider>
            <NavigationContainer>
              <PostHogProvider apiKey={process.env.EXPO_PUBLIC_POSTHOG_KEY} options={{
                host: `${process.env.EXPO_PUBLIC_POSTHOG_HOST}`,
              }}>
                <TargetLanguageContextProvider>
                <Stack.Navigator screenOptions={{
                  headerTitleStyle: {
                    fontWeight: '700',
                    fontSize: 18,
                  }
                }}>
                  <Stack.Screen name="StoryList" component={StoryListScreen}
                    options={({ route, navigation }) => ({
                      title: "🇮🇳 Hindi Stories",
                      headerTitle: () => <StoryListTitle />,
                      headerTitleAlign: 'center',
                      headerRight: (route.params as any)?.filterButton,
                      headerLeft: () => <TouchableOpacity onPress={() => navigation.navigate('Account')}><_AccountIcon /></TouchableOpacity>
                    })} />
                  <Stack.Screen name="Story" component={Story}
                    options={({ route }) => ({
                      title: (route.params as any).storyTitle,
                      headerBackTitle: "Stories"
                    })} />
                  <Stack.Screen name="Account" component={AccountScreen}
                    options={() => ({
                      title: "Account"
                    })} />
                </Stack.Navigator>
                </TargetLanguageContextProvider>
              </PostHogProvider>
            </NavigationContainer>
        </SubscribedContextProvider>
      </AuthProvider>
    </QueryClientProvider >
  );
}


const _AccountIcon = () => {
  return (<Svg height="24" viewBox="0 -960 960 960" width="24"><Path fill="#64748b" d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" /></Svg>);
}


export default Sentry.wrap(App);