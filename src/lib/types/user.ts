export interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  hasPassword: boolean;
  createdAt: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}
