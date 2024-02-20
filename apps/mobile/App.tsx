import { Session } from '@supabase/supabase-js';
import { QueryClientProvider } from 'linguin-shared/util/clientDb';
import supabase from './util/supabaseAuth';
import { useEffect, useState } from 'react';
import 'react-native-url-polyfill/auto';
import AuthForm from './components/AuthForm';
import Story from './screens/story';

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, []);
  
  return (
    <QueryClientProvider>
      {session && session.user ? <Story /> : <AuthForm />}
    </QueryClientProvider>
  );
}
