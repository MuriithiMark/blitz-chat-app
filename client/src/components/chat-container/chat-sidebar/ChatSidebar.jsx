import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import "./chat-side-bar.scss";
import { getAllUsers } from "../../../services/api/users.api";
import UserPreviewCard from "../../previews/user-preview-card/UserPreviewCard";
import useAuthorizationCheck from "../../../hooks/use-authorization-check";
import { useGetUserFriendsQuery } from "../../../features/api";
import useAuthenticatedUser from "../../../hooks/useAuthenticatedUser.hook";

const ChatSideBar = ({ className }) => {
    useAuthenticatedUser();

  //   const { error, isLoading, data } = useQuery({
  //     queryKey: ["get_all_users"],
  //     queryFn: getAllUsers,
  //   });

  const {
    data: friends,
    isLoading,
    isSuccess,
    isError,
  } = useGetUserFriendsQuery();

  useAuthorizationCheck(error);

  if (isError) {
    return (
      <div
        className={className}
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          className="error"
          style={{
            width: "100%",
            height: "100%",
            color: "red",
            textTransform: "capitalize",
          }}
        >
          {"error.message"}
        </span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={className}
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          className="loading"
          style={{
            width: "100%",
            height: "100%",
            textTransform: "capitalize",
          }}
        >
          loading ...
        </span>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* {data && data.status === "success" && (
        <div className="data-container">
          {data.users.map((user) => (
            <UserPreviewCard key={user.id} user={user} />
          ))}
        </div>
      )} */}
      <div className="data-container">
        {friends.map((friend) => (
          <UserPreviewCard key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  );
};

export default ChatSideBar;
