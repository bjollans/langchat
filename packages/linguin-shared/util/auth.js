"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from "react";
import queryString from "query-string";
import supabase from "./supabase";
import { useUser, updateUser } from "./clientDb";
import { getFriendlyPlanId } from "./prices";
import analytics from "./analytics";
import posthog from 'posthog-js';

const MERGE_DB_USER = true;
const ANALYTICS_IDENTIFY = true;
const authContext = createContext();


export const useAuth = () => useContext(authContext)

export function AuthProvider({ children }) {
  const auth = useAuthProvider();

  return (<authContext.Provider value={auth}>{children}</authContext.Provider>);
}

function useAuthProvider() {
  const [user, setUser] = useState(null);

  let finalUser = useMergeExtraData(user, { enabled: MERGE_DB_USER });

  finalUser = useFormatUser(finalUser);

  useIdentifyUser(finalUser, { enabled: ANALYTICS_IDENTIFY });

  const handleAuth = async (response) => {
    const {
      data: { user },
    } = response;

    if (!user.email_confirmed_at) {
      throw new Error(
        "Thanks for signing up! Please check your email to complete the process."
      );
    }

    setUser(user);
    return user;
  };

  const signup = (email, password) => {
    return supabase.auth
      .signUp({ email, password })
      .then(handleError)
      .then(handleAuth);
  };

  const signin = (email, password) => {
    return supabase.auth
      .signInWithPassword({ email, password })
      .then(handleError)
      .then(handleAuth);
  };

  const signinWithProvider = (name, nextLocation) => {
    return (
      supabase.auth
        .signInWithOAuth({
          provider: name,
          options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}${nextLocation ?? ""}`,
          },
        })
        .then(handleError)
        .then(() => {
          return new Promise(() => null);
        })
    );
  };

  const signinWithMagicLink = (email) => {
    return supabase.auth
      .signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      })
      .then(handleError);
  };

  const signout = () => {
    return supabase.auth.signOut().then(handleError);
  };

  const sendPasswordResetEmail = (email) => {
    return supabase.auth
      .resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/changepass`,
      })
      .then(handleError);
  };

  const confirmPasswordReset = (password) => {
    return supabase.auth.updateUser({ password }).then(handleError);
  };

  const updatePassword = (password) => {
    return supabase.auth.updateUser({ password }).then(handleError);
  };

  const updateProfile = async (data) => {
    const { email, ...other } = data;

    if (email && email !== user.email) {
      await supabase.auth.updateUser({ email }).then(handleError);
      throw new Error(
        "To complete this process click the confirmation links sent to your new and old email addresses"
      );
    }

    if (Object.keys(other).length > 0) {
      await updateUser(user.id, other);
    }
  };

  useEffect(() => {
    window.lastHash = queryString.parse(window?.location?.hash);

    if (!window.lastHash.access_token) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setUser(session.user);
        } else {
          setUser(false);
        }
      });
    }

    const {
      data: {
        subscription: { unsubscribe },
      },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user: finalUser,
    signup,
    signin,
    signinWithProvider,
    signinWithMagicLink,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    updatePassword,
    updateProfile,
  };
}

function useFormatUser(user) {
  return useMemo(() => {
    if (!user) return user;

    let provider = user.app_metadata.provider;
    if (provider === "email") provider = "password";
    const providers = [provider];

    const customer = user.customers || {};

    return {
      ...user,
      uid: user.id,
      providers: providers,
      ...customer,
      ...(customer.stripePriceId && {
        planId: getFriendlyPlanId(customer.stripePriceId),
      }),
      planIsActive: ["active", "trialing"].includes(
        customer.stripeSubscriptionStatus
      ),
    };
  }, [user]);
}

function useMergeExtraData(user, { enabled }) {
  const { data, status, error } = useUser(enabled && user && user.id);

  return useMemo(() => {
    if (!enabled || !user) return user;

    switch (status) {
      case "success":
        if (data === null) return null;
        return { ...user, ...data };
      case "error":
        throw new Error(`
          Error: ${error.message}
          This happened while attempting to fetch extra user data from the database
          to include with the authenticated user. Make sure the database is setup or
          disable merging extra user data by setting MERGE_DB_USER to false.
        `);
      default:
        return null;
    }
  }, [user, enabled, data, status, error]);
}
function useIdentifyUser(user, { enabled }) {
  useEffect(() => {
    if (user && enabled) {
      analytics.identify(user.uid);
      posthog.identify(user.uid, {
        email: user.email,
        plan: user.planId,
        planIsActive: user.planIsActive,
      });
    }
  }, [user, enabled]);
}


function handleError(response) {
  if (response.error) throw response.error;
  return response;
}
