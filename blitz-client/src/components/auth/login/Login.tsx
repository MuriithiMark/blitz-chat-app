import React, { useContext } from "react";
import { useDispatch } from "react-redux";

import "./login.scss";
import useFormState from "../../../hooks/useFormState";
import AuthContext from "../../../contexts/auth/AuthContext";
import {
  toggleLogin,
  toggleRegister,
} from "../../../features/modals/modal.slice";

const Login = () => {
  const { data, handleChange, reset } = useFormState({
    username: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const dispatch = useDispatch();

  const onLoginClick = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login(data);
      reset();
      dispatch(toggleLogin());
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
      dispatch(toggleRegister());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={onLoginClick}>
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            placeholder="jane.doe"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="password"
          />
        </label>
        <button type="submit">Login</button>
        <span>
          Don't have an account{" "}
          <span className="action" onClick={handleRegister}>
            Sign Up
          </span>
        </span>
      </form>
    </div>
  );
};

export default Login;
