import Toast from 'react-native-toast-message';

type Props = {
  type: string;
  message: string | undefined;
  description: string | undefined;
  autoHide: boolean;
};
const showToast = ({
  type = 'error',
  message,
  description,
  autoHide = true,
}: Props) => {
  Toast.show({
    type: type,
    text1: message,
    text2: description,
    autoHide: autoHide,
    position: 'top',
    topOffset: 100,
  });
};

export default showToast;
