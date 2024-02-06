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

type Address = {
  country: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

type Contact = {
  phone: string;
  email: string;
};

type SocialMedia = {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  website?: string;
};

export interface StoreInfo {
  name: string;
  description: string;
  address: Address;
  contact: Contact;
  ratings?: number;
  socialMedia?: SocialMedia;
  owner?: string;
  _id?: string;
}

export interface StoreResponse {
  store: StoreInfo;
}

export interface AuthContextProps {
  user: AuthUser | null;
  store: StoreResponse | null;
  login: (userData: AuthUser) => void;
  logout: () => void;
  setStoreInfo: (storeInfo: StoreResponse) => void;
}

export interface StoreFormProps {
  title: string;
  storeInfo: StoreInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface MyStoreInfoProps {
  storeInfo: StoreInfo | null;
}
