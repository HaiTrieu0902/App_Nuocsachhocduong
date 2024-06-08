import { ILoginParams } from '@/models/auth.model';
import { AxiosResponse } from 'axios';
import client from '..';

export const loginAPI = async (data: ILoginParams) => {
  return client.post('auth/login', data).then((res: AxiosResponse) => res.data);
};

export const senOTPAPI = async (data: { email: string }) => {
  return client.post('auth/sendOTP', data).then((res: AxiosResponse) => res.data);
};
