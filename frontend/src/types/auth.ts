export interface User {
  id: string;
  name: string;
  email: string;
  company?: string;
  role?: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  company?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
