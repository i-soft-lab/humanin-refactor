import {ActivityIndicator, StyleSheet, Switch, View} from 'react-native';
import {Button, Text} from '@rneui/themed';
import React from 'react';

type Props = {
  title: string;
  subTitle: string | undefined;
  switchValue: boolean;
  isLoading: boolean;
  onPress: () => void;
};

export default function SwitchWithText({
  title,
  subTitle,
  switchValue,
  isLoading,
  onPress,
}: Props) {
  return (
    <Button
      onPress={onPress}
      containerStyle={styles.statusContainer}
      buttonStyle={styles.statusButton}
      type={'clear'}>
      <View style={styles.textContainer}>
        <Text style={styles.toggleTitle}>{title}</Text>
        {switchValue ? <Text style={styles.deviceName}>{subTitle}</Text> : null}
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          value={switchValue}
          onChange={onPress}
        />
      )}
    </Button>
  );
}

const styles = StyleSheet.create({
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusButton: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  loadingButton: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textContainer: {
    display: 'flex',
  },
  toggleTitle: {
    fontSize: 18,
  },
  deviceName: {
    fontSize: 14,
    color: 'gray',
  },
});
