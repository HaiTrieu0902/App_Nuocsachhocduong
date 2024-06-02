import { COLOR_SYSTEM } from '@/constants/Colors';
import React, { memo } from 'react';
import { Image, ImageSourcePropType, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ThemedText } from './ThemedText';

export interface AppButtonProps {
  text?: string;
  icon?: ImageSourcePropType;
  svgIcon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onPress?: () => void;
  disabled?: boolean;
  backgroundColor?: string;
  colors?: (string | number)[];
  opacity?: number;
  style?: StyleProp<ViewStyle> | ViewStyle;
  className?: string | any;
  classNameTypeImage?: string | any;
  type?: 'primary' | 'infomation' | 'error';
}

const ThemedButton = ({
  backgroundColor = COLOR_SYSTEM.primary,
  colors,
  disabled,
  icon,
  svgIcon,
  iconPosition = 'left',
  onPress,
  opacity = 1,
  className,
  classNameTypeImage,
  text,
  style,
  type,
  ...restProps
}: AppButtonProps) => {
  const iconElement =
    svgIcon ?? (icon && <Image source={icon as ImageSourcePropType} className={classNameTypeImage} />);

  return (
    <TouchableOpacity
      {...restProps}
      disabled={disabled}
      style={[style, { opacity: disabled ? 0.5 : 1 }]}
      activeOpacity={opacity}
      onPress={onPress}
    >
      <View className={className}>
        {iconPosition === 'left' && iconElement}
        <ThemedText>{text}</ThemedText>
        {iconPosition === 'right' && iconElement}
      </View>
    </TouchableOpacity>
  );
};

export default memo(ThemedButton);
