/* eslint-disable @typescript-eslint/no-unused-vars */

import { AxiosResponse } from 'axios';
import client from '..';

export const getListRevenueInvestSchoolAPI = (params: { schoolId: string; year: string | number; type: string }) => {
  return client.get('revenue/revenue-invest-school', { params }).then((res: AxiosResponse) => res.data);
};
