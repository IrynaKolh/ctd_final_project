import { ReactNode, createContext, useState } from 'react';
import { AuthContextProps, AuthUser, StoreResponse } from '../models/interfaces';

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null
  );

  const [store, setStore] = useState<StoreResponse | null>(
    localStorage.getItem('storeInfo') ? JSON.parse(localStorage.getItem('storeInfo')!) : null
  );

  const login = (userData: AuthUser) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setStore(null);
  };

  const setStoreInfo = (storeInfo: StoreResponse) => {
    setStore(storeInfo);
  };

  const contextValue: AuthContextProps = {
    user,
    store,
    login,
    logout,
    setStoreInfo,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
