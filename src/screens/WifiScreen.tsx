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
    <StyledSafeAreaView className="bg-white h-screen">
      <Text>WIFI</Text>
      <FlatList
        data={wifiList}
        className="px-4"
        contentContainerClassName="flex gap-y-1"
        renderItem={({item: {SSID, BSSID}}) => (
          <ListItem title={SSID} subTitle={BSSID} />
        )}
      />
    </StyledSafeAreaView>
  );
};

export default WifiScreen;
