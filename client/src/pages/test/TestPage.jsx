import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFormState from "../../hooks/useFormState.hook";
import { SERVER_URL } from "../../utils/constants";

// import { SERVER_URL } from "../../../constants";
// import { useFormState } from "../../../Hooks";

const TestPage = () => {
  const [data, handleChange] = useFormState({
    user_name: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch(`${SERVER_URL}/login`, {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      console.log(responseData)
      if (responseData.status) {
        return navigate("/");
      } else {
        console.log("Login failed", responseData.error);
      }
    } catch (error) {
      console.log("Fetch failed:", error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Username:{" "}
            <input
              type="text"
              name="user_name"
              value={data.user_name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password:{" "}
            <input
              type="password"
              value={data.password}
              name="password"
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default TestPage;