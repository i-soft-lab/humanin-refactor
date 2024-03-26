import {FlatList, View} from 'react-native';
import useWifiList from '../hooks/useWifiList';
import ListItem from '../components/common/ListItem';
import {useState} from 'react';
import WifiInfoDialog from '../components/wifiScreen/WifiInfoDialog';
import IconPulseButton from '../components/common/IconPulseButton';
import ScreenLayout from '../components/common/ScreenLayout';
import {SendForm} from './SettingsScreen';
import axios from 'axios';
import {showErrorToast} from '../components/Toast';

const WifiScreen = () => {
  const {wifiList} = useWifiList();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedSSID, setSelectedSSID] = useState<string | undefined>();

  const handleSubmitForm = async (formData: FormData) => {
    setIsDialogOpen(false);
    setIsLoading(true);
    const response = await axios
      .post<SendForm>('http://192.168.4.1/api/ssid', formData)
      .catch(_ => {
        setIsError(false);
        setSelectedSSID(undefined);
        showErrorToast('와이파이 설정 실패');
      });
    setIsLoading(false);
  };

  const toggleDialogOpen = () => setIsDialogOpen(prev => !prev);

  const handleSSIDPress = (value: string) => {
    toggleDialogOpen();
    setSelectedSSID(value);
  };

  const iconName = isError ? 'priority-high' : 'wifi';

  return (
    <ScreenLayout>
      <IconPulseButton
        text={'리시버와 연결할 WIFI를 선택하세요'}
        iconName={iconName}
        isPulse={isLoading}
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
              onPress={handleSSIDPress}
            />
          )}
        />
      </View>
      <WifiInfoDialog
        visible={isDialogOpen}
        ssid={selectedSSID}
        closeDialog={toggleDialogOpen}
        onClose={handleSubmitForm}
      />
    </ScreenLayout>
  );
};

export default WifiScreen;
