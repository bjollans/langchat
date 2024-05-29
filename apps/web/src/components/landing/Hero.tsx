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
                    <div className="lg:flex items-center">
                        <div className="mt-10 flex max-lg:justify-center">
                            <a onClick={() => posthog.capture("ios_hero_link_click", { via: viaCookie })}
                                href='https://apps.apple.com/de/app/linguin-hindi-reading/id6478230990?l=en-GB'
                            >
                                <img className=" h-[52px] mt-[13px] my-[23px]" alt='Download on the App Store' src='/images/app-store-download.svg' />
                            </a>
                            <a onClick={() => posthog.capture("android_hero_link_click", { via: viaCookie })}
                                href='https://play.google.com/store/apps/details?id=com.bjolly.linguin&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img className="h-[78px] max-lg:mx-auto" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' /></a>
                        </div>
                        <a
                            onClick={() => posthog.capture("web_hero_link_click", { via: viaCookie })}
                            href="/story/hi"
                            className="rounded-lg h-[60px] lg:h-[52px] mt-[30px] max-lg:mx-auto lg:mx-[13px] bg-slate-900 text-slate-100 px-[12px] py-[11px] font-semibold text-lg"
                        >
                            Read in Browser
                        </a></div>
                </div>
            </div>
            <img className="z-10 h-5/6 max-sm:max-w-xs max-lg:max-w-lg mx-auto items-center my-auto ml-0 mr-auto max-lg:mx-auto" src="/images/phone.png" />
        </div>
    );
}