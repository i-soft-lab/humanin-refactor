import {
  ActivityIndicator,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from '@rneui/themed';
import React from 'react';

type Props = {
  title: string;
  subTitle: string | undefined;
  switchValue: boolean;
  isLoading: boolean;
  onPress: () => void;
};

const SwitchWithText: React.FC<Props> = ({
  title,
  subTitle,
  switchValue,
  isLoading,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.statusContainer}>
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
          onValueChange={onPress}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
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

export default SwitchWithText;
