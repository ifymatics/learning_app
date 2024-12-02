/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, createContext, useEffect, useState } from "react";

import { requestConfig } from "./services/axios";
interface AuthProviderProp {
  children: ReactNode;
}
export type LoginData = {
  email: string;
  password: string;
};
export interface CurrentUser {
  firstname: string;
  lastname: string;
  role: string;
  id: number;
}
export type LoggedInUserData = {
  email: string;
  id: string;
  role: string;
};
interface AuthContextProp {
  login: (value: LoginData, url?: string) => Promise<LoggedInUserData>;
  logout: () => void;
  // adminLogin: (value: LoginData) => Promise<void>;
  currentUser: CurrentUser | null;
}
export const AuthContext = createContext<AuthContextProp>({
  login: async (_data: LoginData): Promise<LoggedInUserData> => {
    return {} as LoggedInUserData;
  },
  logout: () => {},
  currentUser: {} as CurrentUser,
});

const AuthContextProvider = ({ children }: AuthProviderProp) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(
    JSON.parse(
      global.localStorage ? (global.localStorage.getItem("user") as string) : ""
    ) || null
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    global.localStorage
      ? global.localStorage.setItem("user", JSON.stringify(currentUser))
      : null;
  }, [currentUser]);

  const login = async (value: LoginData, url = "/api/auth/login") => {
    try {
      const { data } = await requestConfig.post(url, value);

      setCurrentUser({ ...data });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    localStorage.clear();
    setCurrentUser(null);
  };
  return (
    <AuthContext.Provider value={{ login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
