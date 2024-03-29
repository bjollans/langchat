"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Meta from "components/Meta";
import PageLoader from "components/PageLoader";
import FormAlert from "components/FormAlert";
import { useAuth } from "util/auth";
import { requireAuth } from "util/requireAuth";
import { redirectToCheckout } from "util/stripe";
import { getCookie } from 'cookies-next';

function PurchasePage({params}) {
  const router = useRouter();
  const auth = useAuth();
  const [formAlert, setFormAlert] = useState();
  const viaCookie = getCookie('via');
  const { plan } = params;

  useEffect(() => {
    if (auth.user.planIsActive) {
      // If user already has an active plan
      // then take them to Stripe billing
      router.push("/settings/billing");
    } else {
      // Otherwise go to checkout
      redirectToCheckout(plan, viaCookie).catch((error) => {
        setFormAlert({
          type: "error",
          message: error.message,
        });
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Meta title="Purchase" />
      <PageLoader>
        {formAlert && (
          <div className="mb-4 mx-auto max-w-md">
            <FormAlert type={formAlert.type} message={formAlert.message} />
          </div>
        )}
      </PageLoader>
    </>
  );
}

export default requireAuth(PurchasePage);
