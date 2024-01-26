import React, { useEffect } from "react";
import { SetStateAction, createContext, useState } from "react";
import {
  TYPE_DatabaseResponse,
  TYPE_LoggedInUserInfo,
  TYPE_User,
} from "../utils/types";
import { getLoggedInUser } from "../store/database";

type Context = {
  exploreApp?: boolean;
  setExploreApp?: React.Dispatch<SetStateAction<boolean>>;
  user?: TYPE_User | undefined;
  setUser?: React.Dispatch<React.SetStateAction<TYPE_User | undefined>>;
  signInUser?: (
    user: TYPE_LoggedInUserInfo
  ) => Promise<TYPE_DatabaseResponse<Boolean>>;
  signOutUser?: () => Promise<TYPE_DatabaseResponse<Boolean>>;
  registerUser?: (user: TYPE_User) => Promise<TYPE_DatabaseResponse<Boolean>>;
};

const AuthContext = createContext<Context>({});

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<TYPE_User>();
  const [exploreApp, setExploreApp] = useState<boolean>(false);

  const verifyLoggedInUser = async () => {
    const loggedInUser = await getLoggedInUser();
    if (loggedInUser?.success && loggedInUser.data) {
      setUser(loggedInUser.data);
    }
  };

  useEffect(() => {
    verifyLoggedInUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        exploreApp,
        setExploreApp,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
