import Toast from 'react-native-toast-message';

export const showErrorToast = (
  message: string | undefined,
  description: string | undefined,
  autoHide = true,
) => {
  Toast.show({
    type: 'error',
    text1: message,
    text2: description,
    autoHide: autoHide,
    position: 'bottom',
    topOffset: 100,
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
    topOffset: 100,
  });
};

export const showInfoToast = (
  message: string | undefined,
  description: string | undefined,
  autoHide = true,
) => {
  Toast.show({
    type: 'info',
    text1: message,
    text2: description,
    autoHide: autoHide,
    position: 'bottom',
    topOffset: 100,
  });
};
