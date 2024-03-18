import React from "react";

import "./chat-side-bar.scss";
import { useGetUserFriendsQuery } from "../../../features/api";
import ChatPreviewCard from "../chat-preview-card/ChatPreviewCard";
import SearchInput from "../../search/search-input/SearchInput";

const ChatSideBar = ({ className }) => {
  const {
    data: friends,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetUserFriendsQuery();

  if (isError) {
    return (
      <div className={`${className} error`} style={{ color: "red" }}>
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`${className} loading`} style={{ color: "green" }}>
        loading ...
      </div>
    );
  }

  return (
    <div className={className}>
      <SearchInput />
      {friends.length > 0 ? (
        <div className="data-container">
          {friends.map((friend) => (
            <ChatPreviewCard key={friend.id} friend={friend} />
          ))}
        </div>
      ) : (
        <NoFriendsComponent />
      )}
    </div>
  );
};

const NoFriendsComponent = () => {
  return (
    <div>
      <span>You current no friends!</span>
      <span> Find Friends you may know</span>
    </div>
  );
};
export default ChatSideBar;
