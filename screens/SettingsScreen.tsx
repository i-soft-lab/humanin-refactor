import React, {useEffect, useState, useRef} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Animated, StyleSheet } from "react-native";
import { showErrorToast, showSuccessToast } from "../components/Toast";
import axios from "axios";
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import WifiInfoInput from "../components/WifiInfoInput";
import WifiIcon from "../components/WifiIcon";
import OpenDrawer from "../components/OpenDrawer";
import InfoList from "../components/InfoList";
import { FAB } from "react-native-paper";
import { Icon } from "@rneui/base";
import {Directions, FlingGestureHandler, PanGestureHandler, State} from 'react-native-gesture-handler'
import { useLanguage } from "../context/LanguageProvider";

export type SendForm = {
    ssid: string,
    passwd: string,
    topic: string,
}

interface NetInfoDetails{
    ssid?: string | null;
}

const SettingsScreen : React.FC = () => {

    const [checkWifi, setCheckWifi] = useState<boolean>(false);
    const [isScan, setIsScan] = useState<boolean>(false);
    const [sendForm, setSendForm] = useState<SendForm>({
        ssid: '',
        passwd: '',
        topic: ''
    })
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {language} = useLanguage();

    const translateY = useRef(new Animated.Value(0)).current;

    // Bottom Sheet 상태 변경
    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    // SSID 변경
    const handleSSIDChange = (newSsid : string) => {
        setSendForm((props) => ({...props, ssid: newSsid}))
    }

    // passwd 변경
    const handlePasswdChange = (newPasswd : string) => {
        setSendForm((props) => ({...props, passwd: newPasswd}))
    }

    // topic 변경
    const handleTopicChange = (newTopic : string) => {
        setSendForm((props) => ({...props, topic: newTopic}))
    }

    // 설정 초기화
    const handleResetOption = () => {
        console.log("Test", "FAB Clicked");
    }

    const handleUpEvent = (event: any) => {

        const translationY = event.nativeEvent.translationY;
        if (event.nativeEvent.state === State.ACTIVE){
            if (translationY < -50 && translationY > -150) {
                console.log("Test", "Gesture reconnize");
                handleOpen();
            }
        }
        Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: false,
        }).start();
    };

    // 입력에 대한 유효성 검사
    const handleCheckForm = (sendForm : SendForm) => {
        if (sendForm.ssid !== null && sendForm.passwd !== null && sendForm.topic !== null){
            if (checkWifi){
                return true;
            } else {
                if (language == 'ko'){
                    showErrorToast("Wifi", "와이파이 형식 오류");
                } else {
                    showErrorToast("Wifi", "Wi-Fi format error");
                }
                
                return false;
            }
        } else {
            if (language == 'ko'){
                showErrorToast("입력 형식 오류", "모든 칸에 공백 없이 입력해주세요.");
            } else {
                showErrorToast("Input format error", "Please fill in all the blanks without spaces.");
            }
            return false;
        }
    }

    // 전송
    const handleSendPress = async () => {
        console.log("Test", "Wifi Clicked");
        if (isScan){
            setIsScan(false);
            return;
        } 
        
        setIsScan(true);

        let cancelFlag = false;

        if (handleCheckForm(sendForm)){
            try {
                const dataForm = {
                    ssid: sendForm.ssid,
                    password: sendForm.passwd,
                    topic: sendForm.topic
                }

                console.log("Test", {dataForm})

                if (cancelFlag) return;

                const response = await axios.post<SendForm>(
                    'http://192.168.4.1/api/ssid',
                    dataForm
                );

                if (cancelFlag) return;

                if (response.status === 200){
                    if (language == 'ko'){
                        showSuccessToast("Wifi 연결 성공")
                    } else {
                        showSuccessToast("WiFi connection successful")
                    }
                } else if (response.status === 400){
                    if (language == 'ko'){
                        showErrorToast("Network 오류", '${response.data}')
                    } else {
                        showErrorToast("Network Error", '${response.data}')
                    }
                }
            } catch (error) {
                console.error('Error send form:', error);
                if (language == 'ko'){
                    showErrorToast("Network 오류", "서버와의 전송이 실패했습니다.");
                } else {
                    showErrorToast("Network Error", "Transfer to server failed.");
                }
            } finally {
                cancelFlag = true;
            }
        }
        setIsScan(false);
    }
    
    // test 코드
    useEffect(() => {
        console.log("Test", {isScan});
    }, [isScan]);

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
            <View style={styles.avatarContainer}>
                <WifiIcon onPress={handleSendPress} isScan={isScan}/>
            </View>
            <PanGestureHandler
                onGestureEvent={handleUpEvent}
                onHandlerStateChange={handleUpEvent}
            >
                <View style={styles.listContainer}>               
                    <View style={styles.tmp}>
                        <OpenDrawer onPress={handleOpen} isOpen={isOpen} onChangeOpenValue={handleOpen}/>
                        <InfoList
                            sendForm={sendForm}
                        />
                        <WifiInfoInput
                            sendForm={sendForm}
                            onChangeOpenValue={handleOpen}
                            isOpen={isOpen}
                            onChangeSSID={handleSSIDChange}
                            onChangePasswd={handlePasswdChange}
                            onChangeTopic={handleTopicChange}
                        />
                        <View style={{width: '100%', alignItems: 'flex-end', justifyContent: 'center', marginEnd: 40, marginBottom: 20}}>
                            <FAB 
                                style={styles.fab}
                                icon={() => <Icon name='refresh' color='white'/> }
                                onPress={handleResetOption}
                            />
                        </View>
                    </View>
                </View>
            </PanGestureHandler>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101945',
        display: 'flex',
        rowGap: 16,
    },
    avatarContainer: {
        flex: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
    },
    listContainer: {
        flex: 3,
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
        alignItems: 'flex-end',
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
        width: '20%',
        height: 10,
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
    },
    fab: {
        borderRadius: 50, 
        backgroundColor: '#87ceeb', 
        color: 'white',
    },
    tmp: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        width: '100%',
        backgroundColor: '#FFF',
    }
});

export default SettingsScreen;