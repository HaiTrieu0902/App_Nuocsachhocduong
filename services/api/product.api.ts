import { IGetListParamProduct } from '@/models/product.model';
import { AxiosResponse } from 'axios';
import client from '..';

export const getListProductAPI = (params: IGetListParamProduct) => {
  return client.get('product/get-list-product', { params }).then((res: AxiosResponse) => res.data);
};

export const getDetailProductAPI = (id: string) => {
  return client.get(`product/get-detail-product/${id}`).then((res: AxiosResponse) => res.data);
};
