import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./login-form.scss";
import { useDispatch } from "react-redux";
import useFormState from "../../../hooks/useFormState.hook";
import { useLoginUserMutation } from "../../../features/api";
import { onLogin } from "../../../features/auth/auth.slice";
import AuthContext from "../../../contexts/auth/AuthContext";

const LoginForm = () => {

  const [formData, handleChange, reset] = useFormState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  // const [loginUser, result] = useLoginUserMutation();
  const { loginUser } = useContext(AuthContext)

  const handleSubmit = async (event) => {
    event.preventDefault();
    loginUser(formData)
      .then(() => {
        return navigate("/");
      })
      .catch((error) => {
        console.error("rejected ", error);
      });
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
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

      <button className="submit-btn" type="submit">
        Login
      </button>
      <span>
        Don't have an account? <Link to="/auth/sign-up">Sign Up</Link>
      </span>
    </form>
  );
};

export default LoginForm;
