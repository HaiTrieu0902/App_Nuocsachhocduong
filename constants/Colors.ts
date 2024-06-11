/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#191f33',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const COLOR_SYSTEM = {
  // Primary colors
  primary: '#0E8449',
  primaryRegular: '#18DC7A',
  primaryLight: '#74EAAF',

  // Warning colors
  warning: '#977a40',
  warningRegular: '#fbcb6a',
  warningLight: '#fde0a6',

  // Information colors
  information: '#2a225e',
  informationRegular: '#0d6cf2',
  informationLight: '#89c7ff',

  // Error colors
  error: '#92291C',
  errorRegular: '#F4442F',
  errorLight: '#F77C6D',

  // Text colors
  textColor: '#191f33',
  textColorRegular: '#767e94',
  textColorLight: '#e9eaf0',

  // Basic colors
  black: '#000000',
  white: '#ffffff',

  // Background colors
  strokeBg: '#f5f5f5',
  modalBg: '#7f7f7f',

  // Other colors
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.5)',
};
