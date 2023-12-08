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
          <ApplicationShell>
            <Component {...pageProps} />
          </ApplicationShell>
        </AuthProvider>
      </QueryClientProvider>
    </PHProvider>
  );
}

export default MyApp;
