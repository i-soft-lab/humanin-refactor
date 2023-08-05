import {ListItem} from '@rneui/themed';
import React from 'react';
import TouchableScale from 'react-native-touchable-scale';

type Props = {
  title: string;
  subTitle: string;
};
const BluetoothListItem: React.FC<Props> = ({title, subTitle}) => {
  return (
    <ListItem
      Component={TouchableScale}
      // @ts-ignore
      friction={90}
      tension={100}
      activeScale={0.95}
      bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
        <ListItem.Subtitle>{subTitle}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default BluetoothListItem;
