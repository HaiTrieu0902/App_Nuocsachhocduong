import { IGetListParamInstall, IInstallRecord, IStatusInstallRecord } from '@/models/install.model';
import { INews } from '@/models/news.model';
import { AxiosResponse } from 'axios';
import client from '..';

export const getListInstallRecordAPI = (params: IGetListParamInstall) => {
  return client.get('install/get-list-install', { params }).then((res: AxiosResponse) => res.data);
};

export const getDetailInstallRecordAPI = (id: string) => {
  return client.get(`install/get-detail-install/${id}`).then((res: AxiosResponse) => res.data);
};

export const createInstallRecordAPI = (params: IInstallRecord) => {
  return client.post('install/create-install', params).then((res: AxiosResponse) => res.data);
};

export const updateStatusInstallRecordAPI = (params: IStatusInstallRecord) => {
  return client.put(`install/update-status-install`, params).then((res: AxiosResponse) => res.data);
};

export const deleteInstallRecordAPI = (id: string) => {
  return client.delete(`install/delete-install/${id}`).then((res: AxiosResponse<any>) => res.data);
};
