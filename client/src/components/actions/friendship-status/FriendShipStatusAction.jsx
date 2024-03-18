import React from "react";

import "./friendship-status.scss";
import PersonFillAdd from "../../icons/PersonFillAdd";
import {
  useAcceptFriendRequestMutation,
  useDeclineFriendRequestMutation,
  useGetUserFriendByIdQuery,
  useSendFriendRequestMutation,
} from "../../../features/api";
import useAuthenticatedUser from "../../../hooks/useAuthenticatedUser.hook";

const FriendShipStatusAction = ({ user }) => {
  const [currentUser] = useAuthenticatedUser();

  const {
    data: friendShip,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetUserFriendByIdQuery(user.id);

  console.log(
    `Query results for `,
    user.username,
    " :",
    friendShip,
    error,
    isLoading,
    isSuccess,
    isError
  );

  // Logged In cannot be his own friend
  if (user.id === currentUser.id) {
    return <></>;
  }

  // No such friendship, button to add friendship
  if (!friendShip) {
    return <SendFriendRequest friendId={user.id} />;
  }

  // Friendship was accepted
  if (user.hasAccepted) {
    return <span style={{ color: "green" }}>Accepted</span>;
  }

  // friendship was declined
  if (user.isDeclined) {
    return <span style={{ color: "red" }}>Blocked</span>;
  }

  // Logged In user initiated the friendship, but is pending
  if (friendShip.from.id === currentUser.id) {
    return (
      <div style={{ display: "flex", gap: "10px" }}>
        <span style={{ color: "orange" }}>Waiting</span>
        <DeclineFriendRequest />
      </div>
    );
  }

  // Current User has not accepted or declined a friend request
  return (
    <div
      className="friend-request-actions"
      style={{ display: "flex", gap: "10px" }}
    >
      <AcceptFriendRequest friendId={user.id} />
      <DeclineFriendRequest friendId={user.id} />
    </div>
  );
};

const SendFriendRequest = ({ friendId }) => {
  const [sendFriendRequest, result] = useSendFriendRequestMutation();

  if (result.isLoading) {
    return <div>Loading ....</div>;
  }

  return (
    <button onClick={() => sendFriendRequest(friendId)}>
      <PersonFillAdd width={24} height={24} color={"purple"} />
    </button>
  );
};

const AcceptFriendRequest = ({ friendId }) => {
  const [acceptFriendRequest, acceptResult] =
    useAcceptFriendRequestMutation(friendId);

  if (acceptResult.isLoading) {
    return <span>Loading ...</span>;
  }

  return (
    <button onClick={() => acceptFriendRequest(friendId)}>
      <span style={{ color: "green" }}>Accept</span>
    </button>
  );
};

const DeclineFriendRequest = ({ friendId }) => {
  const [declineFriendRequest, declineResult] =
    useDeclineFriendRequestMutation(friendId);

  if (declineResult.isLoading) {
    return <span>Loading ...</span>;
  }

  return (
    <button onClick={() => declineFriendRequest(friendId)}>
      <span style={{ color: "red" }}>Decline</span>
    </button>
  );
};

export default FriendShipStatusAction;
