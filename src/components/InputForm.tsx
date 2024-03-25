import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SendForm} from '../screens/SettingsScreen';
import {useLanguage} from '../context/LanguageProvider';

type InputFormProps = {
  sendForm: SendForm;
  onChangeSSID: (ssid: string) => void;
  onChangePasswd: (passwd: string) => void;
  onChangeTopic: (topic: string) => void;
  onDismiss: () => void;
};

const InputForm: React.FC<InputFormProps> = ({
  sendForm,
  onChangeSSID,
  onChangePasswd,
  onChangeTopic,
  onDismiss,
}) => {
  const {language} = useLanguage();

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
      <Text style={styles.label}>
        {language == 'ko'
          ? '*필수 (네트워크 이름)'
          : '*Required (Network Name)'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="SSID"
        value={sendForm.ssid}
        onChangeText={onChangeSSID}
      />
      <Text style={styles.label}>
        {language == 'ko'
          ? '*필수 (네트워크 비밀번호)'
          : '*Required (Network Password)'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="password"
        value={sendForm.passwd}
        onChangeText={onChangePasswd}
      />
      <Text style={styles.label}>
        {language == 'ko' ? '*필수 (topic)' : '*Required (topic)'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="topic"
        value={sendForm.topic}
        onChangeText={onChangeTopic}
      />
      <TouchableOpacity style={styles.button} onPress={onDismiss}>
        <Text style={styles.text}>{language == 'ko' ? '완료' : 'Done'}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    fontSize: 24,
    width: '70%',
    height: 50,
    borderRadius: 10,
    borderColor: '#101945',
    borderWidth: 1,
    marginBottom: 50,
    paddingHorizontal: 10,
    fontFamily: 'Pretendard-Regular',
  },
  label: {
    width: '70%',
    fontSize: 12,
    textAlign: 'left',
    color: 'red',
    marginStart: 5,
    fontFamily: 'Pretendard-Regular',
  },
  button: {
    width: '70%',
    height: 40,
    backgroundColor: '#101945',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Pretendard-Regular',
  },
});
