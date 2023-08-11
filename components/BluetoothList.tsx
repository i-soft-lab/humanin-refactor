import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from '@rneui/themed';
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
    <View style={[styles.container]}>
      <Text style={styles.title}>{title}</Text>
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingTop: 12,
    borderRadius: 16,
  },
  title: {
    fontFamily: 'Pretendard-SemiBold',
  },
  list: {
    borderRadius: 16,
  },
});
export default BluetoothList;
