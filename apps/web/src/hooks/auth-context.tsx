import { createContext } from "react";

type IAuthContext = {
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void
  };
  
  const initialValue = {
    token: null,
    setToken: () => {},
    logout: () => {}
  };
  
  export const AuthContext = createContext<IAuthContext>(initialValue);