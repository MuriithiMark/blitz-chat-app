import { useEffect, useState } from "react";

import axios from "axios";
import AuthContext from "./AuthContext";
import { SERVER_URL } from "../../utils/constants";

axios.defaults.baseURL = SERVER_URL;
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
      setIsLoading(false);
    }
  };

  const register = async (data: import("./AuthContext").RegisterData) => {
    try {
      await axios.post("/auth/register", data);
    } catch (error) {
      console.error(error);
      setError(error);
      setIsLoading(false);
    }
  };

  const verifyToken = async () => {
    try {
      const response = await axios.get("/auth/verify-token");
      setUser(response.data.user);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setUser(undefined);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      verifyToken();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, error, isLoading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
