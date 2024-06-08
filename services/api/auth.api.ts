import { IForgotPassword, ILoginParams, IVerifyOTP } from '@/models/auth.model';
import { AxiosResponse } from 'axios';
import client from '..';

export const loginAPI = async (data: ILoginParams) => {
  return client.post('auth/login', data).then((res: AxiosResponse) => res.data);
};

export const senOTPAPI = async (data: { email: string }) => {
  return client.post('auth/sendOTP', data).then((res: AxiosResponse) => res.data);
};

export const verifyOTPAPI = async (data: IVerifyOTP) => {
  return client.post('auth/checkOTP', data).then((res: AxiosResponse) => res.data);
};

export const forgotPasswordAPI = async (data: IForgotPassword) => {
  return client.post('auth/forgot-password', data).then((res: AxiosResponse) => res.data);
};
