import { SafeAreaViewUI } from '@/components';
import NavigationGoBack from '@/components/navigation/NavigationGoBack';
import useLoading from '@/hooks/useLoading';
import useToastNotifications from '@/hooks/useToastNotifications';
import { IGetListParamInstall } from '@/models/install.model';
import { useIsFocused } from '@react-navigation/native';
import React, { useState } from 'react';
import { Keyboard, View } from 'react-native';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes';
import { LineChart } from 'react-native-chart-kit';
import { COLOR_SYSTEM } from '@/constants/Colors';

const ListMaintenance = () => {
  const isFocused = useIsFocused();
  const { isLoading, withLoading } = useLoading();
  const showToast = useToastNotifications();
  const keyExtractor = React.useCallback((_: string, index: number) => String(index), []);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const data = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 45, 28, 80, 99, 43],
        color: (opacity = 1) => COLOR_SYSTEM.informationRegular,
        strokeWidth: 1.5,
      },
    ],
    legend: ['Thiết bị đã lắp đặt'],
  };

  const chartConfig: ChartConfig = {
    barRadius: 10,
    backgroundGradientFrom: COLOR_SYSTEM.black,
    backgroundGradientFromOpacity: 0.9,
    backgroundGradientTo: COLOR_SYSTEM.overlay,
    backgroundGradientToOpacity: 0.8,
    labelColor: (opacity = 1) => COLOR_SYSTEM.primary,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 1,
    barPercentage: 1,
    useShadowColorFromDataset: false,
    propsForVerticalLabels: {
      rotation: 20,
      dx: 0,
    },
    propsForHorizontalLabels: {
      x: 40,
    },
  };

  const handleGetListProduct = async (values: IGetListParamInstall, isLoadMore = false) => {
    await withLoading(async () => {
      try {
      } catch (error: any) {
        showToast(`${error?.message}`, 'danger', 'top');
      }
    });
  };

  return (
    <SafeAreaViewUI className="px-6 !w-full">
      <NavigationGoBack title="Thống kê - báo cáo" titleAlight />
      <View className="mt-2">
        <LineChart
          style={{ borderRadius: 10 }}
          data={data}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
        />
      </View>
    </SafeAreaViewUI>
  );
};

export default ListMaintenance;
