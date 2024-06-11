import { AxiosResponse } from 'axios';
import client from '..';
import { IChangePassword, IInforUser, IProfileDetail } from '@/models/profile.model';
import { CommonResponse } from '../interface';

export const getProfileUserAPI = async (id: string) => {
  return client.get<CommonResponse<IProfileDetail>>(`user/get-profile/${id}`).then((res) => res?.data);
};

export const updateProfileUserAPI = async (payload: IInforUser) => {
  return client.put(`user/update-user`, payload).then((res) => res?.data);
};

export const changePasswordAPI = async (payload: IChangePassword) => {
  return client.put(`user/change-password`, payload).then((res) => res?.data);
};

export const deleteUserAPI = async (id: string) => {
  return client.post(`user/delete-user/${id}`).then((res) => res?.data);
};
