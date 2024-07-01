import { ESTATUS } from './enum';

export const styleButton = 'flex flex-row justify-center items-center rounded-md py-3 gap-2';
export const styleInput = 'relative border border-text_color_regular bg-white rounded-md pl-12 pr-4 py-4';
export const MAXIMUM_UPLOAD = 10;
export const DEFAULT_SIZE_PAGE = 10;
export const DEFAULT_SIZE_PAGE_MAX = 1000;

export const DEFAULT_PAGE_NUMBER = 1;

export const DATA_FILTER_PRODUCT = [
  {
    value: '',
    name: 'Tất cả',
  },
  {
    value: 'd3d449b0-7d05-4f0a-ad40-6a2f87f2e809',
    name: 'Thiết bị lọc nước kết hợp',
  },
  {
    value: '2587ff63-a9d6-4c68-9b2d-eab21fc2e670',
    name: 'Phụ kiện lọc nước',
  },
  {
    value: 'ed56c46f-674c-4dd8-bb5e-ecaa89951cdf',
    name: 'Thiết bị lọc nước cầm tay',
  },
  {
    value: '700fd5af-dca8-4071-9e89-da852b3c9f1d',
    name: 'Bộ lọc nước',
  },
  {
    value: '0ef2463a-4160-4f79-be17-ea6cdf7d0672',
    name: 'Bình lọc nước',
  },
  {
    value: '7aed6002-0787-481a-af9e-5137ee147542',
    name: 'Máy lọc nước',
  },
  {
    value: 'b9151fcd-9ebe-4ff4-ab8b-54941a0528c7',
    name: 'Vòi lọc nước',
  },
  // {
  //   name: 'Giá từ cao Thấp - Cao',
  //   value: '0',
  // },
  // {
  //   name: 'Giá từ cao Cao - Thấp',
  //   value: '1',
  // },
];

export const statusMessages: any = {
  [ESTATUS.COMPLETED]: {
    title: 'Thiết bị đã hoàn thành lắp đặt',
    message: 'Nếu thiết bị nhận được có vấn đề có có thể gửi yêu cầu bảo hàng sửa chữa và luôn nhé',
  },
  [ESTATUS.COMPLETE]: {
    title: 'Thiết bị đang chờ xác nhận từ trường học',
    message: 'Nếu thiết bị nhận được có vấn đề có có thể gửi yêu cầu bảo hàng sửa chữa và luôn nhé',
  },
  [ESTATUS.INPROGRESS_INSTALL]: {
    title: 'Thiết bị đang được nhân viên tiến hành lắp đặt',
    message: 'Hiện tại nhân viên kỹ thuật đã hoặc đang tiến hành lắp đặt thiết bị',
  },
  default: {
    title: 'Thiết bị đang chờ lắp đặt',
    message: 'Hệ thống sẽ xác nhận thiết bị yêu cầu lắp đặt, hãy chờ nhé',
  },
};

export const DATA_FILTER_MAINTENANCE = [
  {
    value: '',
    name: 'Tất cả',
  },
  {
    value: ESTATUS.PENDING,
    name: 'Chờ xử lý',
  },
  {
    value: ESTATUS.INPROGRESS,
    name: 'Đang xử lý',
  },
  {
    value: ESTATUS.COMPLETE,
    name: 'Hoàn thành',
  },
  {
    value: ESTATUS.COMPLETED,
    name: 'Đã hoàn thành',
  },
];
