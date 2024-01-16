import React from "react";
import "styles/global.css";
import "util/analytics";
import { PHProvider } from 'util/providers'
import { AuthProvider } from "util/auth";
import { QueryClientProvider } from "util/db";
import ApplicationShell from "components/ApplicationShell";


function MyApp({ Component, pageProps }) {
  return (
    <PHProvider>
      <QueryClientProvider>
        <AuthProvider>
          <Script strategy="afterInteractive" src={"https://www.googletagmanager.com/gtag/js?id=" + process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');`}
          </Script>
          <ApplicationShell>
            <Component {...pageProps} />
          </ApplicationShell>
        </AuthProvider>
      </QueryClientProvider>
    </PHProvider>
  );
}

export default MyApp;
