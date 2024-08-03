import { TouchableOpacity, View } from 'react-native';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Faq } from '@/components/common/faq';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai/index';
import { connectedWifiSSIDAtom } from '@/lib/atoms/receiver-atom';
import { usePostSsidMutation } from '@/lib/api/receiver/mutations';
import { Controller, useForm } from 'react-hook-form';
import { TPostSsidReqDto } from '@/lib/api/receiver/client';
import { SubmitHandler } from 'react-hook-form/dist/types/form';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

const topicRegex = new RegExp('G-BRAIN_\\w+\\d+');

const WifiPasswordFormStep = () => {
  const [connectedWifiSSID] = useAtom(connectedWifiSSIDAtom);

  const [showPassword, setShowPassword] = useState(false);

  const defaultTopic = topicRegex.test(connectedWifiSSID ?? '')
    ? connectedWifiSSID?.split('_').at(-1)
    : undefined;

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<TPostSsidReqDto>({
    defaultValues: {
      ssid: connectedWifiSSID ?? undefined,
      password: undefined,
      topic: defaultTopic,
    },
  });

  const { mutate } = usePostSsidMutation({
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: '와이파이 설정 실패',
        text2: error.message,
      });
    },
  });

  const onSubmit: SubmitHandler<TPostSsidReqDto> = (data) => {
    mutate(data);
  };

  return (
    <View className="flex gap-y-16">
      <View className="bg-slate-100 rounded-lg p-4">
        <View className="mb-4">
          <Text className="mb-0.5 ps-1 text-sm font-semibold">
            WIFI Password
          </Text>
          <View className="relative">
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  secureTextEntry={!showPassword}
                  textContentType="password"
                  className="focus:border focus:border-blue-500"
                  placeholder="wifi 비밀번호를 입력해주세요."
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-1 top-0 h-full justify-center pr-2"
            >
              <Ionicons
                name={showPassword ? 'eye' : 'eye-off'}
                size={20}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text className="mb-0.5 ps-1 text-sm font-semibold">Serial No.</Text>
          <Controller
            control={control}
            name="topic"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                className="focus:border focus:border-blue-500"
                placeholder="sender의 시리얼번호를 입력해주세요."
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>
        <Button
          className="mt-8 w-20 self-end"
          size="sm"
          variant="secondary"
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="font-semibold">전송</Text>
        </Button>
      </View>
      <Faq />
    </View>
  );
};

export default WifiPasswordFormStep;
