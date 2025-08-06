export type SigninDto = {
  email: string;
  password: string;
};

export type SignupDto = {
  email: string;
  password: string;
  commandId: string;
};

export type SigninResponse = {
  token: string;
};

export type SignupResponse = {
  token: string;
};
