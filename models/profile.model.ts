export interface IInforUser {
  id?: string;
  fullName: string;
  email: string;
  phoneNumber: string | number;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  email: string;
}

export interface IProfileDetail {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  roleID: string;
  schoolIdS: string[];
  avatar: string;
  isDelete: boolean;
  codeOTP: null | any;
  dob: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  role: Role;
}

export interface Role {
  role: string;
}
