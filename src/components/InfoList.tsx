import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SendForm} from '../screens/SettingsScreen';

type Props = {
  sendForm: SendForm;
};

const InfoList: React.FC<Props> = ({sendForm}) => {
  return (
    <View style={styles.container}>
      <View style={styles.space}></View>
      <View style={styles.row}>
        <Text style={styles.textTag}>SSID : </Text>
        <Text style={styles.textContent}>{sendForm.ssid}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textTag}>PASSWORD : </Text>
        <Text style={styles.textContent}>{sendForm.passwd}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textTag}>TOPIC : </Text>
        <Text style={styles.textContent}>{sendForm.topic}</Text>
      </View>
    </View>
  );
};

export default InfoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  space: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-end',
    marginEnd: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  textTag: {
    flex: 3,
    height: 30,
    fontSize: 16,
    color: 'black',
  },
  textContent: {
    flex: 5,
    height: 30,
    fontSize: 16,
    color: 'black',
  },
});
