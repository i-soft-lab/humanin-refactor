import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Icon} from '@rneui/base';
import {PostSSIDRequestBody} from '../../types/common';

type WifiInfoInputProps = {
  ssid: string;
  isLoading: boolean;
  onCancel: () => void;
  onSubmit: (body: PostSSIDRequestBody) => void;
};

const WifiInfoInput: React.FC<WifiInfoInputProps> = ({
  ssid,
  isLoading,
  onCancel,
  onSubmit,
}) => {
  const [isNotValid, setIsNotValid] = useState(false);
  const [body, setBody] = useState({
    ssid: ssid,
    passwd: '',
    topic: '',
  });

  const isNotValidForm = () => {
    return !body.passwd || !body.topic;
  };

  const handleFormChange = (value: string, key: string) => {
    setBody(prev => ({...prev, [key]: value}));
  };

  const handleSubmitButtonPress = () => {
    if (isNotValidForm()) {
      setIsNotValid(true);
      return;
    }

    onSubmit(body);
  };

  return (
    <View className="px-6">
      <View className="flex flex-row gap-4 items-center mb-8">
        <TouchableOpacity onPress={onCancel}>
          <Icon name="arrow-back-ios-new" type="material" />
        </TouchableOpacity>
        <Text className="font-pnormal text-xl text-black">{ssid}</Text>
      </View>
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
        placeholder="password"
        placeholderTextColor="#bbb"
        onChangeText={e => handleFormChange(e, 'passwd')}
        value={body.passwd}
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
        value={body.topic}
      />
      {isNotValid && (
        <Text className="mb-2 font-plight text-xs text-red-500">
          올바른 정보를 입력하세요
        </Text>
      )}
      <TouchableHighlight
        className="bg-blue-950 py-2.5 rounded w-20 h-20 self-end"
        onPress={handleSubmitButtonPress}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text className="text-white text-center font-psemibold">전송</Text>
        )}
      </TouchableHighlight>
    </View>
  );
};

export default WifiInfoInput;
