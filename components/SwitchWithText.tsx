import {ActivityIndicator, StyleSheet, Switch} from 'react-native';
import {Avatar, ListItem} from '@rneui/themed';
import React from 'react';
import TouchableScale from 'react-native-touchable-scale';

type Props = {
  title: string;
  subTitle: string | undefined;
  switchValue: boolean;
  isLoading: boolean;
  iconName: string;
  iconType: string;
  color: string;
  disableTurnOff: boolean;
  onPress: () => void;
};

const SwitchWithText: React.FC<Props> = ({
  title,
  subTitle,
  switchValue,
  isLoading,
  iconName,
  iconType,
  color,
  disableTurnOff,
  onPress,
}) => {
  return (
    <ListItem
      Component={TouchableScale}
      containerStyle={styles.statusContainer}
      // @ts-ignore
      friction={90}
      tension={100}
      activeScale={0.95}
      onPress={onPress}
      disabled={disableTurnOff && switchValue}>
      <Avatar
        size={40}
        icon={{name: iconName, type: iconType}}
        containerStyle={[{backgroundColor: color}, styles.avatar]}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{title}</ListItem.Title>
        <ListItem.Subtitle style={styles.subTitle}>
          {subTitle}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron color="white" />
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Switch
          disabled={disableTurnOff && switchValue}
          thumbColor={color}
          trackColor={{false: '#b8b8b8', true: color.replace(/(FF)$/i, '70')}}
          ios_backgroundColor="#b8b8b8"
          value={switchValue}
          onValueChange={onPress}
        />
      )}
    </ListItem>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
    backgroundColor: 'transparent',
  },
  avatar: {
    borderRadius: 6,
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

export default SwitchWithText;
