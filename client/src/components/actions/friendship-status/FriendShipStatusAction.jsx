import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import "./friendship-status.scss";
import {
  sendFriendRequest,
  declineFriendRequest,
  acceptFriendRequest,
} from "../../../services/api/friends.api";
import PersonFillAdd from "../../icons/PersonFillAdd";

const FriendShipStatusAction = ({
  isCurrentUser,
  currentUser,
  user,
  friendShip,
}) => {
  const navigate = useNavigate();

  const send = useMutation({
    mutationKey: ["send_friend_request"],
    mutationFn: async () => sendFriendRequest(user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`get_friendship_by_friend_id`, user.id],
      });
    },
    onError: (err) => {
      if (err.message === "unauthorized") {
        return navigate("/auth/login");
      }
    },
  });

  const accept = useMutation({
    mutationKey: ["accept_friend_request"],
    mutationFn: async () => acceptFriendRequest(friendShip.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`get_friendship_by_friend_id`, user.id],
      });
    },
  });

  const decline = useMutation({
    mutationKey: ["decline_friend_request"],
    mutationFn: async () => declineFriendRequest(friendShip.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`get_friendship_by_friend_id`, user.id],
      });
    },
  });

  const handleFriendRequest = (event) => {
    event.stopPropagation();
    send.mutate();
  };

  const handleAcceptFriendRequest = (event) => {
    event.stopPropagation();
    accept.mutate();
  };

  const handleDeclineFriendRequest = (event) => {
    event.stopPropagation();
    decline.mutate();
  };

  // Logged In cannot be his own friend
  if (isCurrentUser) {
    return <></>;
  }

  // No such friendship, button to add friendship
  if (!friendShip) {
    return (
      <button onClick={handleFriendRequest}>
        <PersonFillAdd width={24} height={24} color={"purple"} />
      </button>
    );
  }

  // Friendship was accepted
  if (friendShip.hasAccepted) {
    return <span style={{ color: "green" }}>Accepted</span>;
  }

  // Friendship was declined
  if (friendShip.isDeclined) {
    return <span style={{ color: "red" }}>Blocked</span>;
  }

  // Logged In user initiated the friendship, but is pending
  if (friendShip.userId === currentUser.id) {
    return <span style={{ color: "orange" }}>Waiting</span>;
  }

  // Current User has not accepted or declined a friend request
  return (
    <div
      className="friend-request-actions"
      style={{ display: "flex", margin: "8px", gap: "10px" }}
    >
      <button onClick={handleAcceptFriendRequest}>Accept</button>
      <button onClick={handleDeclineFriendRequest}>Decline</button>
    </div>
  );
};

export default FriendShipStatusAction;
