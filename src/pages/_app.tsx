import React from "react";
import "styles/global.css";
import "util/analytics";
import { PHProvider } from 'util/providers'
import { AuthProvider } from "util/auth";
import { QueryClientProvider } from "util/db";

function MyApp({ Component, pageProps }) {
  return (
    <PHProvider>
      <QueryClientProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </QueryClientProvider>
    </PHProvider>
  );
}

export default MyApp;
