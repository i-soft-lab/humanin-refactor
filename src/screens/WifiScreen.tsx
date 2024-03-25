import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, Text} from 'react-native';
import useWifiList from '../hooks/useWifiList';
import ListItem from '../components/common/ListItem';
import {cssInterop} from 'nativewind';

const WifiScreen = () => {
  const {wifiList} = useWifiList();

  // @ts-expect-error
  const StyledSafeAreaView = cssInterop(SafeAreaView, {className: 'style'});

  return (
    <StyledSafeAreaView className="flex gap-y-2 h-screen py-2 bg-blue-950">
      <Text className="font-psemibold text-lg text-white text-center py-2">
        1. 리시버와 연결할 WIFI를 선택하세요
      </Text>
      <FlatList
        data={wifiList}
        contentContainerClassName="flex gap-y-1 bg-white p-4 rounded-t-3xl"
        renderItem={({item: {SSID, BSSID}}) => (
          <ListItem title={SSID} subTitle={BSSID} />
        )}
      />
    </StyledSafeAreaView>
  );
};

export default WifiScreen;
