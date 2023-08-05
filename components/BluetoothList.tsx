import BluetoothListItem from './BluetoothListItem';
import {FlatList, Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import {Card} from '@rneui/themed';

type Props = {
  title: string;
  onPress: (address: string) => void;
};
const BluetoothList: React.FC<Props> = ({title, onPress}) => {
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
    <View style={[styles.container, shadowStyle]}>
      <Card.Title>{title}</Card.Title>
      <FlatList
        data={list}
        renderItem={({item}) => (
          <BluetoothListItem
            title={item.name}
            subTitle={item.subtitle}
            onPress={onPress}
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
    overflow: 'hidden',
  },
});
const shadowStyle = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  android: {
    elevation: 4,
  },
});
export default BluetoothList;
