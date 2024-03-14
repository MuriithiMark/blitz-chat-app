import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { chatSocket } from "../../../services/socket";
import {
  onFetchMessages,
  onNewMessage,
  registerListener,
} from "../../../features/chats/chat-container.slice";
import { getMessagesWithContext } from "../../../services/api/messages.api";
import MessageCard from "../../messages/MessageCard";

const ChatContent = ({ className }) => {
  const dispatch = useDispatch();
  const [isListenerConnected, setIsListenerConnected] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);
  const context = useSelector((state) => state.chatContainer.context);
  const context_data = useSelector((state) => state.chatContainer.data);
  const messages = useSelector((state) => state.chatContainer.messages);
  const hasListener = useSelector((state) => state.chatContainer.hasListener);

  const { error, isLoading, data } = useQuery({
    queryKey: ["get_messages_with_context"],
    queryFn: () =>
      getMessagesWithContext({
        context: context,
        id: context === "group" ? context_data.id : context_data.friendShipId,
      }),
  });

  useEffect(() => {
    if (!data || (data && data.status === "fail")) {
      return;
    }

    if (!messages.length) {
      dispatch(onFetchMessages(data.messages));
    }

    // Ensure that only a single event listener is registered
    // START
    if (isListenerConnected || hasListener) {
      console.log("Listener is registered");
      return;
    }

    setIsListenerConnected(true);
    dispatch(registerListener());
    // END

    chatSocket.on("new", ({ data }) => {
      // console.log("Count ", ++count, " messages ", messages);
      if (data.status === "fail") {
        console.error("ChatSocket listening to new message ", data, " from ");
        return;
      }

      dispatch(onNewMessage(data.message));
    });

    chatSocket.on("new/created", ({ data: { message } }) => {
      dispatch(onNewMessage(message));
    });

    chatSocket.on("new/error", ({ data: { message } }) => {
      console.error(message);
      // TODO handle message create error
    });
  }, [data]);

  if (isLoading) {
    return <div className={className}>Loading ....</div>;
  }

  if (error) {
    return (
      <div className={className}>
        <span style={{ color: "red" }}>{error.message}</span>
      </div>
    );
  }

  return (
    <div className={className}>
      {messages.length === 0 && <span>No Messages</span>}
      {messages.map((message) => {
        return (
          <MessageCard
            key={message.id}
            context={context}
            message={message}
            currentUser={currentUser}
            context_data={context_data}
          />
        );
      })}
    </div>
  );
};

export default ChatContent;
