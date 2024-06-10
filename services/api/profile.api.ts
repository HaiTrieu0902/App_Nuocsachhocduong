import { AxiosResponse } from 'axios';
import client from '..';
import { IProfileDetail } from '@/models/profile.model';

export const getProfileUserAPI = async (id: string) => {
  return client.post(`user/get-profile/${id}`).then((res: AxiosResponse<IProfileDetail>) => res?.data);
};

export const updateProfileUserAPI = async (id: string) => {
  return client.post(`user/get-profile/${id}`).then((res: AxiosResponse<IProfileDetail>) => res?.data);
};

export const changePasswordAPI = async (id: string) => {
  return client.post(`user/get-profile/${id}`).then((res: AxiosResponse<IProfileDetail>) => res?.data);
};

export const deleteUserAPI = async (id: string) => {
  return client.post(`user/get-profile/${id}`).then((res: AxiosResponse<IProfileDetail>) => res?.data);
};
