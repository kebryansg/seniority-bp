export interface AuthRequest {
  email: string;
  password: string;
  authorid?: number;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  data?: Data;
}

export interface Data {
  id: number;
  email: string;
  authorid: number;
  jwt: string;
}
