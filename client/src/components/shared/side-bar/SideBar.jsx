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

  if (error) {
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
          style={{ color: "red", textTransform: "capitalize" }}
        >
          {error.message}
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
        <span className="loading" style={{ textTransform: "capitalize" }}>
          loading ...
        </span>
      </div>
    );
  }

  return (
    <div className={className}>
      {data && data.status === "success" && (
        <div className="data_container">
          {data.users.map((user) => (
            <UserPreviewCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SideBar;
