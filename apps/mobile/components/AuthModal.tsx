import supabase from 'linguin-shared/util/supabase';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, Platform, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button, Input } from 'react-native-elements';

import { authorize } from 'react-native-app-auth';

import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Svg, { Path } from 'react-native-svg';
import usePostHog from 'linguin-shared/util/usePostHog';

import { AppleButton } from '@invertase/react-native-apple-authentication';
import * as AppleAuthentication from 'expo-apple-authentication'

export default function AuthForm({ visible, navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [wasVisible, setWasVisible] = useState(false);
    const posthog = usePostHog();

    async function authGoogle() {
        setLoading(true);
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
            if (!error) {
                posthog?.capture("auth_completed",);
                posthog?.capture("auth_completed_google",);
            }
            else {
                posthog?.capture("auth_error_supabase_google",);
            }
        } catch (error) {
            Alert.alert('Something went wrong, please try again later');
            posthog?.capture("auth_error_google",);
        }
        setLoading(false);
    }

    async function authAppleOniOS() {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            })
            // Sign in via Supabase Auth.
            if (credential.identityToken) {
                const {
                    error,
                    data: { user },
                } = await supabase.auth.signInWithIdToken({
                    provider: 'apple',
                    token: credential.identityToken,
                })

                if (!error) {
                    posthog?.capture("auth_completed",);
                    posthog?.capture("auth_completed_apple_ios",);
                }
                else {
                    posthog?.capture("auth_error_supabase_apple_ios",);
                }
            }
        } catch (error) {
            Alert.alert('Something went wrong, please try again later');
            posthog?.capture("auth_error_apple_ios",);
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
        posthog?.capture("auth_completed",);
    }

    async function signUpWithEmail() {
        setLoading(true);
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        if (!session && !error) Alert.alert('Please check your inbox for email verification!');
        setLoading(false);
        posthog?.capture("auth_completed",);
    }

    useEffect(() => {
        if (visible) {
            setWasVisible(true);
            posthog?.capture("auth_modal_opened");
        }
    }, [posthog]);

    useEffect(() => {
        if (wasVisible && !visible) {
            posthog?.capture("auth_modal_closed");
        }
    }, [visible]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}>
            <View className="w-full h-full" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
                <View className="p-4 bg-white border rounded-md m-12 my-auto w-[80%] opacity-1">
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignSelf: 'flex-end' }}>
                        <Svg height="24" viewBox="0 -960 960 960" width="24"><Path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></Svg>
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-center mb-4">Login To Continue</Text>
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
                    {loading
                        && <ActivityIndicator />
                        || <>
                            <View style={[styles.verticallySpaced, styles.mt20]}>
                                <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} buttonStyle={{ backgroundColor: "#38bdf8" }} />
                            </View>
                            <View style={styles.verticallySpaced}>
                                <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} buttonStyle={{ backgroundColor: "#38bdf8" }} />
                            </View>
                            <View style={styles.verticallySpaced}>
                                <Button className='my-2 mt-3' title={<>
                                    <FontAwesomeIcon icon={faGoogle} size={15} color="#000000" />
                                    <Text className="text-black ml-1.5 py-1" style={{ fontSize: 18, fontWeight: 500 }}>Sign in with Google</Text>
                                </>} disabled={loading} onPress={() => authGoogle()}
                                    buttonStyle={{ backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#838383", borderRadius: 6 }} />
                            </View>
                            {Platform.OS == "ios" && <View>
                                <AppleButton
                                    buttonStyle={AppleButton.Style.WHITE_OUTLINE}
                                    buttonType={AppleButton.Type.SIGN_IN}
                                    style={{
                                        width: '100%', // You must specify a width
                                        height: 45, // You must specify a hei
                                    }}
                                    onPress={authAppleOniOS}
                                />
                            </View>}
                        </>}
                </View>
            </View>
        </Modal>);
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(100,0,0,100)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});