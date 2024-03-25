import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import BluetoothListItem from './BluetoothListItem';
import {Device, DeviceId} from 'react-native-ble-plx';
import {Text} from '@rneui/themed';

type Props = {
  title: string;
  data: Device[];
  isLoading: boolean;
  onPress: (id: DeviceId) => void;
};
const BluetoothList: React.FC<Props> = ({title, data, isLoading, onPress}) => {
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
            isLoading={isLoading}
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
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  title: {
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
    fontFamily: 'Pretendard-Bold',
  },
  list: {
    borderRadius: 16,
  },
});
export default BluetoothList;
