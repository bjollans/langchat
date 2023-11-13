import React from "react";
import Meta from "components/Meta";
import { requireAuth } from "util/auth";

function ChatPage(props) {
  return <Meta title="Chat" />;
}

export default requireAuth(ChatPage);
