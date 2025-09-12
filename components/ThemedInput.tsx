import React, { forwardRef, memo, useCallback, useState } from 'react';
import { Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form';
import {
  Image,
  Platform,
  Pressable,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { COLOR_SYSTEM } from '@/constants/Colors';

export interface AppInputProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
  control: Control<any>;
  name: string;
  label?: string;
  rules?: RegisterOptions<FieldValues, string>;
  required?: boolean;
  isPassword?: boolean;
  isMultiline?: boolean;
  textStyles?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
  subLabel?: string;
  link?: string;
  iconDisplay?: 'right' | 'left';
  placeholder?: string;
  subBtn?: React.ReactNode;
  className?: string | any;
  classNameStyleInput?: string | any;
  classNameStyleLabel?: string | any;
  notCheck?: boolean;
}

const ThemedInput = forwardRef(
  (
    {
      style,
      label,
      name,
      control,
      required,
      rules,
      isPassword,
      isMultiline,
      icon,
      link,
      subLabel,
      placeholder,
      subBtn,
      className,
      classNameStyleInput,
      classNameStyleLabel,
      iconDisplay = 'left',
      notCheck = false,
      ...restProps
    }: AppInputProps,
    ref: React.LegacyRef<TextInput>,
  ) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);
    // const handleClickToLink = useCallback(() => {
    //   link && navigate(link);
    // }, [link]);

    return (
      <View>
        {label && (
          <View>
            <ThemedText className={classNameStyleLabel}>{label}</ThemedText>
            {!!(subLabel && link) && (
              <TouchableOpacity
              //   onPress={handleClickToLink}
              >
                <Text>{subLabel}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        <Controller
          control={control}
          rules={{ ...rules, required: required ? `${label} không được để trống` : false }}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <>
              <View className={`${className}`}>
                <TextInput
                  className={classNameStyleInput}
                  placeholderTextColor={'#767E94'}
                  onBlur={() => {
                    onBlur();
                    setIsFocus(false);
                  }}
                  placeholder={placeholder}
                  multiline={isMultiline}
                  onChangeText={onChange}
                  autoCapitalize={'none'}
                  onEndEditing={(e) => {
                    const { text } = e.nativeEvent;
                    onChange(text?.trim() ?? '');
                  }}
                  // onContentSizeChange={e => {
                  //   setInputHeight(e.nativeEvent.contentSize.height);
                  // }}
                  onFocus={() => setIsFocus(true)}
                  value={value}
                  ref={ref}
                  secureTextEntry={isPassword}
                  {...restProps}
                  //   style={[Layout.fill, textStyles, restProps.textStyles]}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: iconDisplay === 'right' ? undefined : 10,
                    right: iconDisplay === 'right' ? 10 : undefined,
                  }}
                >
                  {!!icon && icon}
                </TouchableOpacity>
              </View>

              {Boolean(error?.message || subBtn) && !notCheck && (
                <View>
                  {error?.message && (
                    <ThemedText style={{ color: COLOR_SYSTEM.errorRegular, marginTop: 6 }}>{error.message}</ThemedText>
                  )}
                  {subBtn}
                </View>
              )}
            </>
          )}
          name={name}
        />
      </View>
    );
  },
);

export default memo(ThemedInput);
