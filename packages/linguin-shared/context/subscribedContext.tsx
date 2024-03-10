import React, { useEffect, useState, createContext, useContext } from 'react';
import { useAuth } from 'linguin-shared/util/auth';
import Purchases from 'react-native-purchases';

export interface SubscribedState {
    subscribed: boolean;
    setSubscribed: (v: boolean) => void;
    subscribedLoaded: boolean;
}

export const SubscribedContext = createContext<SubscribedState | undefined>(undefined);

export interface SubscribedProviderProps {
    children: React.ReactNode;
}

export default function SubscribedContextProvider({ children }: SubscribedProviderProps) {
    const auth = useAuth();
    const [subscribed, setSubscribed] = useState<boolean>(true);
    const [subscribedLoaded, setSubscribedLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (auth?.user?.email) {
            const isSubscribedOnStripe = auth?.user?.planIsActive ?? true;
            Purchases.getCustomerInfo().then(customerInfo => {
                var isSubscribedOnRevenueCat = true;
                if (!Object.entries(customerInfo.entitlements.active).length) {
                    isSubscribedOnRevenueCat = false;
                }
                setSubscribed(isSubscribedOnStripe || isSubscribedOnRevenueCat);
                setSubscribedLoaded(true);
            });
        }
        if (!auth?.user) {
        }
    }, [auth?.user]);

    return (
        <SubscribedContext.Provider value={{ subscribed, setSubscribed, subscribedLoaded }}>
            {children}
        </SubscribedContext.Provider>
    )
}

export function useSubscribedContext() {
    const context = useContext(SubscribedContext);
    if (context === undefined) {
        throw new Error('useSubscribedContext must be used within a SubscribedContextProvider');
    }
    return context;
}

