import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import "./side-bar.scss";
import { SERVER_URL } from "../../../utils/constants";

const SideBar = ({ className }) => {
  const [users, setUsers] = useState([]);

  const handleSendFriendRequest = async () => {};

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await fetch(`${SERVER_URL}/users`);
      const data = await response.json();
      if (data.status === "fail") {
        throw new Error(data.message);
      }
      return data.users;
    };

    fetchAllUsers()
      .then((users) => setUsers(users))
      .catch(console.error);
  }, []);

  return (
    <div className={className}>
      {users.map((user) => {
        <div key={user.id}>
          <p>{user.name}</p>
          <button onClick={handleSendFriendRequest}>Send Friend Request</button>
        </div>;
      })}
    </div>
  );
};

export default SideBar;
