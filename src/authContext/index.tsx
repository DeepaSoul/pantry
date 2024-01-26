import React from 'react';
import {SetStateAction, createContext, useState} from 'react';
import {TYPE_LoggedInUserInfo, TYPE_User} from '../utils/types';

type Context = {
  exploreApp?: boolean;
  setExploreApp?: React.Dispatch<SetStateAction<boolean>>;
  user?: TYPE_User | undefined;
  setUser?: React.Dispatch<React.SetStateAction<TYPE_User | undefined>>;
  signInUser?: (user: TYPE_LoggedInUserInfo) => void;
  signOutUser?: () => void;
  registerUser?: (user: TYPE_User) => void;
};

const AuthContext = createContext<Context>({});

export const AuthProvider = ({children}: {children: JSX.Element}) => {
  const [user, setUser] = useState<TYPE_User>();
  const [exploreApp, setExploreApp] = useState<boolean>(false);

  const signInUser = (user: TYPE_LoggedInUserInfo) => {};
  const signOutUser = () => {};
  const registerUser = (user: TYPE_User) => {};

  return (
    <AuthContext.Provider
      value={{
        exploreApp,
        setExploreApp,
        user,
        setUser,
        signInUser,
        signOutUser,
        registerUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
