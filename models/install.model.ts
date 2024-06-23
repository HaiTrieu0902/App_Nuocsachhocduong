import { IGetListParamCommon } from './common.model';

export interface IInstallRecord {
  id?: string;
  productId: string;
  quantity: number;
  schoolId: string;
  staffId?: string;
  accountId: string;
  timeInstall?: Date;
  statusId: string;
  totalAmount: number;
  isDelete?: boolean;
  warrantyPeriod?: number;

  // get list
  product?: {
    id: string;
    name: string;
    code: string;
    price: number;
    images: any[];
    discount?: number;
  };
  school?: {
    id: string;
    name: string;
    address: string;
    email: string;
    phoneNumber: string;
  };
  account?: {
    id: string;
    fullName: string;
  };
  staff?: {
    id: string;
    fullName: string;
  };
  status?: {
    id: string;
    name: string;
  };
  createAt?: string | any;
  updatedAt?: string | any;
}

export interface IGetListParamInstall extends IGetListParamCommon {
  productId?: string;
  schoolId?: string;
  statusId?: string;
  staffId?: string;
  accountId?: string;
  isDelete?: boolean;
}

export interface IStatusInstallRecord {
  id?: string;
  statusId?: string;
  staffId?: string;
  role?: string;
}
