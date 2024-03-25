import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, Text} from 'react-native';
import useWifiList from '../hooks/useWifiList';
import ListItem from '../components/common/ListItem';

const WifiScreen = () => {
  const {wifiList} = useWifiList();

  return (
    <SafeAreaView>
      <Text>WIFI</Text>
      <FlatList
        data={wifiList}
        renderItem={({item: {SSID, BSSID}}) => (
          <ListItem title={SSID} subTitle={BSSID} />
        )}
      />
    </SafeAreaView>
  );
};

export default WifiScreen;
