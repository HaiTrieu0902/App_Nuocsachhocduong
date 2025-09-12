import { AxiosResponse } from 'axios';
import client from '..';

export const UploadImagesApi = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('images', file);
  });
  return client
    .post('common/upload-images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: AxiosResponse) => res.data);
};
