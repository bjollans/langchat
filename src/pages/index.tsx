import React, { useEffect } from "react";
import { useRouter } from "next/router";
import posthog from "posthog-js";

function IndexPage() {
  const { push, query } = useRouter();
  const hasPaid = query.paid;

  useEffect(() => {
    if (hasPaid == 'true') {
      posthog.capture('purchase');
    }
    if (query) {
      push('/story/hi');
    }
  }, [query]);
  return <p></p>;
}

export default IndexPage;
