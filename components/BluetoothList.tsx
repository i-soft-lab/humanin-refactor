import {FlatList, Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import {Card} from '@rneui/themed';
import BluetoothListItem from './BluetoothListItem';
import {BluetoothDevice} from 'react-native-bluetooth-classic';

type Props = {
  title: string;
  data: BluetoothDevice[];
  onPress: (device: BluetoothDevice) => void;
};
const BluetoothList: React.FC<Props> = ({title, data, onPress}) => {
  const handleItemPress = (address: string) => {
    onPress(data.find(device => device.address === address)!);
  };

  return (
    <View style={[styles.container, shadowStyle]}>
      <Card.Title>{title}</Card.Title>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={({item}) => (
          <BluetoothListItem
            title={item.name}
            address={item.address}
            onPress={() => handleItemPress(item.address)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 12,
    borderRadius: 16,
  },
  list: {
    borderRadius: 16,
  },
});
const shadowStyle = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  android: {
    elevation: 4,
    overflow: 'hidden' as 'hidden',
  },
});
export default BluetoothList;
