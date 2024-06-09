import { ResponsiveStyleSheet } from '@/utils/responsive';
import React, { useCallback, useEffect, useState } from 'react';
import { Animated, Image, ViewStyle } from 'react-native';

type Props = {
  uri?: string | number;
  notAvatar?: boolean;
  lightColor?: string;
  darkColor?: string;
  className?: string | any;
};

const AppImage = ({ uri, notAvatar, className }: Props) => {
  const [error, setError] = useState<boolean>(false);
  const opacity = React.useRef(new Animated.Value(0)).current; // Initial opacity set to 0

  const src = React.useMemo(() => {
    if (error) {
      return require('@/assets/images/imageDefault.png');
    }
    if (!uri) {
      return notAvatar ? require('@/assets/images/imageDefault.png') : require('@/assets/images/imageDefault.png');
    }
    if (typeof uri === 'string') {
      return { uri };
    }
    return uri;
  }, [error, notAvatar, uri]);

  const handleError = useCallback(() => setError(true), []);

  console.log('uri', uri);
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View style={{ opacity }}>
      {/* Apply animated opacity */}
      <Image source={src} onError={handleError} className={className} />
    </Animated.View>
  );
};

export default React.memo(AppImage);
