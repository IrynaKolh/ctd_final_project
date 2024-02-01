export interface Login {
  email: string;
  password: string;
}

export interface Registration {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
  isSeller?: boolean;
}

export interface AuthUser {
  token: string;
  user: {
    name: string;
    isSeller: boolean;
  };
}

export interface AuthContextProps {
  user: AuthUser | null;
  login: (userData: AuthUser) => void;
  logout: () => void;
}
