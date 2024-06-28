import { AppImage, SafeAreaViewUI, ThemedButton, ThemedInput } from '@/components';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import NavigationGoBack from '@/components/navigation/NavigationGoBack';
import { DEFAULT_PAGE_NUMBER, DEFAULT_SIZE_PAGE_MAX } from '@/constants';
import { COLOR_SYSTEM } from '@/constants/Colors';
import { EMAINTENANCE, EPUSH_ROUTER, ESTATUS } from '@/constants/enum';
import useLoading from '@/hooks/useLoading';
import { getAuthUser } from '@/hooks/useStorage';
import useToastNotifications from '@/hooks/useToastNotifications';
import { IInstallRecord } from '@/models/install.model';
import { UploadImagesApi } from '@/services/api/common.api';
import { getListInstallRecordAPI } from '@/services/api/install.api';
import { updateMaitenanceAPI } from '@/services/api/maintenance.api';
import { ValidationError } from '@/utils/validation';
import { AntDesign } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FlatList, Keyboard, TouchableOpacity, View } from 'react-native';

const CreateSolutionScreen = () => {
  const showToast = useToastNotifications();
  const { id, title, category } = useLocalSearchParams();
  const { isLoading, withLoading } = useLoading();
  const flatListRef = useRef<FlatList>(null);
  const [images, setImages] = useState<any[]>([]);
  const [installRecord, setInstallRecord] = useState<string>();
  const [listInstallRecord, setListInstallRecord] = useState<IInstallRecord[]>([]);
  const [authUser, setAuthUser] = useState<any>(null);
  /** SET UP form  */
  const { control, handleSubmit, reset } = useForm<any>({
    mode: 'onBlur',
  });

  const handleCreateRequest = useCallback(
    async (values: any) => {
      await withLoading(async () => {
        try {
          Keyboard.dismiss();
          const resImages = await UploadImagesApi(images as never);
          const urls = resImages?.data?.map((item: any) => `common/images/${item?.filename}`);
          const params = {
            id: id,
            repairFees: Number(values?.repairFees) || 0,
            timeMaintenance: new Date(),
            images_response: urls,
            reasonRepair: values?.reasonRepair,
            solution: values?.solution,
            statusId: ESTATUS.COMPLETE,
          };
          await updateMaitenanceAPI(params as never);
          showToast(`Hoàn thành xử lý sự cố`, 'success', 'top');
          router.push(EPUSH_ROUTER.MAINTENACE);
        } catch (e: any) {
          console.log('e', e);
          showToast(`${e?.message}`, 'danger', 'top');
        }
      });
    },
    [listInstallRecord, installRecord],
  );

  const handleRemoveImage = useCallback((image: any) => {
    setImages((prev) => prev.filter((i) => i !== image));
  }, []);

  const handlePickImageUser = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      //allowsEditing: true,
      aspect: [4, 3],
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const newImages = await Promise.all(
        result.assets.map(async (asset) => {
          const fileInfo = await FileSystem.getInfoAsync(asset.uri);
          return {
            uri: fileInfo.uri,
            name: fileInfo.uri.split('/').pop(),
            type: asset.type,
          };
        }),
      );

      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const renderImage = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      if (item?.addMore) {
        return (
          <TouchableOpacity onPress={handlePickImageUser}>
            <ThemedView
              style={{ marginLeft: images?.length > 0 ? 10 : 0 }}
              className={
                '!w-[96px] !h-[96px]  flex items-center justify-center rounded-lg border border-dashed !border-text_color_regular'
              }
            >
              <AntDesign name="plus" className="" size={50} color={COLOR_SYSTEM.informationRegular} />
            </ThemedView>
          </TouchableOpacity>
        );
      }

      return (
        <TouchableOpacity style={{ position: 'relative' }}>
          <AppImage
            style={{
              borderWidth: 1,
              borderColor: COLOR_SYSTEM.textColorLight,
              marginLeft: index === 0 ? 0 : 10,
            }}
            size="medium"
            borderRadius={8}
            uri={item?.uri}
          />
          <View className={'absolute !right-2 top-2'}>
            <TouchableOpacity onPress={() => handleRemoveImage(item)}>
              <AntDesign name="closecircle" className="" size={20} color={COLOR_SYSTEM.errorLight} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    },
    [handleRemoveImage, handlePickImageUser],
  );

  useEffect(() => {
    const fechListInstallRecord = async () => {
      const res = await getListInstallRecordAPI({
        pageSize: DEFAULT_SIZE_PAGE_MAX,
        page: DEFAULT_PAGE_NUMBER,
        statusId: ESTATUS.COMPLETED,
      });
      setListInstallRecord(res?.data);
    };
    const fetchTokenAndUser = async () => {
      const token = await getAuthUser();
      setAuthUser(token);
    };
    fetchTokenAndUser();
    fechListInstallRecord();
  }, []);

  return (
    <SafeAreaViewUI className="px-6 !w-full">
      <NavigationGoBack title={`${title || 'Hoàn thành sự cố'}`} titleAlight />

      <ThemedView className="mt-4">
        <ThemedInput
          label="Nguyên nhân sự cố"
          autoCapitalize={'none'}
          placeholder="Nhập nguyên nhân của sự cố"
          control={control}
          name="reasonRepair"
          multiline={true}
          required
          rules={{
            maxLength: {
              value: 500,
              message: ValidationError.maxLength(500),
            },
          }}
          className={'relative mt-3 '}
          classNameStyleInput={`relative border border-text_color_regular bg-white rounded-md px-4 h-[120px]`}
          classNameStyleLabel={'text-lg text-text_color'}
        />
      </ThemedView>
      <ThemedView className="mt-4">
        <ThemedInput
          label="Phương án xử lý"
          autoCapitalize={'none'}
          placeholder="Nhập phương án xử lý"
          control={control}
          name="solution"
          multiline={true}
          required
          rules={{
            maxLength: {
              value: 500,
              message: ValidationError.maxLength(500),
            },
          }}
          className={'relative mt-3 '}
          classNameStyleInput={`relative border border-text_color_regular bg-white rounded-md px-4 h-[120px]`}
          classNameStyleLabel={'text-lg text-text_color'}
        />
      </ThemedView>

      {category === EMAINTENANCE.SC && (
        <ThemedView className="mt-4">
          <ThemedInput
            keyboardType="numbers-and-punctuation"
            label="Tông tiền sự cố"
            autoCapitalize={'none'}
            placeholder="Nhập số tiền sự cố"
            control={control}
            name="repairFees"
            required
            className={'relative mt-3 '}
            classNameStyleInput={`relative border border-text_color_regular bg-white rounded-md px-4 py-4`}
            classNameStyleLabel={'text-lg text-text_color'}
          />
        </ThemedView>
      )}

      <ThemedView className="mt-4">
        <ThemedText className={'mb-2 text-lg text-text_color'}>Ảnh xử lý</ThemedText>
        <FlatList
          showsHorizontalScrollIndicator={false}
          ref={flatListRef}
          data={images.length >= 12 ? images : [...images, { addMore: true }]}
          horizontal
          renderItem={renderImage}
          contentContainerStyle={{ paddingVertical: 0 }}
        />
      </ThemedView>

      <ThemedView className="mt-4">
        <ThemedButton
          disabled={isLoading}
          text="Hoàn thành sự cố"
          iconPosition="right"
          className={`flex flex-row justify-center items-center rounded-md py-5 gap-2 bg-infomation_regular `}
          onPress={handleSubmit(handleCreateRequest)}
        />
      </ThemedView>
    </SafeAreaViewUI>
  );
};

export default CreateSolutionScreen;
