import React, { useState } from "react";

import "./chat-side-bar.scss";
import { useGetUserFriendsQuery } from "../../../features/api";
import ChatPreviewCard from "../chat-preview-card/ChatPreviewCard";
import SearchInput from "../../search/search-input/SearchInput";
import ThreeDotFill from "../../icons/ThreeDotFill";
import { useDispatch } from "react-redux";
import { openModal } from "../../../features/modals/modal.slice";

const ChatSideBar = ({ className }) => {
  const { data: friends, error, isLoading, isError } = useGetUserFriendsQuery();
  const [sideMenuIsOpen, setSideMenuIsOpen] = useState(false);
  const dispatch = useDispatch();

  if (isError) {
    console.error(error);
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

  const handleChatSidebarMenu = async () => {
    setSideMenuIsOpen(!sideMenuIsOpen);
  };

  const handleNewGroup = async () => {
    setSideMenuIsOpen(false)
    dispatch(openModal("create-group-form"));
  };

  const handleNewPost = async () => {};

  return (
    <div className={className}>
      <div className="chat-side-bar-header">
        <SearchInput className="search-box" />
        <button onClick={handleChatSidebarMenu} className="menu-btn">
          <ThreeDotFill width={20} height={20} color={"black"} />
        </button>
        {sideMenuIsOpen && (
          <div className="side-bar-menu">
            <button onClick={handleNewGroup}>New Group</button>
            <button onClick={handleNewPost}>New Post</button>
          </div>
        )}
      </div>
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
