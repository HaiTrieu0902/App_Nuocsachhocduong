export interface IInforUser {
  fullName: string;
  email: string;
  sdt: string | number;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
