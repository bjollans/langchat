import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";
import { AsyncStorage } from '@react-native-async-storage/async-storage';


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

export default supabase;
