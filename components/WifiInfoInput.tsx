import React from "react";
import { Text, View, StyleSheet } from "react-native";
import OpenDrawer from "./OpenDrawer";
import Modal from "react-native-modal";
import { SendForm } from "../screens/SettingsScreen";
import InputForm from "./InputForm";

type WifiInfoInputProps = {
    sendForm: SendForm;
    onChangeOpenValue: () => void;
    isOpen: boolean;
    onChangeSSID: (ssid: string) => void,
    onChangePasswd: (passwd: string) => void,
    onChangeTopic: (topic: string) => void
}

const WifiInfoInput : React.FC<WifiInfoInputProps> = ({sendForm, onChangeOpenValue, isOpen, onChangeSSID, onChangePasswd, onChangeTopic}) => {
    return(
        <Modal
            isVisible={isOpen}
            style={styles.bottomModal}
            onBackdropPress={onChangeOpenValue}
            onBackButtonPress={onChangeOpenValue}
        >
            <View style={styles.space}></View>
            <View style={styles.bottomModalContent}>
                <OpenDrawer onPress={onChangeOpenValue} isOpen={isOpen} onChangeOpenValue={onChangeOpenValue}/>
                <InputForm
                    sendForm={sendForm} 
                    onChangeSSID={onChangeSSID} 
                    onChangePasswd={onChangePasswd}
                    onChangeTopic={onChangeTopic}
                    onDismiss={onChangeOpenValue}
                />
            </View>
        </Modal>
    );
}

export default WifiInfoInput;

const styles = StyleSheet.create({
    bottomModalContent: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        flex: 9,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    text: {
        width: '50%',
        color: 'lightgray',
        marginBottom: 15,
        fontSize: 20,
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0
    },
    space: {
        flex: 1
    }
})