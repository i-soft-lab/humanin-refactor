import BluetoothListItem from './BluetoothListItem';
import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from '@rneui/themed';

type Props = {
  title: string;
};
const BluetoothList: React.FC<Props> = ({title}) => {
  const list = [
    {
      name: '블루투스1',
      subtitle: '맥주소1',
    },
    {
      name: '블루투스2',
      subtitle: '맥주소2',
    },
    {
      name: '블루투스2',
      subtitle: '맥주소2',
    },
    {
      name: '블루투스2',
      subtitle: '맥주소2',
    },
    {
      name: '블루투스2',
      subtitle: '맥주소2',
    },
  ];
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <FlatList
        data={list}
        renderItem={({item}) => (
          <BluetoothListItem title={item.name} subTitle={item.subtitle} />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
  },
});
export default BluetoothList;
