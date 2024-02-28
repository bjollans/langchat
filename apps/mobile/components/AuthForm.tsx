import supabase from 'linguin-shared/util/supabase';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View, Platform } from 'react-native';
import { Button, Input } from 'react-native-elements';

import { authorize } from 'react-native-app-auth';

import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function AuthForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);


    async function authGoogle() {
        const config = {
            issuer: 'https://accounts.google.com',
            clientId: Platform.OS == "ios"
                ? '501061996944-vr81abn7hvfgi6jsfeo44q39qbhntkn3.apps.googleusercontent.com'
                : "501061996944-j5a2isahmbe72ca7qfftp8j0dqr227md.apps.googleusercontent.com",
            redirectUrl: Platform.OS == "ios"
                ? 'com.googleusercontent.apps.501061996944-vr81abn7hvfgi6jsfeo44q39qbhntkn3:/oauth2redirect/google'
                : 'com.googleusercontent.apps.501061996944-j5a2isahmbe72ca7qfftp8j0dqr227md:/oauth2redirect/google',
            scopes: ['email'],
            useNonce: false,
        };
        try {
            const authState = await authorize(config);
            // result includes accessToken, accessTokenExpirationDate and refreshToken
            const { data, error } = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: authState.idToken,
            });
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
        if (!session && !error) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)
    }

    return (
        <View className="bg-sky-300 h-full items-center">
            <Image source={require('../assets/logoWithTransparency.png')} style={{ height: 150, resizeMode: 'contain', alignSelf: 'center', marginTop: 100 }} />
            <Text className="my-6 text-4xl font-bold tracking-tight">Welcome to Linguin!</Text>
            <View className="p-4 bg-white border rounded-md m-12 mt-6 w-[80%]">
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
                    <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} buttonStyle={{ backgroundColor: "#38bdf8" }} />
                </View>
                <View style={styles.verticallySpaced}>
                    <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} buttonStyle={{ backgroundColor: "#38bdf8" }} />
                </View>
                <View style={styles.verticallySpaced}>
                    <Button title={<>
                        <FontAwesomeIcon icon={faGoogle} size={20} color="#000000" />
                        <Text className="text-black text-lg ml-2"> Sign in With Google</Text>
                    </>} disabled={loading} onPress={() => authGoogle()} buttonStyle={{ backgroundColor: "#ffffff", borderWidth: 1, borderColor: "black" }} />
                </View>
            </View>
        </View>)
}

const styles = StyleSheet.create({
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
})