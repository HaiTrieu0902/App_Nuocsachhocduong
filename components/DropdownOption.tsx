import { COLOR_SYSTEM } from '@/constants/Colors';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

type DropdownOptionProps = {
  style?: object;
  onSelected: (value: string | number) => void;
  data: any[];
  placeholder?: string;
  styleChildren?: object;
  valueItem?: any;
};

const DropdownOption = ({ style, onSelected, data, placeholder, styleChildren, valueItem }: DropdownOptionProps) => {
  const [value, setValue] = useState(valueItem);
  const [isFocus, setIsFocus] = useState(false);

  /* Handle changed filter*/
  const handleChangeValue = (newFilter: number | string) => {
    onSelected(newFilter);
  };

  const styles = StyleSheet.create({
    container: {
      ...style,
    },
    dropdown: {
      height: 46,
      borderColor: COLOR_SYSTEM.overlay,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8,
      ...styleChildren,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 14,
    },
    selectedTextStyle: {
      fontSize: 14,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

  useEffect(() => {
    setValue(valueItem);
  }, [valueItem]);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : '...'}
        searchPlaceholder="Tìm kiếm..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          handleChangeValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => <></>}
      />
    </View>
  );
};

export default DropdownOption;
