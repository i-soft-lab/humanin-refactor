import {FlatList, Text, View} from 'react-native';
import useWifiList from '../hooks/useWifiList';
import ListItem from '../components/common/ListItem';
import React, {useState} from 'react';
import ScreenLayout from '../components/common/ScreenLayout';
import axios from 'axios';
import WifiInfoInput from '../components/wifiScreen/WifiInfoInput';
import {PostSSIDRequestBody} from '../types/common';
import {showErrorToast} from '../components/Toast';
import ResetReceiver from '../components/wifiScreen/ResetReceiver';

const WifiScreen = () => {
  const {wifiList} = useWifiList();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedSSID, setSelectedSSID] = useState<string | undefined>();
  const [topic, setTopic] = useState<string>('');

  const handleSubmitForm = async (body: PostSSIDRequestBody) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://192.168.4.1/api/ssid', body);
      setIsSuccess(response.data === 'Connect Success!!');
      setTopic(body.topic);
      console.log(response);
    } catch (e) {
      setIsError(true);
      showErrorToast('와이파이 설정 실패');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSSIDPress = (value: string) => {
    setSelectedSSID(value);
  };

  return (
    <ScreenLayout>
      <ResetReceiver />
      <View className="flex basis-3/5 bg-white rounded-t-3xl">
        {selectedSSID ? (
          isSuccess ? (
            <View className="p-6">
              <Text className="mb-12 text-center font-pbold text-black">
                리시버 정보
              </Text>
              <Text className="font-pnormal text-center text-xl">
                연결된 WIFI: {selectedSSID}
              </Text>
              <Text className="font-pnormal text-center text-xl">
                구독한 Topic: {topic}
              </Text>
            </View>
          ) : (
            <View className="flex py-6">
              <WifiInfoInput
                ssid={selectedSSID}
                isLoading={isLoading}
                onCancel={() => setSelectedSSID(undefined)}
                onSubmit={handleSubmitForm}
              />
            </View>
          )
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
