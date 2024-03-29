import { useStoriesAvailable } from 'linguin-shared/context/rnStoriesAvailableContext';
import { usePostHog } from 'posthog-react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, Platform, ActivityIndicator } from 'react-native';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

export default function AdRewarderButton({ rewarded }) {
    const [showing, setShowing] = useState(false);
    const posthog = usePostHog();

    useEffect(() => {
        if (showing) {
            rewarded.show();
        }
    }, [showing]);

    return (
        <TouchableOpacity
            className="rounded-full border bg-sky-200 p-4 text-center text-lg"
            onPress={() => {
                setShowing(true);
                posthog?.capture("ad_rewarder_button_clicked");
            }}
        >
            <Text className="text-slate-600 text-lg font-semibold tracking-tight text-center"
            >Watch Ad</Text>
        </TouchableOpacity>
    );
}
