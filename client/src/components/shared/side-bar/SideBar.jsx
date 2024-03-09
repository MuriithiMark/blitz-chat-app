import React from "react";

import "./side-bar.scss";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsers } from "../../../services/api/users.api";
import UserPreviewCard from "../../previews/user-preview-card/UserPreviewCard";
import { useSelector } from "react-redux";

const SideBar = ({ className }) => {
  const currentUser = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();
  const { error, isLoading, data } = useQuery({
    queryKey: ["getUsers"],
    queryFn: getAllUsers,
  });

  return (
    <div className={className}>
      {isLoading && <span className="loading">loading ...</span>}
      {error && (
        <span className="error" style={{ color: "red" }}>
          {error.message}
        </span>
      )}
      {data && data.status === "success" && (
        <div className="data_container">
          {data.users.map((user) => {
            user.isCurrentUser = false;
            if (user.id === currentUser.id) {
              user.isCurrentUser = true;
            }
            return <UserPreviewCard key={user.id} user={user} />;
          })}
        </div>
      )}
    </div>
  );
};

export default SideBar;
