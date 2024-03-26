import {Text} from 'react-native';
import React from 'react';
import TouchableScale from 'react-native-touchable-scale';

type ListItemProps = {
  title: string;
  subTitle?: string;
  value: string;
  onPress?: (value: string) => void;
};
const ListItem: React.FC<ListItemProps> = ({
  value,
  title,
  subTitle,
  onPress,
}) => {
  return (
    <TouchableScale
      onPress={() => onPress?.(value)}
      friction={90}
      tension={100}
      activeScale={0.95}>
      <Text className="font-pnormal text-lg text-black">{title}</Text>
      <Text className="font-plight text-sm text-gray-400">{subTitle}</Text>
    </TouchableScale>
  );
};

export default ListItem;
