export interface LoginFormData {
  username: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  password: string;
}

export interface SignupResponse {
  token: string;
}

export interface AuthUser {
  nickname?: string;
  about?: string;
}
