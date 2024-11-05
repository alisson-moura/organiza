import axios from "axios";
import { useMemo } from "react";
import { useEffect } from "react";
import {  ReactNode, useState } from "react";
import { AuthContext } from "./auth-context";

type Props = {
  children?: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
    const [token, setToken_] = useState<string | null>(localStorage.getItem('token') ?? null);
  
    useEffect(() => {
      if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        localStorage.setItem('token', token);
      } else {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
      }
    }, [token]);
    
    const setToken = (newToken: string) => {
      setToken_(newToken);
    };

    const logout = () => {
      setToken_(null)
    }
  
    const contextValue = useMemo(
      () => ({
        token,
        setToken,
        logout
      }),
      [token]
    );
    
    return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    );
  };