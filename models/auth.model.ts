/* Params */
export interface ILoginParams {
  email: string;
  password: string;
  deviceLogin?: string;
}

export interface IVerifyOTP {
  email: string;
  otp: string;
}

export interface IForgotPassword {
  email: string;
  password: string;
  confirmPassword: string;
}
