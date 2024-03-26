import {FlatList, View} from 'react-native';
import useWifiList from '../hooks/useWifiList';
import ListItem from '../components/common/ListItem';
import {useState} from 'react';
import WifiInfoDialog from '../components/wifiScreen/WifiInfoDialog';
import axios from 'axios';
import {SendForm} from './SettingsScreen';
import IconPulseButton from '../components/common/IconPulseButton';
import ScreenLayout from '../components/common/ScreenLayout';

const WifiScreen = () => {
  const {wifiList} = useWifiList();
  const [selectedSSID, setSelectedSSID] = useState<string | undefined>();

  const handleSubmitForm = async (formData: FormData) => {
    const response = await axios.post<SendForm>(
      'http://192.168.4.1/api/ssid',
      formData,
    );
    console.log(formData);
    console.log(response);
  };

  return (
    <ScreenLayout>
      <IconPulseButton
        text={'1. 리시버와 연결할 WIFI를 선택하세요'}
        iconName="wifi"
        onPress={() => {}}
        isPulse={true}
      />
      <View className="flex basis-3/5">
        <FlatList
          data={wifiList}
          contentContainerClassName="flex gap-y-1 bg-white p-4 rounded-t-3xl"
          renderItem={({item: {SSID, BSSID}}) => (
            <ListItem
              title={SSID}
              subTitle={BSSID}
              value={SSID}
              onPress={setSelectedSSID}
            />
          )}
        />
      </View>
      <WifiInfoDialog
        visible={!!selectedSSID}
        ssid={selectedSSID}
        onClose={handleSubmitForm}
      />
    </ScreenLayout>
  );
};

export default WifiScreen;
