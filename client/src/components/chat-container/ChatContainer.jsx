import React from "react";
import { useParams } from "react-router-dom";

import "./chat-container.scss";
import ChatHeader from "./chat-header/ChatHeader";
import ChatFooter from "./chat-footer/ChatFooter";
import ChatContent from "./chat-content/ChatContent";
import { useGetMessagingContextQuery } from "../../features/api";
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser.hook";

const ChatContainer = () => {
  const [currentUser, isCurrentUserLoading] = useAuthenticatedUser()
  const { context, contextId } = useParams();

  const {
    data: contextData,
    error,
    isLoading,
    isError,
  } = useGetMessagingContextQuery({
    context: context,
    contextId: contextId,
  });

  if (isLoading) {
    return (
      <div
        className="chat-container"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <span style={{ fontSize: "xxx-large", color: "green" }}>
          Loading...
        </span>
      </div>
    );
  }

  if (isError) {
    console.error(error);
    return (
      <div
        className="chat-container"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <span
          style={{
            fontSize: "xxx-large",
            color: "red",
            textTransform: "capitalize",
          }}
        >
          An Error was encountered
        </span>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <ChatHeader
        className="chat-header"
        context={context}
        contextId={contextData.id}
        currentUser={currentUser}
      />
      <ChatContent
        className="chat-content"
        context={context}
        contextData={contextData}
        currentUser={currentUser}
      />
      <ChatFooter
        className="chat-footer"
        context={context}
        contextData={contextData}
        currentUser={currentUser}
      />
    </div>
  );
};

export default ChatContainer;
