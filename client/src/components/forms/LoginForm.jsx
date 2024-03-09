import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { loginUser } from "../../services/api/auth.api";
import { useDispatch } from "react-redux";
import { onLogin } from "../../features/auth/auth.slice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["login_user"],
    mutationFn: loginUser,
    onSuccess: (data) => {
        console.log('Logged In ', data)
        // dispatch here
        dispatch(onLogin(data.user));
        navigate("/")
    },
    onError: (error) => {

        const errors = JSON.parse(error.message.errors);
        console.error('Login Form Errors ', errors);
    }
  })

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    mutation.mutate(formData)
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

      <button type="button" onClick={handleSubmit}>
        Login
      </button>
      <span>Don't have an account? <Link to="/auth/sign-up">Sign Up</Link></span>
    </form>
  );
};

export default LoginForm;
