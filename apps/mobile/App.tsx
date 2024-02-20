import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Session } from '@supabase/supabase-js';
import { QueryClientProvider } from 'linguin-shared/util/clientDb';
import { useEffect, useState } from 'react';
import 'react-native-url-polyfill/auto';
import AuthForm from './components/AuthForm';
import StoryListScreen from './screens/StoryListScreen';
import Story from './screens/StoryScreen';
import supabase from './util/supabaseAuth';

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

  if(!session || !session.user) return <AuthForm />;

  return (
    <QueryClientProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="StoryList" component={StoryListScreen} options={{title: "🇮🇳 Hindi Mini Stories"}} />
          <Stack.Screen name="Story" component={Story} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
