import { IInstallRecord } from './install.model';
import { IMaintenance } from './maintenance.model';

export interface IRevenueDetails {
  installs: IInstallRecord[];
  maintenances: IMaintenance[];
  mergedData?: MergeData[];
}

export interface IRevenueList {
  schools?: number;
  staffs?: number;
  installRecords: number;
  quantity?: number;
  totalAmount?: number;
  totalMaitenance: number;
  dataChartInstall: DataChart[];
}

export interface DataChart {
  month: number;
  total: number;
}

export interface MergeData {
  productId: string;
  productName: string;
  totalAmount: number;
  quantity: number;
  totalRepairFees: number;
  installCount: number;
  maintenanceCount: number;
}
