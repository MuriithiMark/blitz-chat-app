import { createContext } from "react";

export type  LoginData = { username: string, password: string};
export type RegisterData = LoginData & { email: string };

const defaultValue = {
    user: undefined,
    error: undefined as unknown,
    isLoading: false,
    login: async (data: LoginData) => {},
    logout: async () => {},
    register: async (data: RegisterData) => {}
}

const AuthContext = createContext(defaultValue)

export default AuthContext;