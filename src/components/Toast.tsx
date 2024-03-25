import Toast from 'react-native-toast-message';
import hide = Toast.hide;

export const showErrorToast = (
  message: string | undefined,
  description: string | undefined = undefined,
  autoHide = true,
) => {
  Toast.show({
    type: 'error',
    text1: message,
    text2: description,
    autoHide: autoHide,
    position: 'bottom',
    topOffset: 200,
    onPress: () => {
      hide();
    },
  });
};

export const showSuccessToast = (
  message: string | undefined,
  description: string | undefined = undefined,
  autoHide = true,
) => {
  Toast.show({
    type: 'success',
    text1: message,
    text2: description,
    autoHide: autoHide,
    position: 'bottom',
    topOffset: 200,
    onPress: () => {
      hide();
    },
  });
};

export const showInfoToast = (
  message: string | undefined,
  description: string | undefined = undefined,
  autoHide = true,
) => {
  Toast.show({
    type: 'info',
    text1: message,
    text2: description,
    autoHide: autoHide,
    position: 'bottom',
    topOffset: 200,
    onPress: () => {
      hide();
    },
  });
};
