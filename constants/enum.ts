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
  MAINTENACE = 'maintenance',
  NOTIFACATION = 'notification',

  PROFILE = 'profile',
  PROFILE_INFOMATION = 'profile/InformationUser',
  PROFILE_CHANGE_PASS = 'profile/ChangePassWord',
  PROFILE_LIST_ORDER = 'profile/ListOrder',
  PROFILE_LIST_SCHOOL = 'profile/ListSchool',
  /** No found */
  NOTFOUND = '+not-found',
}

export enum EPUSH_ROUTER {
  HOME = '/home',
  PRODUCT = '/product',
  MAINTENACE = '/maintenance',
  NOTIFACATION = '/notification',
  PROFILE = '/profile',
}
