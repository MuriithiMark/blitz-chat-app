import { useContext } from "react";
import { useDispatch } from "react-redux";

import "./register.scss";
import useFormState from "../../../hooks/useFormState";
import AuthContext from "../../../contexts/auth/AuthContext";
import {
  toggleLogin,
  toggleRegister,
} from "../../../features/modals/modal.slice";

const Register = () => {
  const { data, handleChange, reset } = useFormState({
    email: "",
    username: "",
    password: "",
  });

  const { register } = useContext(AuthContext);
  const dispatch = useDispatch();

  const onRegisterClick = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await register(data);
      reset();
      dispatch(toggleLogin());
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      dispatch(toggleLogin());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={onRegisterClick}>
        <label htmlFor="email">
          Email
          <input
            type="text"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="jane.doe@email.com"
          />
        </label>
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
        <button type="submit">Sign Up</button>
        <span>
          Already have an account?{" "}
          <span className="action" onClick={handleLogin}>
            Login
          </span>
        </span>
      </form>
    </div>
  );
};

export default Register;
