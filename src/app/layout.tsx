import React from "react";
import "styles/global.css";
import "util/analytics";
import { PHProvider } from 'util/providers'
import { AuthProvider } from "util/auth";
import { QueryClientProvider } from "util/db";
import ApplicationShell from "components/ApplicationShell";
import Script from 'next/script';
import OriginTracker from "components/tracking/OriginTracker";
import { CookiesProvider } from 'react-cookie';



export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>

                <PHProvider>
                    <QueryClientProvider>
                        <CookiesProvider defaultSetOptions={{ path: '/' }}>
                            <AuthProvider>
                                <OriginTracker />
                                <Script strategy="afterInteractive" src={"https://www.googletagmanager.com/gtag/js?id=" + process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
                                <Script id="google-analytics" strategy="afterInteractive">
                                    {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');`}
                                </Script>
                                <ApplicationShell>
                                    {children}
                                </ApplicationShell>
                            </AuthProvider>
                        </CookiesProvider>
                    </QueryClientProvider>
                </PHProvider>
            </body>
        </html>
    )
}