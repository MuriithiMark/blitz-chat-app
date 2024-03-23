import { useState } from "react";

import axios from "axios";
import AuthContext from "./AuthContext";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

const AuthContextProvider = ({ children }: { children: React.JSX.Element }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  const login = async (data: import("./AuthContext").LoginData) => {
    try {
      const response = await axios.post("/auth/login", data);
      setUser(response.data.user);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/auth/logout");
      setUser(undefined);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const register = async (data: import("./AuthContext").RegisterData) => {
    try {
      await axios.post("/auth/register", data);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, error, isLoading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
