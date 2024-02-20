import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { createClient } from "@supabase/supabase-js";
import { AppState, Platform } from "react-native";


const supabase = Platform.OS == "web"
  ? createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY,
  )
  : createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL,
    process.env.EXPO_PUBLIC_SUPABASE_PUBLIC_KEY,
    {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      }
    }
  );

if (Platform.OS != "web") {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
  })
}

export default supabase;
