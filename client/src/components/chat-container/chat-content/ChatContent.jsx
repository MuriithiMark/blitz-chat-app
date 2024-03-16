import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QueryClient, useQuery } from "@tanstack/react-query";

import { chatSocket } from "../../../services/socket";
import {
  onFetchMessages,
  onNewMessage,
  registerListener,
} from "../../../features/chats/chat-container.slice";
import { getMessagesWithContext } from "../../../services/api/messages.api";
import MessageCard from "../../messages/MessageCard";

const queryClient = new QueryClient();

const ChatContent = ({ className }) => {
  const dispatch = useDispatch();
  /**
   * @type {React.Ref<HTMLDivElement>}
   */
  const scrollRef = useRef();
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
      setTimeout(() => {
        console.log("Timeout over");
        scrollRef.current.scrollIntoView({ behaviour: "smooth" });
      }, 10);
    });

    chatSocket.on("new/created", ({ data: { message } }) => {
      dispatch(onNewMessage(message));
      // When user creates a message scroll them to bottom
      setTimeout(() => {
        console.log("Timeout over");
        scrollRef.current.scrollIntoView({ behaviour: "smooth" });
      }, 10);
      console.log("Comes into view");
    });

    chatSocket.on("new/error", ({ data: { message } }) => {
      console.error(message);
      // TODO handle message create error
    });
  }, [data]);

  useEffect(() => {
    console.log('Rerun')
    // queryClient.invalidateQueries({ queryKey: ["get_messages_with_context"]});
    queryClient.refetchQueries({ queryKey: ["get_messages_with_context"]})
  }, [context_data.id])

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
      <div className="allow-scroll-to-bottom" ref={scrollRef} />
    </div>
  );
};

export default ChatContent;
