import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { registerUser } from "../../services/api/auth.api";
import { useNavigate } from "react-router-dom";
import useFormState from "../../hooks/use-form-state";

const SignUpForm = () => {
  const [formData, handleChange] = useFormState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    registerUser(formData)
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
        Email
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="jane.doe@email.com"
        />
      </label>
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
      <label>
        Confirm Password
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder=""
        />
      </label>

      <br />

      <button type="button" onClick={handleSubmit}>
        Sign Up
      </button>
      <span>
        Already have an account? <Link to="/auth/login">Login</Link>
      </span>
    </form>
  );
};

export default SignUpForm;
