import React from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import useFormState from "../../../hooks/useFormState.hook";
import { useRegisterUserMutation } from "../../../features/api";

const SignUpForm = () => {
  const [formData, handleChange, reset] = useFormState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [registerUser, result] = useRegisterUserMutation();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    registerUser(formData)
      .unwrap()
      .then(() => {
        reset();
        return navigate("/auth/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
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

      <button type="submit" className="submit-btn">
        Sign Up
      </button>
      <span>
        Already have an account? <Link to="/auth/login">Login</Link>
      </span>
    </form>
  );
};

export default SignUpForm;
