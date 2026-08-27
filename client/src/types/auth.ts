export interface User {
  _id: string;
  name: string;
  email?: string;
  contactNo?: string;
  role?: string;
}

export interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  loading: boolean;

  register: (
    formData: FormData
  ) => Promise<void>;

  logout: () => Promise<void>;

  refreshSession: () => Promise<void>;
}