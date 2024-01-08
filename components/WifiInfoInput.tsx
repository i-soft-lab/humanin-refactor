import React from "react";
import { Text, View, StyleSheet } from "react-native";
import OpenDrawer from "./OpenDrawer";
import Modal from "react-native-modal";

interface Props{
    SSID: string;
    passwd: string;
    topic: string;
    onChangeOpenValue: () => void;
    isOpen: boolean;
}

const WifiInfoInput : React.FC<Props> = ({SSID, passwd, topic, onChangeOpenValue, isOpen}) => {
    return(
        <Modal
            isVisible={isOpen}
            style={styles.bottomModal}
            onBackdropPress={onChangeOpenValue}
            onBackButtonPress={onChangeOpenValue}
        >
            <View style={styles.bottomModalContent}>
                <OpenDrawer onPress={onChangeOpenValue}/>
                <Text style={styles.text}>{SSID}</Text>
                <Text style={styles.text}>{passwd}</Text>
                <Text style={styles.text}>{topic}</Text>
            </View>
        </Modal>
    );
}

export default WifiInfoInput;

const styles = StyleSheet.create({
    bottomModalContent: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        marginTop: 50,
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
})