import {ListItem} from '@rneui/themed';
import React from 'react';
import TouchableScale from 'react-native-touchable-scale';

type Props = {
  title: string;
  address: string;
  onPress: (subTitle: string) => void;
};
const BluetoothListItem: React.FC<Props> = ({title, address, onPress}) => {
  return (
    <ListItem
      Component={TouchableScale}
      // @ts-ignore
      friction={90}
      tension={100}
      activeScale={0.95}
      onPress={() => onPress(address)}
      bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
        <ListItem.Subtitle>{address}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default BluetoothListItem;
