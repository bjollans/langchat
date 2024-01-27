import React from "react";
import Link from "next/link";

function AuthFooter(props) {
  return (
    <div
      className={
        "px-3 mt-6 text-sm text-center" +
        (props.className ? ` ${props.className}` : "")
      }
    >
      {props.type === "signup" && (
        <>
          {props.showAgreement && (
            <div className="mb-3">
              By signing up, you are agreeing to our{" "}
              <Link href={props.termsPath} className="text-blue-600">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href={props.privacyPolicyPath} className="text-blue-600">
                Privacy Policy
              </Link>
              .
            </div>
          )}

          {props.signinText}
          <Link href={props.signinPath} className="ml-3 text-blue-600">
            {props.signinAction}
          </Link>
        </>
      )}

      {props.type === "signin" && (
        <>
          <Link href={props.signupPath} className="text-blue-600">
            {props.signupAction}
          </Link>

          {props.forgotPassAction && (
            <Link href={props.forgotPassPath} className="ml-4 text-blue-600">
              {props.forgotPassAction}
            </Link>
          )}
        </>
      )}

      {props.type === "forgotpass" && (
        <>
          {props.signinText}
          <Link href={props.signinPath} className="ml-3 text-blue-600">
            {props.signinAction}
          </Link>
        </>
      )}
    </div>
  );
}

export default AuthFooter;
