import React from "react";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";

interface Props{
    onPress: () => void;
}

const OpenDrawer: React.FC<Props> = ({onPress}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Button 
                    color='gray'
                    title=''
                    onPress={onPress}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    button: {
        width: '20%',
        height: 10
    }
});

export default OpenDrawer;