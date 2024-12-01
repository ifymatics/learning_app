/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
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
interface AuthContextProp {
  login: (value: LoginData, url?: string) => Promise<void>;
  logout: () => void;
  // adminLogin: (value: LoginData) => Promise<void>;
  currentUser: CurrentUser | null;
}
export const AuthContext = createContext<AuthContextProp>({
  login: async (_data: LoginData) => {},
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
      : "";
  }, [currentUser]);

  const login = async (value: LoginData, url = "/api/auth/login") => {
    try {
      const { data } = await requestConfig.post(url, value);

      setCurrentUser({ ...data });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    localStorage.clear();
  };
  return (
    <AuthContext.Provider value={{ login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
