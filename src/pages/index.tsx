import React from "react";
import Meta from "components/Meta";
import { useAuth, requireAuth } from "util/auth";
import Chat from "./chat";

function IndexPage() {
  return (
    <>
      <Meta />
      
    <Chat />
    </>
  );
}

export default requireAuth(IndexPage);
