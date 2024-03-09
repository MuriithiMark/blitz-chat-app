import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import "./side-bar.scss";
import { SERVER_URL } from "../../../utils/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsers } from "../../../services/api/users.api";

const SideBar = ({ className }) => {
  const queryClient = useQueryClient();
  const { error, isLoading, data } = useQuery({
    queryKey: ["getUsers"],
    queryFn: getAllUsers,
  });

  return (
    <div className={className}>
      {isLoading && <span>loading ...</span>}
      {error && <span style={{ color: "red" }}>{error.message}</span>}
      {data && data.status === "success" &&
        data.users.map((user) => {
          <div key={user.id}>
            <p>{user.name}</p>
            <button onClick={handleSendFriendRequest}>
              Send Friend Request
            </button>
          </div>;
        })}
    </div>
  );
};

export default SideBar;
