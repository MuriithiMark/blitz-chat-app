import { createContext } from "react";

export type LoginData = { username: string, password: string };
export type RegisterData = LoginData & { email: string };
export type User = {
    id: string;
    username: string,
    email: string,
    avatarUrl: string
    name: string;
}

const defaultValue = {
    user: undefined,
    error: undefined as unknown,
    isLoading: false,
    login: async (data: LoginData) => { },
    logout: async () => { },
    register: async (data: RegisterData) => { }
}

type AuthContextProps = {
    user?: User,
    error: unknown;
    isLoading: boolean;
    login: (data: LoginData) => Promise<void>;
    logout: () => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>(defaultValue)

export default AuthContext;