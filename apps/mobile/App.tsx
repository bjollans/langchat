import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Session } from '@supabase/supabase-js';
import { QueryClientProvider } from 'linguin-shared/util/clientDb';
import { useEffect, useState } from 'react';
import 'react-native-url-polyfill/auto';
import AuthForm from './components/AuthForm';
import StoryListScreen from './screens/StoryListScreen';
import Story from './screens/StoryScreen';
import supabase from 'linguin-shared/util/supabase';
import { AuthProvider } from 'linguin-shared/util/auth';

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, []);

  if (!session || !session.user) return <AuthForm />;

  return (
    <QueryClientProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 32,
            }
          }}>
            <Stack.Screen name="StoryList" component={StoryListScreen} options={{ title: "🇮🇳 Hindi Stories" }} />
            <Stack.Screen name="Story" component={Story}
              options={({ route }) => ({
                title: (route.params as any).storyTitle,
                headerBackTitle: "Stories"
              })} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
}
