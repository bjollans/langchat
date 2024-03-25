"use client";

import usePostHog from "@linguin-shared/util/usePostHog";
import { getCookie } from "cookies-next";

export default function Hero() {
    const posthog = usePostHog();
    const viaCookie = getCookie('via');
    return (
        <div className="h-fit relative lg:flex z-0 lg:h-screen">
            <div className="-z-10 lg:h-1/4 h-40 bg-gradient-to-r from-amber-400 to-amber-600 lg:absolute lg:top-0 w-full" />
            <div className="-z-10 lg:h-1/4 h-80 bg-gradient-to-r from-green-600 to-green-800 absolute bottom-40 sm:bottom-80 lg:bottom-0 w-full" />
            <div className="mr-0 ml-auto max-w-2xl py-10 z-10 my-auto max-lg:mx-auto">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-blue-900">
                        Read Your Way to Hindi Fluency
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-900">
                        Practice Reading Hindi with our Hindi text passages.
                    </p>
                    <div className="mt-10 flex gap-x-6 items-center max-lg:justify-center">
                        <div className="w-60">
                            <a onClick={() => posthog.capture("android_hero_link_click", {via: viaCookie})}
                            href='https://play.google.com/store/apps/details?id=com.bjolly.linguin&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' /></a>
                        </div>
                        <a
                            onClick={() => posthog.capture("web_hero_link_click", {via: viaCookie})}  
                            href="/story/hi"
                            className="rounded-md h-fit bg-blue-900 px-3.5 py-3.5 sm:text-2xl text-md font-semibold shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 text-white focus-visible:outline-offset-2 focus-visible:outline-amber-400 mr-4"
                        >
                            Read in Browser
                        </a>
                    </div>
                </div>
            </div>
            <img className="z-10 h-5/6 max-sm:max-w-xs max-lg:max-w-lg mx-auto items-center my-auto ml-0 mr-auto max-lg:mx-auto" src="/images/phone.png" />
        </div>
    );
}