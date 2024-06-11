import { Dimensions, ImageStyle, Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ms, s, scale, vs } from './helper';

const { width, height } = Dimensions.get('window');
export const screenWidth = width < height ? width : height;
export const screenHeight = width > height ? width : height;

export class Responsive {
  public static STATUSBAR_DEFAULT_HEIGHT = 20;

  public static STATUSBAR_X_HEIGHT = 44;

  public static STATUSBAR_IP12_HEIGHT = 47;

  public static STATUSBAR_IP12MAX_HEIGHT = 47;

  public static PADDING_SIZE = 24;

  public static WIDTH_SCREEN_WITHOUT_PADDING = screenWidth - this.PADDING_SIZE * 2;

  public static BUTTON_HEIGHT = 56;

  public static HEADER_COMPONENT_HEIGHT = 40;

  public static BOTTOM_TAB_HEIGHT = 56;

  public static X_WIDTH = 375;
  public static X_HEIGHT = 812;

  public static XSMAX_WIDTH = 414;
  public static XSMAX_HEIGHT = 896;

  public static IP12_WIDTH = 390;
  public static IP12_HEIGHT = 844;

  public static IP12MAX_WIDTH = 428;
  public static IP12MAX_HEIGHT = 926;

  public static IP14PRO_WIDTH = 393;
  public static IP14PRO_HEIGHT = 852;

  public static IP14MAX_WIDTH = 430;
  public static IP14MAX_HEIGHT = 932;

  public static isXSeries =
    screenHeight === this.X_HEIGHT ||
    screenWidth === this.X_WIDTH ||
    screenHeight === this.XSMAX_HEIGHT ||
    screenWidth === this.XSMAX_WIDTH;
  public static is11Series = this.isXSeries;
  public static is12Series =
    screenHeight === this.IP12MAX_HEIGHT ||
    screenWidth === this.IP12MAX_WIDTH ||
    screenHeight === this.IP12_HEIGHT ||
    screenWidth === this.IP12_WIDTH;
  public static is13Series = this.is12Series;
  public static is14Series =
    screenHeight === this.IP14PRO_HEIGHT ||
    screenWidth === this.IP14PRO_WIDTH ||
    screenHeight === this.IP14MAX_HEIGHT ||
    screenWidth === this.IP14MAX_WIDTH;

  public static isNotchIphone(): boolean {
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTV &&
      (Responsive.is14Series ||
        Responsive.is13Series ||
        Responsive.is12Series ||
        Responsive.is11Series ||
        Responsive.isXSeries)
    );
  }

  public static ifNotchIphone(iphoneXStyle: any, regularStyle: any): any {
    if (this.isNotchIphone()) {
      return iphoneXStyle;
    }
    return regularStyle;
  }

  public static STATUSBAR_HEIGHT = Responsive.ifNotchIphone(
    Responsive.STATUSBAR_X_HEIGHT,
    Responsive.STATUSBAR_DEFAULT_HEIGHT,
  );
  public static MESSAGE_MARGIN_TOP = Responsive.STATUSBAR_HEIGHT + 10;
}

type NamedStyles<T> = {
  [P in keyof T]: { skipResponsive?: boolean } | ViewStyle | TextStyle | ImageStyle;
};
export const ResponsiveStyleSheet = {
  ...StyleSheet,
  create: <T extends NamedStyles<T> | NamedStyles<any>>(styles: T | NamedStyles<T>, skipResponsive?: boolean): T =>
    StyleSheet.create(
      objectMap(styles, (value: any) => {
        if (skipResponsive || value.skipResponsive) {
          delete value.skipResponsive;
          return value;
        } else {
          delete value.skipResponsive;
          return checkForResponsive(value);
        }
      }),
    ) as T,
};

const objectMap = (object: any, mapFn: Function) => {
  return Object.keys(object).reduce((result: any, key) => {
    result[key] = mapFn(object[key]);
    return result;
  }, {});
};

const checkForResponsive = (object: any) => {
  const heightProperties = [
    'height',
    'paddingTop',
    'paddingBottom',
    'marginTop',
    'marginBottom',
    'paddingVertical',
    'marginVertical',
    'top',
    'bottom',
    'minHeight',
    'maxHeight',
    'borderTopWidth',
    'borderBottomWidth',
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
    'gap',
  ];
  const widthProperties = [
    'width',
    'paddingLeft',
    'paddingRight',
    'marginLeft',
    'marginRight',
    'paddingHorizontal',
    'marginHorizontal',
    'left',
    'right',
    'minWidth',
    'maxWidth',
    'borderLeftWidth',
    'borderRightWidth',
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
    'gap',
  ];
  const fontProperties = ['fontSize', 'lineHeight'];
  return Object.keys(object).reduce((result: any, key) => {
    if (typeof object[key] === 'number') {
      if (
        key.includes('flex') ||
        key.includes('opacity') ||
        key.includes('elevation') ||
        key.includes('shadowOpacity') ||
        key.includes('aspectRatio') ||
        key.includes('zIndex')
      ) {
        result[key] = object[key];
      } else if (heightProperties.includes(key)) {
        result[key] = vs(object[key]);
      } else if (widthProperties.includes(key)) {
        result[key] = s(object[key]);
      } else if (fontProperties.includes(key)) {
        result[key] = ms(object[key]);
      } else {
        result[key] = scale(object[key]);
      }
    } else {
      result[key] = object[key];
    }
    return { ...result };
  }, {});
};
