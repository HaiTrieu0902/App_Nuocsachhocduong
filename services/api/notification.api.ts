import { IGetListParamNotification } from '@/models/notification.model';
import client from '..';
import { AxiosResponse } from 'axios';

export const getListNotificationAPI = (params: IGetListParamNotification) => {
  return client.get('notification/get-list-notification', { params }).then((res: AxiosResponse) => res.data);
};

export const readNotificationAPI = (id: string) => {
  return client.put(`notification/read-notification/${id}`).then((res: AxiosResponse) => res.data);
};
