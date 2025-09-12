import { ModalFilter, SafeAreaViewUI } from '@/components';
import NavigationGoBack from '@/components/navigation/NavigationGoBack';
import useLoading from '@/hooks/useLoading';
import useToastNotifications from '@/hooks/useToastNotifications';
import { IGetListParamInstall } from '@/models/install.model';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Keyboard, TouchableOpacity, View } from 'react-native';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes';
import { LineChart } from 'react-native-chart-kit';
import { COLOR_SYSTEM } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import useModal from '@/hooks/useModal';
import { AntDesign, Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { getAuthUser } from '@/hooks/useStorage';
import { IRevenueList } from '@/models/revenue.model';
import { getListRevenueInvestSchoolAPI } from '@/services/api/revenue';

const ListMaintenance = () => {
  const isFocused = useIsFocused();
  const { isLoading, withLoading } = useLoading();
  const showToast = useToastNotifications();
  const [authUser, setAuthUser] = useState<any>(null);
  const [currentYear, setCurrentYear] = useState<any>(new Date().getFullYear());
  const [revenueSchool, setRevenueSchool] = useState<IRevenueList>({} as IRevenueList);
  const [activeModalFilter, actionModalFilter] = useModal();
  // const [chartData, setChartData] = useState({
  //   labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
  //   datasets: [
  //     {
  //       data: [],
  //       color: (opacity = 1) => COLOR_SYSTEM.informationRegular,
  //       strokeWidth: 1.5,
  //     },
  //   ],
  //   legend: ['Thiết bị đã lắp đặt'],
  // });

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
    decimalPlaces: 0,
  };

  const handleGetListRevenue = async (params: { schoolId: string; year: string | number; type: string }) => {
    await withLoading(async () => {
      try {
        const res = await getListRevenueInvestSchoolAPI({ ...params });
        setRevenueSchool(res?.data);
        // const updatedData = res?.data?.dataChartInstall?.map((item: any) => Number(item?.total) || 0) || [];
        // setChartData((prevData) => ({
        //   ...prevData,
        //   datasets: [
        //     {
        //       ...prevData.datasets[0],
        //       data: updatedData,
        //     },
        //   ],
        // }));
      } catch (error: any) {
        showToast(`${error?.message}`, 'danger', 'top');
      }
    });
  };

  const handleChangeFilter = (value: string | number) => {
    actionModalFilter.closeModal();
    setCurrentYear(value);
  };

  const DATA_NUMBER_REVENUE = [
    {
      value: 2024,
      name: 2024,
    },
    {
      value: 2024 - 1,
      name: 2024 - 1,
    },
    {
      value: 2024 - 2,
      name: 2024 - 2,
    },
    {
      value: 2024 - 3,
      name: 2024 - 3,
    },
  ];

  useEffect(() => {
    const fetchTokenAndUser = async () => {
      const token = await getAuthUser();
      setAuthUser(token);
    };
    fetchTokenAndUser();
  }, []);

  useEffect(() => {
    if (authUser?.id && authUser?.school?.[0]?.id) {
      handleGetListRevenue({ year: currentYear, schoolId: authUser?.school[0]?.id, type: 'product' });
    }
  }, [authUser, currentYear]);

  const data = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    datasets: [
      {
        data: revenueSchool?.dataChartInstall?.map((item) => item?.total) || [0],
        color: (opacity = 1) => COLOR_SYSTEM.informationRegular,
        strokeWidth: 1.5,
      },
    ],
    legend: ['Thiết bị đã lắp đặt'],
  };

  return (
    <SafeAreaViewUI className="px-6 !w-full">
      <NavigationGoBack title="Thống kê - báo cáo" titleAlight />
      <ThemedView
        className={
          'mt-4 p-5 border border-infomation_light border-dashed rounded-lg !bg-[#FDEBD3] flex flex-row items-center justify-between'
        }
      >
        <View className="w-[82%]">
          <ThemedText className={'font-semibold text-lg mb-1 '}>{authUser?.school[0]?.name || ''}</ThemedText>
          <ThemedText>
            Địa chỉ:{' '}
            <ThemedText className={'font-medium !text-text_color_regular'}>
              {authUser?.school[0]?.address || ''}
            </ThemedText>
          </ThemedText>
          <ThemedText>
            Phone:{' '}
            <ThemedText className={'font-medium !text-text_color_regular'}>
              {authUser?.school[0].phoneNumber || ''}
            </ThemedText>
          </ThemedText>
        </View>
        <View>
          <FontAwesome5 name="school" size={24} color={COLOR_SYSTEM.primary} />
        </View>
      </ThemedView>

      <ThemedView className="mt-4">
        <TouchableOpacity onPress={actionModalFilter.toggleModal}>
          <ThemedView className={'flex flex-row gap-1 items-center mb-4'}>
            <ThemedText className={'font-normal text-lg '}>
              Năm <ThemedText className={'!text-primary font-semibold text-lg'}>{currentYear}</ThemedText>
            </ThemedText>
            <AntDesign name="caretdown" size={16} color={COLOR_SYSTEM.primary} />
          </ThemedView>
        </TouchableOpacity>

        <LineChart
          style={{ borderRadius: 12 }}
          data={data}
          width={screenWidth - 40}
          height={260}
          chartConfig={chartConfig}
          fromZero={true}
        />
      </ThemedView>

      <ThemedView
        className={
          'mt-8 p-5 border border-primary_light border-dashed rounded-lg !bg-[#CFE9E9] flex flex-row items-center justify-between'
        }
      >
        <View>
          <ThemedText className={'font-semibold text-lg mb-1'}>{revenueSchool?.quantity}</ThemedText>
          <ThemedText>Thiết bị hoàn thành lắp đặt</ThemedText>
        </View>
        <View>
          <Entypo name="install" size={24} color={COLOR_SYSTEM.primary} />
        </View>
      </ThemedView>
      <ThemedView
        className={
          'mt-4 p-5 border border-infomation_light border-dashed rounded-lg !bg-[#DFE4FC] flex flex-row items-center justify-between'
        }
      >
        <View>
          <ThemedText className={'font-semibold text-lg mb-1'}>
            {Number(Number(revenueSchool?.totalMaitenance) + Number(revenueSchool?.totalAmount)).toLocaleString()} VNĐ
          </ThemedText>
          <ThemedText>Vốn đầu tư đã bỏ ra</ThemedText>
        </View>
        <View>
          <MaterialIcons name="currency-exchange" size={24} color={COLOR_SYSTEM.primary} />
        </View>
      </ThemedView>

      <ModalFilter
        mode="filter"
        titleHeader="Chọn năm thống kê - báo cáo"
        data={DATA_NUMBER_REVENUE}
        isVisible={activeModalFilter.isOpen}
        closeModal={actionModalFilter.closeModal}
        onSelected={handleChangeFilter}
      />
    </SafeAreaViewUI>
  );
};

export default ListMaintenance;
