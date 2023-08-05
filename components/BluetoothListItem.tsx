import {ListItem} from '@rneui/themed';
import React from 'react';
import TouchableScale from 'react-native-touchable-scale';

type Props = {
  title: string;
  subTitle: string;
  onPress: (subTitle: string) => void;
};
const BluetoothListItem: React.FC<Props> = ({title, subTitle, onPress}) => {
  return (
    <ListItem
      Component={TouchableScale}
      // @ts-ignore
      friction={90}
      tension={100}
      activeScale={0.95}
      onPress={() => onPress(subTitle)}
      bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
        <ListItem.Subtitle>{subTitle}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default BluetoothListItem;
