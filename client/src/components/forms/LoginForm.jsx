import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { loginUser } from "../../services/api/auth.api";
import { useDispatch } from "react-redux";
import { onLogin } from "../../features/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import useFormState from "../../hooks/use-form-state";

const LoginForm = () => {
  const [formData, handleChange] = useFormState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    loginUser(formData)
      .then((data) => {
        if (data.status === "fail") {
          // TODO handle failure
          return;
        }
        dispatch(onLogin(data.user));
        return navigate("/");
      })
      .catch((error) => {
        console.error(error);
        return;
      });
  };

  return (
    <form>
      <label>
        Username
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="jane.doe"
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder=""
        />
      </label>

      <br />

      <button className="submit-btn" type="button" onClick={handleSubmit}>
        Login
      </button>
      <span>
        Don't have an account? <Link to="/auth/sign-up">Sign Up</Link>
      </span>
    </form>
  );
};

export default LoginForm;
