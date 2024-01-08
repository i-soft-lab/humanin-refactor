import React from "react";
import { StyleSheet, View, Text } from "react-native";

const InfoList : React.FC = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>SSID : WIFINAME</Text>
            <Text style={styles.text}>PASSWORD : PASSWORD</Text>
            <Text style={styles.text}>TOPIC : TOPIC</Text>
        </View>
    );
};

export default InfoList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        width: '50%',
        fontSize: 16,
        color: 'black'
    }
});