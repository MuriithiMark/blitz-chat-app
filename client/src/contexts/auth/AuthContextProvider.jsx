import React, { useState } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import { SERVER_URL } from "../../utils/constants";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = SERVER_URL;

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const verifyToken = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/auth/verify-token");
      setUser(response.data.user);
      setIsLoading(false);
      setError(null)
    } catch (error) {
      console.error(error);
      setError(error);
      setIsLoading(false);
    }
  };

  const loginUser = async (loginData) => {
    setIsLoading(true);
    try {
      await axios.post(`/auth/login`, loginData);
      await verifyToken();
      setIsLoading(false);
      setError(null)
    } catch (error) {
      console.error(error);
      setError(error);
      setUser(null);
    }
  };

  const logoutUser = async () => {
    setIsLoading(true);
    try {
      await axios.get(`/auth/logout`);
      setUser(null);
      setIsLoading(false);
      setError(null)
    } catch (error) {
      console.error(error);
      setError(error);
      setIsLoading(false);
      setUser(null);
    }
  };

  const registerUser = async () => {
    setIsLoading(true);
    try {
      await axios.post("/auth/register", registerData);
      setIsLoading(false);
      setError(null)
    } catch (error) {
      console.error(error);
      setError(error);
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        isLoading,
        loginUser,
        logoutUser,
        registerUser,
        verifyToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
