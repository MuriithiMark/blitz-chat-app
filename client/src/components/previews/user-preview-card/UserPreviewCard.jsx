import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./user-preview-card.scss";
import {
  sendFriendRequest,
  getFriendShipById,
  declineFriendRequest,
  acceptFriendRequest,
} from "../../../services/api/friends.api";
import { onChatSelect } from "../../../features/chats/chat-container.slice";
import PersonFillAdd from "../../icons/PersonFillAdd";

const queryClient = new QueryClient();

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
        queryKey: [`get_friendship_by_id_${user.id}`],
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
        queryKey: [`get_friendship_by_id_${user.id}`],
      });
    },
  });

  const decline = useMutation({
    mutationKey: ["decline_friend_request"],
    mutationFn: async () => declineFriendRequest(friendShip.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`get_friendship_by_id_${user.id}`],
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

const UserPreviewCard = ({ user }) => {
  const [friendShip, setFriendShip] = useState();
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);
  // user been chat with
  const selectedUser = useSelector((state) => state.chatContainer.data);

  const dispatch = useDispatch();

  const { error, isLoading, data } = useQuery({
    queryKey: [`get_friendship_by_id_${user.id}`],
    queryFn: async () => {
      if (isCurrentUser) {
        return { status: "fail" };
      }
      return getFriendShipById(user.id);
    },
  });

  const handlePreviewClick = () => {
    // return navigate(`/chat/user/${user.id}`)
    dispatch(
      onChatSelect({
        context: "user",
        data: { ...user, friendShipId: friendShip ? friendShip.id : null },
      })
    );
  };

  useEffect(() => {
    if (!user || !currentUser) {
      return;
    }
    setIsCurrentUser(currentUser.id === user.id);
  }, [user, currentUser]);

  useEffect(() => {
    if (error || isLoading) {
      return;
    }

    setFriendShip(data.friendShip);
  }, [data, error, isLoading]);

  return (
    <div
      className={`user-preview-card ${
        selectedUser && selectedUser.id === user.id ? "selected" : ""
      }`}
      onClick={handlePreviewClick}
    >
      <img
        src={user.avatarUrl}
        alt={`${isCurrentUser ? "Your" : user.username + "'s"} avatar`}
      />
      <div className="bio">
        <span className="username">
          {isCurrentUser ? "You" : user.username}
        </span>
        {!isLoading ? (
          <FriendShipStatusAction
            isCurrentUser={isCurrentUser}
            currentUser={currentUser}
            friendShip={friendShip}
            user={user}
          />
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </div>
  );
};

export default UserPreviewCard;
