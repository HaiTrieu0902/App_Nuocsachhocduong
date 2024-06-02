// import { HOST_API_APP } from '@env';
import { asyncStorageService } from '@/utils/storage';
import axios from 'axios';
const client = axios.create({
  baseURL: String('http://192.168.1.3:7001/api/'),
  timeout: 100000,
});
client.interceptors.request.use(
  async (config) => {
    const access_token = await asyncStorageService.getValue('access_token');
    if (config.method === 'get') {
      const currentTime = new Date().getTime();
      const oldUrl: any = config.url;
      let newUrl = config.url;
      if (oldUrl.includes('?')) {
        newUrl = `${oldUrl}&time=${currentTime}`;
      } else {
        newUrl = `${oldUrl}?time=${currentTime}`;
      }
      config.url = newUrl;
    }
    const cloneConfig: any = { ...config };
    if (access_token) {
      cloneConfig.headers['Authorization'] = `Bearer ${access_token}`;
    }
    return cloneConfig;
  },
  (error) => Promise.reject(error),
);

client.interceptors.response.use(
  (response) => response,
  (error) => responseErrorHandler(error),
);

const responseErrorHandler = async (error: any) => {
  if (error.response.status === 401) {
  }
  return Promise.reject(error.response.data);
};

export default client;
