import { BASE_URL } from '@/constants/urls';
import { Dimensions, Platform } from 'react-native';

export const isIphoneWithNotch = (): boolean => {
  const dimensions = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (dimensions.height === 780 ||
      dimensions.width === 780 ||
      dimensions.height === 812 ||
      dimensions.width === 812 ||
      dimensions.height === 844 ||
      dimensions.width === 844 ||
      dimensions.height === 896 ||
      dimensions.width === 896 ||
      dimensions.height === 926 ||
      dimensions.width === 926 ||
      // iphone 13 mini, 12 mini
      dimensions.height === 780 ||
      dimensions.width === 780 ||
      // iphone 15, 15pro, 14 pro
      dimensions.height === 852 ||
      dimensions.width === 852 ||
      // iphone 15 plus, 15pro max, 14 pro max,
      dimensions.height === 932 ||
      dimensions.width === 932)
  );
};

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

// Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

export const scale = (size: number | undefined) => (shortDimension / guidelineBaseWidth) * Number(size);
export const verticalScale = (size: number | undefined) => (longDimension / guidelineBaseHeight) * Number(size);
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size: number, factor = 0.5) => size + (verticalScale(size) - size) * factor;

export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;
export const mvs = moderateVerticalScale;

export const updateImageUrls = (content: string) => {
  return content.replace(/<img [^>]*src="([^"]+)"[^>]*>/g, (match, p1) => {
    const newUrl = `${BASE_URL}${p1}`;
    return match.replace(p1, newUrl);
  });
};
