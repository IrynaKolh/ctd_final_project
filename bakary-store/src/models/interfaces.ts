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
  createdAt?: string;
  updatedAt?: string;
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
  isOpenStoreModal: boolean;
  onClose: () => void;
}

export interface MyStoreInfoProps {
  storeInfo: StoreInfo | null;
  products: ProductResponse[] | [];
  onDelete: (productId: string) => void;
}

export interface ProductFormProps {
  onClose: () => void;
  isAddProductModalOpen: boolean;
  title: string;
  setNeedUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

type Review = {
  body: string;
  data: Date;
  userId: string;
};

export interface Product {
  name: string;
  description: string;
  price: number;
  imageUrl: string[];
  category: string;
  storeId: string;
}

export interface ProductResponse extends Product {
  _id: string;
  createdAt: string;
  updatedAt: string;
  rating: number;
  review: [Review];
}

export type InputType = 'text' | 'number' | 'password' | 'email';
