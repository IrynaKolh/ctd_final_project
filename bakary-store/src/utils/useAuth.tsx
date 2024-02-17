import { useContext } from 'react';
import { AuthContextProps } from '../models/interfaces';
import { AuthContext } from './AuthContext';

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
