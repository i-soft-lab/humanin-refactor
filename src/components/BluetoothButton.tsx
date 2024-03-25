import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Avatar} from '@rneui/themed';
import {useTranslation} from 'react-i18next';

type Props = {
  onPress: () => void;
  isScan: boolean;
};

const BluetoothButton: React.FC<Props> = ({onPress, isScan}) => {
  const Pulse = require('react-native-pulse').default;

  const {t} = useTranslation();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text className="text-lg font-semibold text-white">
        {isScan ? t('searching_device') : t('press_to_search')}
      </Text>
      <View className="flex flex-1 items-center justify-center">
        {isScan && (
          <Pulse
            color="#0592FF"
            numPulses={3}
            diameter={250}
            speed={10}
            duration={1500}
          />
        )}
        <Avatar
          size={80}
          rounded
          icon={{name: 'bluetooth'}}
          containerStyle={{backgroundColor: '#0592FF'}}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default BluetoothButton;
