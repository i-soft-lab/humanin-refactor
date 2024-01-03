import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./navigationType";
import { BleProvider } from "../context/BleProvider";
import BleScreen from "../screens/BleScreen";
import GraphScreen from "../screens/GraphScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNav : React.FC = () => {
    return (
        <BleProvider>
            <Stack.Navigator
            initialRouteName={'Bluetooth'}
            screenOptions={{
                animation: 'slide_from_bottom',
                gestureEnabled: true,
                gestureDirection: 'vertical',
                headerBackVisible: false,
                headerStyle: {backgroundColor: '#101945'},
                headerShadowVisible: false,
            }}>
            <Stack.Screen
                name={'Bluetooth'}
                component={BleScreen}
                options={{title: '블루투스', headerShown: false}}
            />
            <Stack.Screen
                name={'Graph'}
                component={GraphScreen}
                options={{
                title: '',
                }}
            />
            </Stack.Navigator>
        </BleProvider>
    );
};

export default StackNav;