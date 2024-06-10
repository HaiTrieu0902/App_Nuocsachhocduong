import { ESTORAGE } from '@/constants/enum';
import { asyncStorageService } from '@/utils/storage';

export const getTokenAndUser = async () => {
  try {
    const token = await asyncStorageService.getValue(ESTORAGE.TOKEN);
    const user = await asyncStorageService.getValue(ESTORAGE.USER);
    return { token, user };
  } catch (error) {
    console.error('Có lỗi khi lấy dữ liệu', error);
    return { token: null, user: null };
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  try {
    const token = await asyncStorageService.getValue(ESTORAGE.TOKEN);
    return token;
  } catch (error) {
    console.error('Có lỗi khi lấy dữ liệu token', error);
    return null;
  }
};

export const getAuthUser = async (): Promise<object | any> => {
  try {
    const user = await asyncStorageService.getValue(ESTORAGE.USER);
    return user;
  } catch (error) {
    console.error('Có lỗi khi lấy dữ liệu người dùng', error);
    return null;
  }
};
