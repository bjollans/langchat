import React from "react";
import Meta from "components/Meta";
import AuthSection from "components/AuthSection";

function IndexPage(props) {
  return (
    <>
      <Meta />
      <AuthSection
        size="md"
        bgColor="bg-white"
        bgImage=""
        bgImageOpacity={1}
        textColor=""
        type="signup"
        providers={["google", "facebook", "twitter"]}
        afterAuthPath="/dashboard"
      />
    </>
  );
}

export default IndexPage;
