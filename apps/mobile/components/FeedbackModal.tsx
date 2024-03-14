import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableWithoutFeedback } from 'react-native'
import InAppReview from 'react-native-in-app-review';
import usePostHog from 'linguin-shared/util/usePostHog';

import StarRating from 'react-native-star-rating-widget';

import { getFirstInstallTime } from 'react-native-device-info';

export function FeedbackModal() {
    const [installedForEnoughDays, setInstalledForEnoughDays] = useState(false);
    const [hasReviewed, setHasReviewed] = useState(false);
    const [lastAskedForReview, setLastAskedForReview] = useState(0);
    const [showThanksModal, setShowThanksModal] = useState(false);
    const [forceInvisible, setForceInvisible] = useState(false);
    const posthog = usePostHog();

    useEffect(() => {
        getFirstInstallTime().then((firstInstallTime) => {
            const AMOUNT_OF_DAYS = 10;
            if (Date.now() - firstInstallTime > AMOUNT_OF_DAYS * 24 * 60 * 60 * 1000) {
                setInstalledForEnoughDays(true);
            }
        }
        );
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('hasReviewed').then((value) => {
            if (value === 'true') {
                setHasReviewed(true);
            }
        }
        );
    }, []);

    useEffect(() => {
        if (hasReviewed) {
            AsyncStorage.setItem('hasReviewed', 'true');
        }
    }, [hasReviewed]);

    useEffect(() => {
        AsyncStorage.getItem('lastAskedForReview').then((value) => {
            if (value) {
                setLastAskedForReview(parseInt(value));
            }
        }
        );
    }, []);

    useEffect(() => {
        if (hasReviewed) {
            AsyncStorage.setItem('lastAskedForReview', Date.now().toString());
        }
    }, [hasReviewed]);

    const handleReview = async (rating) => {
        if (rating > 3) {
            await InAppReview.RequestInAppReview();
        }
        setHasReviewed(true);
        setLastAskedForReview(Date.now());
        setShowThanksModal(true);
        posthog.capture('reviewed_app', {
            rating: rating,
        });   
    }

    const hasAskedForReviewRecently = Date.now() - lastAskedForReview < 7 * 24 * 60 * 60 * 1000;
    const showPleaseRateModal = installedForEnoughDays && !hasReviewed && !hasAskedForReviewRecently && InAppReview.isAvailable();
    const visible = showThanksModal || showPleaseRateModal;

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible && !forceInvisible}>
                <TouchableWithoutFeedback onPress={() => {
                    setLastAskedForReview(Date.now());
                    setForceInvisible(true);
                }}>
                    {showThanksModal
                        && (<View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText} className="font-semibold text-lg tracking-tight">Thank you for your review!</Text>
                            </View>
                        </View>)
                        || (<View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText} className="font-semibold text-lg tracking-tight">Are you enjoying Linguin?</Text>
                                <StarRating
                                    rating={3}
                                    onChange={handleReview}
                                />
                            </View>
                        </View>)
                    }
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
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