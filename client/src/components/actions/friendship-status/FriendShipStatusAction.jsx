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
import HourGlassIcon from "../../icons/HourGlassIcon";
import CheckIcon from "../../icons/CheckIcon";
import CancelXIcon from "../../icons/CancelXIcon";

const FriendShipStatusAction = ({ className, user }) => {
  const [currentUser] = useAuthenticatedUser();

  const {
    data: friendShip,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetUserFriendByIdQuery(user.id);

  // Logged In cannot be his own friend
  if (user.id === currentUser.id) {
    return <></>;
  }

  // No such friendship, button to add friendship
  if (!friendShip) {
    return (
      <div className={className}>
        <SendFriendRequest friendId={user.id} />;
      </div>
    );
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
  if (friendShip.fromId === currentUser.id) {
    return (
      <div className={className} >
        <HourGlassIcon width={20} height={20} color={"lightblue"} />
        <DeclineFriendRequest friendId={user.id} />
      </div>
    );
  }

  // Current User has not accepted or declined a friend request
  return (
    <div
      className={className}
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
      <PersonFillAdd width={20} height={20} color={"purple"} />
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
      <CheckIcon width={20} height={20} color={"green"} />
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
      <CancelXIcon width={20} height={20} color={"orangered"} />
    </button>
  );
};

export default FriendShipStatusAction;
