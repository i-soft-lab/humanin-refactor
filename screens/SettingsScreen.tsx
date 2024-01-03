import React, {useEffect, useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, View, Text, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { showErrorToast, showSuccessToast } from "../components/Toast";
import axios from "axios";
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';

interface SendForm{
    ssid: string,
    passwd: string,
    topic: string,
}

interface NetInfoDetails{
    ssid?: string | null;
}

const SettingsScreen : React.FC = () => {

    const [checkWifi, setCheckWifi] = useState<Boolean>(false);

    const [sendForm, setSendForm] = useState<SendForm>({
        ssid: '',
        passwd: '',
        topic: ''
    })

    // 입력에 대한 유효성 검사
    const handleCheckForm = (sendForm : SendForm) => {
        if (sendForm.ssid !== null && sendForm.passwd !== null && sendForm.topic !== null){
            if (checkWifi){
                return true;
            } else {
                showErrorToast("Wifi", "와이파이 형식 오류");
                return false;
            }
        } else {
            showErrorToast("입력 형식 오류", "모든 칸에 공백 없이 입력해주세요.");
            return false;
        }
    }

    // 전송
    const handleSendPress = async (sendForm : SendForm) => {
        if (handleCheckForm(sendForm)){
            try {
                const dataForm = {
                    ssid: sendForm.ssid,
                    password: sendForm.passwd,
                    topic: sendForm.topic
                }
                const response = await axios.post<SendForm>(
                    'http://192.168.4.1/api/ssid',
                    dataForm
                );
                if (response.status === 200){
                    showSuccessToast("Wifi 연결 성공")
                    
                } else if (response.status === 400){
                    showErrorToast("Network 오류", '${response.data}')
                }
            } catch (error) {
                console.error('Error send form:', error);
                showErrorToast("Network 오류", "서버와의 전송이 실패했습니다.");
            }
        }
    }
    
    /** Wifi SSID 알아오는 방식 */
    useEffect(() => {
        const initializeNetInfo = async () => {
            const netInfoState = await NetInfo.fetch();
            handleNetInfoChange(netInfoState);

            const unsubscribe = NetInfo.addEventListener(handleNetInfoChange)

            return () => {
                unsubscribe();
            }
        }

        const handleNetInfoChange = (state: NetInfoState) => {
            if (state.isConnected && state.details){
                const { ssid } : NetInfoDetails = state.details as NetInfoDetails;
                if (!ssid?.includes("G-BRAIN")){
                    setCheckWifi(false);
                } else {
                    setCheckWifi(true);
                }
            }
        }

        initializeNetInfo();
        
    }, []);
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>리시버 아두이노 설정</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.label}>*필수 (네트워크 이름)</Text>
                <TextInput
                    style={styles.input}
                    placeholder = "SSID"
                    value = {sendForm.ssid}
                    onChangeText = {(text) => setSendForm((props) => ({...props, ssid: text}))}  
                />
                <Text style={styles.label}>*필수 (네트워크 비밀번호)</Text>
                <TextInput
                    style={styles.input}
                    placeholder = "password"
                    value = {sendForm.passwd}
                    onChangeText = {(text) => setSendForm((props) => ({...props, passwd: text}))}
                />
                <Text style={styles.label}>*필수 (topic)</Text>
                <TextInput
                    style={styles.input}
                    placeholder = "topic"
                    value = {sendForm.topic}
                    onChangeText = {(text) => setSendForm((props) => ({...props, topic: text}))}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>handleSendPress(sendForm)}
                >
                    <Text style={styles.text}>전송</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        display: 'flex',
        rowGap: 16,
    },
    header: {
        height: 50,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 24,
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
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
    title: {
        fontSize: 30,
        width: '100%',
        height: 60,
        textAlign: 'center',
        fontFamily: 'Pretendard-Regular',
    },
    button: {
        width: '70%',
        height: 50,
        backgroundColor: '#101945',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    text: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Pretendard-Regular',
    },
    label: {
        width: '70%',
        fontSize: 12,
        textAlign: 'left',
        color: 'red',
        marginStart: 5,
        fontFamily: 'Pretendard-Regular',
    }
  });

export default SettingsScreen;