import { useToast } from 'react-native-toast-notifications';
import { ViewStyle } from 'react-native';

type PlacementType = 'top' | 'bottom' | 'center';

const useToastNotifications = () => {
  const toast = useToast();

  const useNotifications = (message: string, type: string, placement: PlacementType) => {
    const toastStyle: ViewStyle = {
      minHeight: 50,
      height: 'auto',
      width: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
    if (placement === 'top') {
      toastStyle.top = 40;
    } else if (placement === 'bottom') {
      toastStyle.bottom = 10;
    }
    toast.show(message, {
      type: type,
      placement: placement,
      duration: 2500,
      // style: toastStyle,
      textStyle: {
        textAlign: 'center',
      },
    });
  };
  return useNotifications;
};
export default useToastNotifications;
