import {ListItem} from '@rneui/themed';
import React from 'react';
import TouchableScale from 'react-native-touchable-scale';
import {DeviceId} from 'react-native-ble-plx';

type Props = {
  title: string;
  id: DeviceId;
  onPress: (subTitle: string) => void;
};
const BluetoothListItem: React.FC<Props> = ({title, id, onPress}) => {
  return (
    <ListItem
      Component={TouchableScale}
      // @ts-ignore
      friction={90}
      tension={100}
      activeScale={0.95}
      onPress={() => onPress(id)}
      bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
        <ListItem.Subtitle>{id}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default BluetoothListItem;
