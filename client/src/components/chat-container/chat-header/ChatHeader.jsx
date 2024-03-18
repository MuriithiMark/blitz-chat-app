import React, { useEffect, useState } from "react";

import "./chat-header.scss";
import ThreeDotFill from "../../icons/ThreeDotFill";
import AvatarImg from "../../profile/avatar-img/AvatarImg";
import { useGetMessagingContextQuery } from "../../../features/api";


const ChatHeader = ({ className, context, contextId, currentUser }) => {
  const [data, setData] = useState();

  const {
    data: contextData,
    error,
    isLoading,
    isError,
  } = useGetMessagingContextQuery({
    context: context,
    contextId: contextId,
  });

  const [displayName, setDisplayName] = useState();

  if (isLoading) {
    return (
      <div className={className}>
        <span>Loading</span>
      </div>
    );
  }

  if (isError) {
    console.error(error);
    return (
      <div className={className}>
        <span>{JSON.stringify(error)}</span>
      </div>
    );
  }

  useEffect(() => {
    if (!contextData) {
      return;
    }

    if (context === "groups") {
      setData(contextData);
    } else if (context === "friends") {
      setData(contextData.friend);
    }
  }, [contextData]);

  useEffect(() => {
    if (!data) return;

    if (data.id === currentUser.id) {
      setDisplayName("You");
    } else {
      setDisplayName(data.name ? data.name : data.username);
    }
  }, [data]);

  const handleChatSettings = () => {
    console.log("Settings Clicked ", data);
  };

  return (
    data && (
      <div className={className}>
        <AvatarImg
          className="profile-img"
          src={data.avatarUrl}
          alt={`${data.username} avatar`}
          username={data.username}
        />
        <div className="chat-details">
          <span className="name">{displayName}</span>
          <span className="last-seen">Last Seen 5 days ago</span>
        </div>
        <div className="chat-settings">
          <button onClick={handleChatSettings}>
            <ThreeDotFill width={16} height={16} color={"black"} />
          </button>
        </div>
      </div>
    )
  );
};

export default ChatHeader;
