import { COLOR_SYSTEM } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { AntDesign, Feather, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import React, { ReactNode, useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import '../global.css';
interface ModalFilterProps {
  isVisible: boolean;
  closeModal: () => void;
  onSelected: (value: string | number) => void;
  data: any[];
  titleHeader: string;
  children?: ReactNode;
  lightColor?: string;
  darkColor?: string;
  isRefresh?: boolean;
}

const ModalFilter: React.FC<ModalFilterProps> = ({
  isVisible,
  isRefresh,
  closeModal,
  titleHeader,
  children,
  data,
  lightColor,
  darkColor,
  onSelected,
}) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const [selectedFilter, setSelectedFilter] = useState(data[0]?.value);

  const handleChangeFilter = (newFilter: any) => {
    setSelectedFilter(newFilter);
    onSelected(newFilter);
  };

  useEffect(() => {
    if (isRefresh) {
      setSelectedFilter(data[0]?.value);
    }
  }, [isRefresh]);

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={closeModal}>
      <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} className="flex-1 relative w-full h-full !bg-overlay">
        <TouchableOpacity style={{ flex: 1 }} onPress={closeModal} className="w-full flex-1"></TouchableOpacity>
        <View style={{ borderRadius: 12 }} className="bg-white items-center shadow-md">
          <View style={{ padding: 16 }} className="!w-full ">
            <View className="flex flex-row justify-between w-full">
              <Text></Text>
              <Text className="font-medium text-lg">{titleHeader}</Text>
              <TouchableOpacity onPress={closeModal}>
                <AntDesign name="close" size={24} color={COLOR_SYSTEM.primary} />
              </TouchableOpacity>
            </View>
            {data?.map((item, index) => {
              return (
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}
                  onPress={() => handleChangeFilter(item?.value)}
                  key={index}
                  className=""
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: item.value === selectedFilter ? COLOR_SYSTEM.primary : color,
                      fontWeight: 400,
                    }}
                    className={`text-base font-normal ${item.value === selectedFilter ? 'text-primary' : ''}`}
                  >
                    {item.name}
                  </Text>
                  {item.value === selectedFilter ? (
                    <FontAwesome6 name="circle-dot" size={28} color={COLOR_SYSTEM.primary} />
                  ) : (
                    <Feather name="circle" size={28} color={color} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalFilter;
