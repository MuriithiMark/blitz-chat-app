import { useMutation } from "@tanstack/react-query";
import React from "react";

import "./user-preview-card.scss";
import { sendFriendRequest } from "../../../services/api/friends.api";

const UserPreviewCard = ({ user }) => {
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
  };
  return (
    <div className="user-preview-card" onClick={handlePreviewClick}>
      <img
        src={user.avatarUrl}
        alt={`${user.isCurrentUser ? "Your" : user.username + "'s"} avatar`}
      />
      <div className="bio">
        <span className="username">{user.isCurrentUser ? 'You' : user.username}</span>
        {!user.isCurrentUser && (
          <button onClick={handleFriendRequest}>Send Friend Request</button>
        )}
      </div>
    </div>
  );
};

export default UserPreviewCard;
