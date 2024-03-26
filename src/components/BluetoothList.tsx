import {FlatList} from 'react-native';
import React from 'react';
import BluetoothListItem from './BluetoothListItem';
import {Device, DeviceId} from 'react-native-ble-plx';

type Props = {
  data: Device[];
  isLoading: boolean;
  onPress: (id: DeviceId) => void;
};
const BluetoothList: React.FC<Props> = ({data, isLoading, onPress}) => {
  const handleItemPress = (id: DeviceId) => {
    onPress(id);
  };

  return (
    <FlatList
      className="rounded-4"
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
  );
};

export default BluetoothList;
