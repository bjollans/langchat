
"use client";

import {
  useEffect
} from "react";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./auth";
import PageLoader from "linguin-shared/components/PageLoader";

// A Higher Order Component for requiring authentication
export const requireAuth = (Component) => {
    return function RequireAuthHOC(props) {
      // Get authenticated user
      const auth = useAuth();
      const router = useRouter();
      const pathname = usePathname()
  
      useEffect(() => {
        // Redirect if not signed in
        if (auth.user === false) {
          router.replace(`/auth/signin?from=${pathname}`);
        }
      }, [auth, router]);
  
      // Show loading indicator
      // We're either loading (user is `null`) or about to redirect from above `useEffect` (user is `false`)
      if (!auth.user) {
        return <PageLoader />;
      }
  
      // Render component now that we have user
      return <Component {...props} />;
    };
  };