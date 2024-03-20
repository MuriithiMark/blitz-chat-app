import React from "react";
import { useGetAllUsersQuery } from "../../features/api";
import UserPreviewCard from "../../components/previews/user-preview-card/UserPreviewCard";

const UsersPage = () => {
  const {
    data: users,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetAllUsersQuery();

  if (isError) {
    return <div style={{ color: "red", fontSize: "xxx-large" }}>{error.message}</div>;
  }

  if (isLoading) {
    return (
      <div style={{ color: "green", fontSize: "xxx-large" }}>Loading ...</div>
    );
  }

  return (
    <div>
      {users.map((user) => (
        <UserPreviewCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UsersPage;
