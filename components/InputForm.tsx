import React, {useRef} from "react";
import { TouchableOpacity, StyleSheet, View, TextInput, Text, Animated } from "react-native";
import { SendForm } from "../screens/SettingsScreen";
import { State, PanGestureHandler } from "react-native-gesture-handler";
import { useLanguage } from "../context/LanguageProvider";

type InputFormProps = {
    sendForm : SendForm;
    onChangeSSID: (ssid: string) => void,
    onChangePasswd: (passwd: string) => void,
    onChangeTopic: (topic: string) => void,
    onDismiss: () => void,
}

const InputForm : React.FC<InputFormProps> = ({sendForm, onChangeSSID, onChangePasswd, onChangeTopic, onDismiss}) => {

    const {language} = useLanguage();

    // const translateY = useRef(new Animated.Value(0)).current;

    // const handleDownEvent = (event: any) => {

    //     const translationY = event.nativeEvent.translationY;
    //     console.log("Test", "Gesture Recognize")
    //     if (event.nativeEvent.state === State.ACTIVE){
    //         if (translationY > 50 && translationY < 150) {
    //             console.log("Test", "Gesture recognize");
    //             onDismiss();
    //         }
    //     }

    //     Animated.spring(translateY, {
    //         toValue: 0,
    //         useNativeDriver: false,
    //     }).start();
    // };

    return(
        <View style={styles.container}>
            <Text style={styles.label}>
                {language == 'ko' ? '*필수 (네트워크 이름)' : '*Required (Network Name)' }                
            </Text>
            <TextInput
                style={styles.input}
                placeholder = "SSID"
                value = {sendForm.ssid}
                onChangeText = {onChangeSSID}  
            />
            <Text style={styles.label}>
                {language == 'ko' ? '*필수 (네트워크 비밀번호)' : '*Required (Network Password)'}
            </Text>
            <TextInput
                style={styles.input}
                placeholder = "password"
                value = {sendForm.passwd}
                onChangeText = {onChangePasswd}
            />
            <Text style={styles.label}>
                {language == 'ko' ? '*필수 (topic)' : '*Required (topic)'}
            </Text>
            <TextInput
                style={styles.input}
                placeholder = "topic"
                value = {sendForm.topic}
                onChangeText = {onChangeTopic}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={onDismiss}
            >
                <Text style={styles.text}>
                    {language == 'ko' ? '완료' : 'Done'}
                </Text>
            </TouchableOpacity>
        </View>
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