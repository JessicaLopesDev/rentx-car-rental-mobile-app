import { AxiosResponse } from "axios";
import React, { 
  createContext, 
  ReactNode, 
  useContext, 
  useState } from "react";
import api from "../services/api";

interface User {
  id: string;
  user_id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  // signOut: () => Promise<void>;
  // updatedUser: (user: User) => Promise<void>;
  // loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children } : AuthProviderProps) {
  const [data, setData] = useState<User>({} as User);

  async function signIn({ email, password } : SignInCredentials) {
    try {
      const response = await api.post<any>('/sessions', {
        email,
        password
      }); 
      const apiAxios: any = api;
      
      const { token, user } = response.data;
      apiAxios.defaults.headers.Authorization  = `Bearer ${token}`;

      setData({ token, ...user })
    } catch (error) {
      throw new Error(error as string)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user: data,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() : AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }