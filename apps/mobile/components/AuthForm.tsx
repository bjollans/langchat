import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import supabase from '../util/supabaseAuth';
import { Button, Input } from 'react-native-elements';

import { authorize } from 'react-native-app-auth';

export default function AuthForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);


    async function authGoogle() {
        const config = {
            issuer: 'https://accounts.google.com',
            clientId: '501061996944-vr81abn7hvfgi6jsfeo44q39qbhntkn3.apps.googleusercontent.com',
            redirectUrl: 'com.googleusercontent.apps.501061996944-vr81abn7hvfgi6jsfeo44q39qbhntkn3:/oauth2redirect/google',
            scopes: ['email'],
            useNonce: false,
        };
        try {
            const authState = await authorize(config);
            // result includes accessToken, accessTokenExpirationDate and refreshToken
            const { data, error } = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: authState.idToken,
            })
        } catch (error) {
            Alert.alert('Something went wrong, please try again later');
        }
    }

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
    }

    async function signUpWithEmail() {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input
                    label="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="email@address.com"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Input
                    label="Password"
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
            </View>
            <View style={styles.verticallySpaced}>
                <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
            </View>
            <View style={styles.verticallySpaced}>
                <Button title="[G] Sign in with Google" disabled={loading} onPress={() => authGoogle()} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
})