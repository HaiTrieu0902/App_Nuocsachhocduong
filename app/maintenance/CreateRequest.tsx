import { AppImage, DropdownOption, SafeAreaViewUI, ThemedButton, ThemedInput } from '@/components';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import NavigationGoBack from '@/components/navigation/NavigationGoBack';
import { DEFAULT_PAGE_NUMBER, DEFAULT_SIZE_PAGE_MAX } from '@/constants';
import { COLOR_SYSTEM } from '@/constants/Colors';
import { ESTATUS } from '@/constants/enum';
import useLoading from '@/hooks/useLoading';
import { getAuthUser } from '@/hooks/useStorage';
import useToastNotifications from '@/hooks/useToastNotifications';
import { IInstallRecord } from '@/models/install.model';
import { UploadImagesApi } from '@/services/api/common.api';
import { getListInstallRecordAPI } from '@/services/api/install.api';
import { createMaintenanceAPI } from '@/services/api/maintenance.api';
import { handleGetCategoryMaintenance, handleGetCategoryMaintenanceId } from '@/utils/helper';
import { ValidationError } from '@/utils/validation';
import { AntDesign } from '@expo/vector-icons';
import { format } from 'date-fns';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FlatList, Keyboard, TouchableOpacity, View } from 'react-native';

const CreateRequestScreen = () => {
  const showToast = useToastNotifications();
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
            categoryMaintenanceId: handleGetCategoryMaintenanceId(listInstallRecord, installRecord as string),
            accountId: authUser?.id,
            installRecordId: installRecord,
            schoolId: authUser?.schoolIds[0],
            statusId: ESTATUS.PENDING,
            title: values?.title,
            reason: values?.reason,
            images_request: urls || [],
          };
          await createMaintenanceAPI(params as never);
          showToast(`Tạo sự cố thành công`, 'success', 'top');
          router.back();
        } catch (e: any) {
          console.log('e', e);
          showToast(`${e?.message}`, 'danger', 'top');
        }
      });
    },
    [listInstallRecord, installRecord],
  );

  const handleSelected = (value: string | number) => {
    setInstallRecord(value as string);
  };

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

  const convertListInstallRecord = listInstallRecord?.map((item) => ({
    value: item?.id,
    label: `${item?.product?.name}, Lắp đặt lúc: ${
      item?.timeInstall ? format(new Date(item?.timeInstall), 'dd/MM/yyyy HH:mm:ss') : 'N/A'
    } `,
  }));

  return (
    <SafeAreaViewUI className="px-6 !w-full">
      <NavigationGoBack title="Tạo yêu cầu" titleAlight />
      <ThemedView className="mt-2">
        <ThemedText className={'mb-2 text-lg text-text_color'}>Sản phẩm đã lắp đặt</ThemedText>
        <DropdownOption
          data={convertListInstallRecord}
          onSelected={handleSelected}
          placeholder="Chọn sản phẩm đã lắp đặt"
          valueItem={installRecord}
        />
      </ThemedView>

      <ThemedView className="mt-4">
        <ThemedInput
          value={`${handleGetCategoryMaintenance(listInstallRecord, installRecord as string)}`}
          pointerEvents="none"
          label="Loại sự cố"
          placeholder="Loại sự cố"
          control={control}
          name="categoryMaintenanceId"
          maxLength={255}
          className={'relative mt-3 '}
          classNameStyleInput={`relative border border-text_color_regular bg-white rounded-md pl-4 pr-4 py-4 !bg-text_color_light`}
          classNameStyleLabel={'text-lg text-text_color'}
        />
      </ThemedView>

      <ThemedView className="mt-4">
        <ThemedInput
          label="Tiêu đề"
          placeholder="Nhập tiêu đề tóm tắt nội dung"
          control={control}
          name="title"
          required
          maxLength={255}
          className={'relative mt-3 '}
          classNameStyleInput={`relative border border-text_color_regular bg-white rounded-md pl-4 pr-4 py-4`}
          classNameStyleLabel={'text-lg text-text_color'}
        />
      </ThemedView>

      <ThemedView className="mt-4">
        <ThemedInput
          label="Hiên trạng"
          autoCapitalize={'none'}
          placeholder="Nhập hiện trạng của sự cố"
          control={control}
          name="reason"
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
        <ThemedText className={'mb-2 text-lg text-text_color'}>Ảnh đính kèm</ThemedText>
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
          text="Tạo yêu cầu"
          iconPosition="right"
          className={`flex flex-row justify-center items-center rounded-md py-5 gap-2 bg-primary `}
          onPress={handleSubmit(handleCreateRequest)}
        />
      </ThemedView>
    </SafeAreaViewUI>
  );
};

export default CreateRequestScreen;
