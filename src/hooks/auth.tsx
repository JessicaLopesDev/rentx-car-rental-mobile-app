import React, { 
  createContext, 
  ReactNode, 
  useContext, 
  useEffect, 
  useState } from "react";
import { database } from "../database";
import api from "../services/api";
import { User as ModelUser} from '../database/model/User';


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
  signOut: () => Promise<void>;
  updatedUser: (user: User) => Promise<void>;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children } : AuthProviderProps) {
  const [data, setData] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  async function signIn({ email, password } : SignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password
      }); 
      
      const { token, user } = response.data;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const userCollection = database.get<ModelUser>('users');
      await database.write(async() => {
        const { id, user_id, name, avatar, driver_license, email, token } = await userCollection.create(( newUser ) => {
          newUser.user_id = user.id,
          newUser.name = user.name,
          newUser.email = user.email,
          newUser.driver_license = user.driver_license,
          newUser.avatar = user.avatar,
          newUser.token = token
        })

        setData({ id, user_id, name, avatar, driver_license, email, token })
      })

    } catch (error) {
      throw new Error(error as string)
    }
  }

  async function signOut() {
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
      });

      setData({} as User);
    } catch (error) {
      throw new Error(error);
    }
  }

  async function updatedUser(user: User) {
    try {
      const userCollection = database.get<ModelUser>('users')
      await database.write(async () => {
        const userSelected = await userCollection.find(user.id)
        await userSelected.update((userData) => {
          userData.name = user.name,
          userData.driver_license = user.driver_license,
          userData.avatar = user.avatar
        });
      });

      setData(user);

    } catch (error) {
      throw new Error(error as string)
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<ModelUser>('users');
      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as User;

      api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      setData(userData);
        setLoading(false)
      }
    }
    loadUserData()
  },[])

  return (
    <AuthContext.Provider
      value={{
        user: data,
        signIn,
        signOut,
        updatedUser,
        loading
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