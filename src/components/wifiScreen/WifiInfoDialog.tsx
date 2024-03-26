import {useState} from 'react';
import {Dialog} from '@rneui/themed';
import {Text, TextInput, TouchableHighlight} from 'react-native';

type WifiInfoDialogProps = {
  visible: boolean;
  ssid?: string;
  closeDialog: () => void;
  onClose: (form: FormData) => void;
};

const WifiInfoDialog: React.FC<WifiInfoDialogProps> = ({
  visible,
  ssid,
  closeDialog,
  onClose,
}) => {
  const [isNotValid, setIsNotValid] = useState(false);
  const [form, setForm] = useState({
    ssid: ssid,
    passwd: '',
    topic: '',
  });

  const getFormData = () => {
    const formData = new FormData();

    formData.append('ssid', form.ssid);
    formData.append('passwd', form.passwd);
    formData.append('topic', form.topic);

    return formData;
  };

  const isNotValidForm = () => {
    return !form.passwd || !form.topic;
  };

  const handleFormChange = (value: string, key: string) => {
    setForm(prev => ({...prev, [key]: value}));
  };

  const handleSubmitButtonPress = () => {
    if (isNotValidForm()) {
      setIsNotValid(true);
      return;
    }

    const formData = getFormData();
    closeDialog();
    onClose(formData);
  };

  return (
    <Dialog isVisible={visible} onBackdropPress={closeDialog}>
      <Text className="mb-4 font-psemibold text-gray-800">
        2. 연결에 필요한 정보를 입력하세요
      </Text>
      <Text
        className={`mb-1 font-pnormal text-sm ${
          isNotValid ? 'text-red-400' : ''
        }`}>
        Wifi Password
      </Text>
      <TextInput
        className={`border rounded px-2 mb-2 font-pnormal ${
          isNotValid ? 'border-red-400' : 'border-gray-300'
        }`}
        onChangeText={e => handleFormChange(e, 'passwd')}
        value={form.passwd}
      />
      <Text
        className={`mb-1 font-pnormal text-sm ${
          isNotValid ? 'text-red-400' : ''
        }`}>
        Topic
      </Text>
      <TextInput
        className={`border rounded px-2 mb-4 font-pnormal ${
          isNotValid ? 'border-red-400' : 'border-gray-300'
        }`}
        placeholderTextColor="#bbb"
        placeholder="gbrain/{bluetooth name}"
        onChangeText={e => handleFormChange(e, 'topic')}
        value={form.topic}
      />
      {isNotValid && (
        <Text className="mb-2 font-plight text-xs text-right text-red-500">
          올바른 정보를 입력하세요
        </Text>
      )}
      <TouchableHighlight
        className="bg-blue-950 py-2.5 rounded"
        onPress={handleSubmitButtonPress}>
        <Text className="text-white text-center font-psemibold">전송</Text>
      </TouchableHighlight>
    </Dialog>
  );
};

export default WifiInfoDialog;
