// types/auth.ts
export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface JWTPayload {
  sub: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  authority: string;
  iat: number;
  exp: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  rehydrate: () => void;
}
