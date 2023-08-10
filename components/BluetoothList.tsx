import {FlatList, Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import {Card} from '@rneui/themed';
import BluetoothListItem from './BluetoothListItem';
import {Device, DeviceId} from 'react-native-ble-plx';

type Props = {
  title: string;
  data: Device[];
  onPress: (id: DeviceId) => void;
};
const BluetoothList: React.FC<Props> = ({title, data, onPress}) => {
  const handleItemPress = (id: DeviceId) => {
    onPress(id);
  };

  return (
    <View style={[styles.container, shadowStyle]}>
      <Card.Title>{title}</Card.Title>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={({item}) => (
          <BluetoothListItem
            title={item.name ?? '이름 없음'}
            id={item.id}
            onPress={() => handleItemPress(item.id)}
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
