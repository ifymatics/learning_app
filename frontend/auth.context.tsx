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
  currentUser: CurrentUser;
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
  const [currentUser, setCurrentUser] = useState<CurrentUser>(
    JSON.parse(
      global.localStorage
        ? (global.localStorage?.getItem("user") as string)
        : "{}"
    ) || ({} as CurrentUser)
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    global.localStorage
      ? global.localStorage.setItem("user", JSON.stringify(currentUser))
      : {};
  }, [currentUser]);

  const login = async (value: LoginData, url = "/api/auth/login") => {
    try {
      const { data } = await requestConfig.post(url, value);

      setCurrentUser({ ...data });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response.data);
    }
  };

  const logout = () => {
    localStorage.clear();
    setCurrentUser({} as CurrentUser);
  };
  return (
    <AuthContext.Provider value={{ login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
