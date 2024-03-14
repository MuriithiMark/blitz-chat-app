import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { registerUser } from "../../services/api/auth.api";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationKey: ["register_user"],
    mutationFn: registerUser,
    onSuccess: () => {
      // navigate user to login page
      navigate("/auth/login")
    },
    onError: (error) => {
      // TODO handle errors
      console.log(error)
    },
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
    console.log(formData);
    // validate client schema
    // delete the confirmPassword
    delete formData.confirmPassword;
    mutation.mutate(formData)
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
      <span>Already have an account? <Link to="/auth/login">Login</Link></span>

    </form>
  );
};

export default SignUpForm;
