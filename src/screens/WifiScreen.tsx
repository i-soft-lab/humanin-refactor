import {FlatList, Text, View} from 'react-native';
import useWifiList from '../hooks/useWifiList';
import ListItem from '../components/common/ListItem';
import React, {useState} from 'react';
import ScreenLayout from '../components/common/ScreenLayout';
import {SendForm} from './SettingsScreen';
import axios from 'axios';
import {showErrorToast, showSuccessToast} from '../components/Toast';
import ResetReceiver from '../components/wifiScreen/ResetReceiver';
import WifiInfoInput from '../components/wifiScreen/WifiInfoInput';
import {PostSSIDRequestBody} from '../types/common';

const WifiScreen = () => {
  const {wifiList} = useWifiList();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedSSID, setSelectedSSID] = useState<string | undefined>();

  const handleSubmitForm = async (body: PostSSIDRequestBody) => {
    setIsLoading(true);
    const response = await axios
      .post<SendForm>('http://192.168.4.1/api/ssid', body)
      .then(_ => showSuccessToast('와이파이 설정 완료'))
      .catch(_ => {
        setIsError(false);
        setSelectedSSID(undefined);
        showErrorToast('와이파이 설정 실패');
      });
    console.log(response);
    setIsLoading(false);
  };

  const handleSSIDPress = (value: string) => {
    setSelectedSSID(value);
  };

  return (
    <ScreenLayout>
      <ResetReceiver />
      <View className="flex basis-3/5 bg-white rounded-t-3xl">
        {selectedSSID ? (
          <View className="flex py-6">
            <WifiInfoInput
              ssid={selectedSSID}
              onCancel={() => setSelectedSSID(undefined)}
              onSubmit={handleSubmitForm}
            />
          </View>
        ) : (
          <>
            <Text className="mt-6 mb-4 text-center font-pbold text-black">
              리시버와 연결할 WIFI를 선택하세요
            </Text>
            <FlatList
              data={wifiList}
              contentContainerClassName="flex gap-y-1 p-4 "
              renderItem={({item: {SSID, BSSID}}) => (
                <ListItem
                  title={SSID}
                  subTitle={BSSID}
                  value={SSID}
                  onPress={handleSSIDPress}
                />
              )}
            />
          </>
        )}
      </View>
    </ScreenLayout>
  );
};

export default WifiScreen;
