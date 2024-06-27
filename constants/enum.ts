export enum EROUTER {
  /** AUTH */
  LOGIN = 'auth/Login',
  VERIFYOTP = 'auth/VerifyOTP',
  FORGOTPASSWORD = 'auth/ForgotPassword',
  RESETPASSWORD = 'auth/ResetPassword',

  /**  TABS*/
  TABS = '(tabs)',

  /** SCREEN  ================================*/
  HOME = 'home',
  PRODUCT = 'product',
  NOTIFACATION = 'notification',

  MAINTENACE = 'maintenance',
  MAINTENACE_CREATE_REQUEST = 'maintenance/CreateRequest',
  MAINTENACE_DETAIL = 'maintenance/DetailMaintenance',

  PROFILE = 'profile',
  PROFILE_INFOMATION = 'profile/InformationUser',
  PROFILE_CHANGE_PASS = 'profile/ChangePassword',
  PROFILE_LIST_ORDER = 'profile/ProductOrders',
  PROFILE_LIST_MAINTENANCE = 'profile/ListMaitenance',
  PROFILE_LIST_SCHOOL = 'profile/ListSchool',

  /** Common  ================================*/
  DETAIL_INSTALL_RECORD = 'common/DetailInstallRecord',
  /** No found */
  NOTFOUND = '+not-found',
}

export enum EPUSH_ROUTER {
  HOME = '/home',
  PRODUCT = '/product',
  PRODUCT_DETAIL = '/product/:id',
  MAINTENACE = '/maintenance',
  NOTIFACATION = '/notification',
  PROFILE = '/profile',
  DETAIL_INSTALL_RECORD = '/common/DetailInstallRecord',
  MAINTENACE_CREATE_REQUEST = '/maintenance/CreateOrSolution',
  MAINTENACE_DETAIL = '/maintenance/DetailMaintenance',
}

export enum ESTORAGE {
  TOKEN = 'TOKEN',
  USER = 'USER',
}

export enum EROLE {
  SUPER_ADMIN = 'SUPER_ADMIN',
  STAFF = 'STAFF',
  ADMIN = 'ADMIN',
  PRINCIPAL = 'PRINCIPAL',
}

export enum ESTATUS {
  PENDING = 'e512b0b1-5960-48b1-8266-0d5e6cb9d2d4',
  INPROGRESS = '48763c34-6c31-4243-a7a3-eb6c21ae8574',
  COMPLETE = '9d995935-0d8d-46f7-838e-49255208e874',
  COMPLETED = 'd19b7fcc-7bb4-4d25-9e11-804fa882f310',
  PEDING_INSTALL = '9dca126d-1c83-45bc-a00c-6139bd8a8f6e',
  INPROGRESS_INSTALL = 'ea340138-fb2e-42d3-a312-6ce97a6d766a',
  DELETED = '6b06e733-c205-4c89-b5b3-c3bb9131575a',
}

export enum EMAINTENANCE {
  BD = '8b746035-46bf-428f-b4db-b84e9b375b5f',
  SC = 'd1e6d70f-bd4a-4acb-99bc-8801dab712cf',
}
