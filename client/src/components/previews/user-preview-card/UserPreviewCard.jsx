import { useMutation } from "@tanstack/react-query";
import React from "react";

import "./user-preview-card.scss";
import { sendFriendRequest } from "../../../services/api/friends.api";
import { useDispatch } from "react-redux";
import { onChatSelect } from "../../../features/chats/chat-container.slice";
import PersonFillAdd from "../../icons/PersonFillAdd";

const UserPreviewCard = ({ user }) => {
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationKey: ["send_friend_request"],
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      console.log("Friend Request sent");
    },
  });

  /**
   *
   * @param {React.KeyboardEvent<HTMLButtonElement>} event
   */
  const handleFriendRequest = (event) => {
    event.stopPropagation();
    console.log(`Friend Request Clicked`);
    // handle send friend request
  };

  const handlePreviewClick = () => {
    // display the message tab
    console.log("Preview Card Click");
    dispatch(
      onChatSelect({
        data: user,
        context: "user",
      })
    );
  };
  return (
    <div className="user-preview-card" onClick={handlePreviewClick}>
      <img
        src={user.avatarUrl}
        alt={`${user.isCurrentUser ? "Your" : user.username + "'s"} avatar`}
      />
      <div className="bio">
        <span className="username">
          {user.isCurrentUser ? "You" : user.username}
        </span>
        {!user.isCurrentUser && (
          <button onClick={handleFriendRequest}>
            <PersonFillAdd width={24} height={24} color={"purple"} />
          </button>
        )}
      </div>
    </div>
  );
};

export default UserPreviewCard;
