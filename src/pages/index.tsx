import React, { useEffect } from "react";
import { useRouter } from "next/router";

function IndexPage() {
  const { push } = useRouter();

  useEffect(() => {
    push('/story/hi');
  }, []);
  return <p></p>;
}

export default IndexPage;
