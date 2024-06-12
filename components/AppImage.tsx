import React, { useCallback, useEffect, useState } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { COLOR_SYSTEM } from '@/constants/Colors';
import { s, vs } from '@/utils/helper';
type Props = {
  uri?: string | number;
  notAvatar?: boolean;
  lightColor?: string;
  size?: 'large' | 'small' | 'medium' | 'normal' | 'background';
  darkColor?: string;
  className?: string | any;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
};
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const AppImage = ({ uri, notAvatar, className, style, size = 'medium', borderRadius = 0 }: Props) => {
  const opacity = React.useRef(new Animated.Value(0)).current;

  const styleImage = React.useMemo(() => {
    let styleSize = {} as any;
    switch (size) {
      case 'background':
        styleSize = {
          height: 250,
          width: '100%',
        };
        break;
      case 'large':
        styleSize = {
          height: 120,
          width: 120,
          borderRadius: 120,
        };
        break;
      case 'medium':
        styleSize = {
          height: 96,
          width: 96,
          borderRadius: 96,
        };
        break;
      case 'normal':
        styleSize = {
          height: 72,
          width: 72,
          borderRadius: 72,
        };
        break;
      case 'small':
        styleSize = {
          height: 64,
          width: 64,
          borderRadius: 64,
        };
        break;
      default:
        styleSize = {
          height: 64,
          width: 64,
          borderRadius: 64,
          backgroundColor: COLOR_SYSTEM.overlay,
        };
        break;
    }
    styleSize = {
      ...styleSize,
      borderRadius: s(borderRadius ?? styleSize.borderRadius ?? 0),
    };
    return styleSize;
  }, [borderRadius, size]);

  const src = React.useMemo(() => {
    if (!uri) {
      console.log('vao urrri');
      return notAvatar ? require('@/assets/images/imageDefault.png') : require('@/assets/images/imageDefault.png');
    }
    if (typeof uri === 'string') {
      console.log('ddaay');
      return { uri };
    }
    return;
  }, [uri]);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View style={{ opacity }}>
      <Image
        style={[styleImage, style as never]}
        source={src}
        className={className}
        contentFit="cover"
        transition={1000}
        placeholder={{ blurhash }}
      />
    </Animated.View>
  );
};

export default React.memo(AppImage);
