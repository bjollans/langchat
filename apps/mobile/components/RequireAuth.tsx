import { Session } from '@supabase/supabase-js';
import supabase from 'linguin-shared/util/supabase';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Purchases from "react-native-purchases";
import 'react-native-url-polyfill/auto';
import AuthModal from "./AuthModal";

export default function RequireAuth({ children, navigation }) {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        })
    }, []);

    return (
        <>
            {children}
            <AuthModal visible={!session || !session.user} navigation={navigation} />
        </>
    );
}