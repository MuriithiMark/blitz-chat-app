import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import "./side-bar.scss";
import { getAllUsers } from "../../../services/api/users.api";
import UserPreviewCard from "../../previews/user-preview-card/UserPreviewCard";
import useAuthorizationCheck from "../../../hooks/use-authorization-check";

const SideBar = ({ className }) => {
  const { error, isLoading, data } = useQuery({
    queryKey: ["get_all_users"],
    queryFn: getAllUsers,
  });

  useAuthorizationCheck(error);

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
          style={{
            width: "100%",
            height: "100%",
            color: "red",
            textTransform: "capitalize",
          }}
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
      {data && data.status === "success" && (
        <div className="data-container">
          {data.users.map((user) => (
            <UserPreviewCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SideBar;
