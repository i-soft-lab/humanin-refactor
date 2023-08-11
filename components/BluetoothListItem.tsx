import {ListItem} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import TouchableScale from 'react-native-touchable-scale';
import {DeviceId} from 'react-native-ble-plx';
import {ActivityIndicator, StyleSheet} from 'react-native';

type Props = {
  title: string;
  id: DeviceId;
  isLoading: boolean;
  onPress: (subTitle: string) => void;
};
const BluetoothListItem: React.FC<Props> = ({
  title,
  id,
  isLoading,
  onPress,
}) => {
  const [pressItem, setPressItem] = useState<DeviceId | null>();

  useEffect(() => {
    if (!isLoading) {
      setPressItem(null);
    }
  }, [isLoading]);
  const handleItemPress = (deviceId: DeviceId) => {
    setPressItem(deviceId);
    onPress(deviceId);
  };

  return (
    <ListItem
      Component={TouchableScale}
      containerStyle={styles.container}
      // @ts-ignore
      friction={90}
      tension={100}
      activeScale={0.95}
      onPress={() => handleItemPress(id)}>
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{title}</ListItem.Title>
        <ListItem.Subtitle style={styles.subTitle}>{id}</ListItem.Subtitle>
      </ListItem.Content>
      {pressItem === id ? (
        <ActivityIndicator size="large" color="#0592FF" />
      ) : null}
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginVertical: 4,
    marginHorizontal: 8,
  },
  title: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
  },
  subTitle: {
    fontFamily: 'Pretendard-Thin',
    fontSize: 12,
  },
});

export default BluetoothListItem;
