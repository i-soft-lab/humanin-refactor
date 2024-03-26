import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, Text} from 'react-native';
import useWifiList from '../hooks/useWifiList';
import ListItem from '../components/common/ListItem';
import {cssInterop} from 'nativewind';
import {useState} from 'react';
import WifiInfoDialog from '../components/wifiScreen/WifiInfoDialog';

const WifiScreen = () => {
  const {wifiList} = useWifiList();
  const [selectedSSID, setSelectedSSID] = useState<string | undefined>();

  // @ts-expect-error
  const StyledSafeAreaView = cssInterop(SafeAreaView, {className: 'style'});

  const handleSubmitForm = (form: FormData) => {
    console.log(form);
  };

  return (
    <StyledSafeAreaView className="flex gap-y-2 h-screen py-2 bg-blue-950">
      <Text className="font-psemibold text-lg text-white text-center py-2">
        1. 리시버와 연결할 WIFI를 선택하세요
      </Text>
      <FlatList
        data={wifiList}
        contentContainerClassName="flex flex-1 gap-y-1 bg-white p-4 rounded-t-3xl"
        renderItem={({item: {SSID, BSSID}}) => (
          <ListItem
            title={SSID}
            subTitle={BSSID}
            value={SSID}
            onPress={setSelectedSSID}
          />
        )}
      />
      <WifiInfoDialog
        visible={!!selectedSSID}
        ssid={selectedSSID}
        onClose={handleSubmitForm}
      />
    </StyledSafeAreaView>
  );
};

export default WifiScreen;
