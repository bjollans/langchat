import { useStoriesAvailable } from 'linguin-shared/context/rnStoriesAvailableContext';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.REWARDED : "ca-app-pub-8807034955415313/2018900855";

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'],
});

export default function AdRewarderButton() {
    const [loaded, setLoaded] = useState(false);
    const [showing, setShowing] = useState(false);
    const { storiesAvailable, setStoriesAvailable, minStoriesUnlockedAtOnce } = useStoriesAvailable();

    useEffect(() => {
        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setLoaded(true);
        });
        const unsubscribeEarned = rewarded.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            reward => {
                setStoriesAvailable(Math.max(storiesAvailable + minStoriesUnlockedAtOnce, minStoriesUnlockedAtOnce));
            },
        );

        rewarded.load();

        return () => {
            unsubscribeLoaded();
            unsubscribeEarned();
        };
    }, []);

    useEffect(() => {
        if (showing && loaded) {
            rewarded.show();
        }
    }, [showing, loaded]);

    return (
        <TouchableOpacity
            className="rounded-full border bg-sky-200 p-4 text-center text-lg"
            onPress={() => {
                setShowing(true);
            }}
        >
            <Text className="text-slate-600 text-lg font-semibold tracking-tight text-center"
            >Watch Ad</Text>
        </TouchableOpacity>
    );
}
