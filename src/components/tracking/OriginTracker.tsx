import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from 'react-cookie';
import { useAuth } from "util/auth";
import { updateUser } from "util/db";

export default function OriginTracker() {
    const DAY_DURATION = 24 * 60 * 60 * 1000;

    const { query } = useRouter();
    const [cookies, setCookie] = useCookies(['via', 'ref']);

    const auth = useAuth();

    useEffect(() => {
        //Set affiliate everytime the query changes, to have the latest affiliate
        const affiliateId = query.via;
        if (affiliateId && affiliateId.length > 0) {
            setCookie('via', affiliateId, { expires: new Date(Date.now() + 60 * DAY_DURATION) });
        }

        // Only set referrer once, to get the initial referrer
        if (!cookies.ref) {
            setCookie('ref', document.referrer ?? "None");
        }
    }, [cookies, query]);

    useEffect(() => {
        if (auth.status === "loading") return;
        
        // Only write tot the DB once, to get the responsible affiliate
        if (auth?.user && !auth.user.affiliate) {
            updateUser(auth.user.uid, { affiliate: cookies.via ?? "None" });
        }
        // Only write tot the DB once, to get the responsible referrer
        if (auth?.user && !auth.user.referrer) {
            updateUser(auth.user.uid, { referrer: cookies.ref ?? "None" });
        }
    }, [auth.status]);

    return (<></>);
}