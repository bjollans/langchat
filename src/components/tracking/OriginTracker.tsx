"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "util/auth";
import { updateUser } from "util/clientDb";
import { setCookie, getCookie } from 'cookies-next';

export default function OriginTracker() {
    const DAY_DURATION = 24 * 60 * 60 * 1000;

    const searchParams = useSearchParams()
 
    const affiliateId = searchParams.get('via')
    const affiliateIdCookie = getCookie('via');
    const refCookie = getCookie('ref');
    

    const auth = useAuth();

    useEffect(() => {
        //Set affiliate everytime the query changes, to have the latest affiliate
        if (affiliateId && affiliateId.length > 0) {
            setCookie('via', affiliateId, { expires: new Date(Date.now() + 60 * DAY_DURATION) });
        }

        // Only set referrer once, to get the initial referrer
        if (!refCookie) {
            setCookie('ref', document.referrer ?? "None");
        }
    }, [refCookie, affiliateId]);

    useEffect(() => {
        if (auth.status === "loading") return;
        
        // Only write tot the DB once, to get the responsible affiliate
        if (auth?.user && !auth.user.affiliate) {
            updateUser(auth.user.uid, { affiliate: affiliateIdCookie ?? "None" });
        }
        // Only write tot the DB once, to get the responsible referrer
        if (auth?.user && !auth.user.referrer) {
            updateUser(auth.user.uid, { referrer: affiliateIdCookie ?? "None" });
        }
    }, [auth.status]);

    return (<></>);
}