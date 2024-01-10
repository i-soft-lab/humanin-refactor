import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Avatar, Text} from '@rneui/themed';
import { useLanguage } from '../context/LanguageProvider';

type Props = {
  onPress: () => void;
  isScan: boolean;
};

const BluetoothButton: React.FC<Props> = ({onPress, isScan}) => {
  const Pulse = require('react-native-pulse').default;

  const {language} = useLanguage();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>
        {isScan ? language==='ko' ? '기기를 검색중입니다.' : 'Searching for a device.' : language==='ko' ? '버튼을 눌러 기기를 검색하세요.' : 'Press the button to search for the device.'}
      </Text>
      <View style={styles.container}>
        {isScan ? (
          <Pulse
            color="#0592FF"
            numPulses={3}
            diameter={250}
            speed={10}
            duration={1500}
          />
        ) : null}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: 'white',
  },
});
export default BluetoothButton;
