"use client";

import { useSearchParams } from 'next/navigation'
import posthog from "posthog-js";
import { useEffect } from "react";

export default function PurchasedTracker() {
    const searchParams = useSearchParams()
 
    const hasPaid = searchParams.get('hasPaid')

    useEffect(() => {
        if (hasPaid == 'true') {
            posthog.capture('purchase');
        }
    }, [hasPaid]);

    return null;
}