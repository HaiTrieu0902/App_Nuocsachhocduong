export enum EROUTER {
  /** AUTH */
  LOGIN = 'auth/login',
  VERIFYOTP = 'auth/verifyOTP',
  FORGOTPASSWORD = 'auth/forgotPassword',
  RESETPASSWORD = 'auth/resetPassword',

  /**  TABS*/
  TABS = '(tabs)',

  /** SCREEN  ================================*/
  HOME = 'home',
  PRODUCT = 'product',
  MAINTENACE = 'maintenance',
  NOTIFACATION = 'notification',
  PROFILE = 'profile',

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
