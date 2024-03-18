import React from "react";

import MessageCard from "../../messages/MessageCard";
import { useGetMessagesQuery } from "../../../features/api";
import { useEffect } from "react";
import { useRef } from "react";

const ChatContent = ({ className, context, contextData, currentUser }) => {
  const scrollRef = useRef();

  const {
    data: messages,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetMessagesQuery({
    context,
    contextId: contextData.id,
    authData: context === "groups" ? contextData : currentUser,
  });

  useEffect(() => {
    if (!messages || !messages.ids.length || !scrollRef.current) {
      return;
    }

    const lastMessage =
      messages.entities[messages.ids[messages.ids.length - 1]];

    if (lastMessage.senderId === currentUser.id) {
      // Scroll to Bottom
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
      return;
    }
    if (messages.length < 2) {
      return;
    }

    // Check that user has not scrolled up
    // If not scrolled up then scrollToBottom
    scrollRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [isSuccess]);

  if (isLoading) {
    return (
      <div
        className={className}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <span
          style={{
            color: "green",
            fontSize: "xx-large",
            textTransform: "capitalize",
          }}
        >
          Loading ...
        </span>
      </div>
    );
  }

  if (isError) {
    console.error(error);
    return (
      <div
        className={className}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <span
          style={{
            color: "grey",
            fontSize: "large",
            textTransform: "capitalize",
          }}
        >
          An error was encountered
        </span>
      </div>
    );
  }

  return (
    <div className={className}>
      {messages.ids.length === 0 && <span>No Messages</span>}
      {messages.ids.map((id) => {
        const message = messages.entities[id];
        return (
          <MessageCard
            key={id}
            message={message}
            context={context}
            currentUserId={currentUser.id}
          />
        );
      })}
      <div ref={scrollRef} />
    </div>
  );
};

export default ChatContent;
