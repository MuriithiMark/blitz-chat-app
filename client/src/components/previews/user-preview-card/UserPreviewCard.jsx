import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./user-preview-card.scss";
import {
  sendFriendRequest,
  getFriendShipByFriendId,
  declineFriendRequest,
  acceptFriendRequest,
} from "../../../services/api/friends.api";
import {
  onChatLeave,
  onChatSelect,
} from "../../../features/chats/chat-container.slice";
import useAuthorizationCheck from "../../../hooks/use-authorization-check";
import FriendShipStatusAction from "../../actions/friendship-status/FriendShipStatusAction";
import FullUserDetailsPreview from "../full-user-details/FullUserDetailsPreview";
import {
  useGetUserFriendByIdQuery,
  useGetUserFriendsQuery,
} from "../../../features/api";
import { useNavigation } from "react-router-dom";
import useAuthenticatedUser from "../../../hooks/useAuthenticatedUser.hook";
import { UserProfileIcon } from "../../../assets";

const queryClient = new QueryClient();

const UserPreviewCard = ({ friend }) => {
  const [user, isLoading] = useAuthenticatedUser();
  console.log("User ", user, " Friend ", friend);
  const [friendShip, setFriendShip] = useState();
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);
  // user been chat with
  const selectedUser = useSelector((state) => state.chatContainer.data);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // const { error, isLoading, data } = useQuery({
  //   queryKey: [`get_friendship_by_friend_id`, user.id],
  //   queryFn: async () => {
  //     if (isCurrentUser) {
  //       return { status: "fail" };
  //     }
  //     return getFriendShipByFriendId(user.id);
  //   },
  // });

  const {
    data,
    isLoading: isLoadingFriend,
    isSuccess,
    isError,
  } = useGetUserFriendByIdQuery(friend && friend.id);

  // useAuthorizationCheck(error);

  const handlePreviewClick = () => {
    if (!friend) return;
    // // clear chat container
    // dispatch(onChatLeave());
    // dispatch(
    //   onChatSelect({
    //     context: "user",
    //     data: { ...user, friendShipId: friendShip ? friendShip.id : null },
    //   })
    // );
    return navigate(`/chat/friends/${friend.id}`);
  };

  // useEffect(() => {
  //   if (!user || !currentUser) {
  //     return;
  //   }
  //   setIsCurrentUser(currentUser.id === user.id);
  // }, [user, currentUser]);

  // useEffect(() => {
  //   if (error || isLoading) {
  //     return;
  //   }

  //   setFriendShip(data.friendShip);
  // }, [data, error, isLoading]);

  if (isLoadingFriend) {
    return <span>Loading ....</span>;
  }

  return (
    friend &&
    user.id === friend.id && (
      <div
        className={`user-preview-card ${
          selectedUser.id === user.id ? "selected" : ""
        }`}
        onClick={handlePreviewClick}
      >
        <img
          src={user.avatarUrl ? user.avatarUrl : UserProfileIcon}
          alt={`${isCurrentUser ? "Your" : user.username + "'s"} avatar`}
        />
        <div className="bio">
          <Link to={`/user/${user.username}`}>
            <span className="username">
              {isCurrentUser ? "You" : user.username}
            </span>
          </Link>
          {!isLoading ? (
            <FriendShipStatusAction
              isCurrentUser={isCurrentUser}
              currentUser={currentUser}
              friendShip={friendShip}
              user={user}
            />
          ) : (
            <span>No Friends Available</span>
          )}
        </div>
      </div>
    )
  );
};

export default UserPreviewCard;
