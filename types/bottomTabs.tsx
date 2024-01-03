import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingsScreen from "../screens/SettingsScreen";
import StackNav from "./stackNav";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name = "Main"
                component = {StackNav}
                options={{headerShown: false}}
            />
            <Tab.Screen
                name = "Settings"
                component = {SettingsScreen}
                options={{headerShown: false}}
            />
        </Tab.Navigator>
    );
}

export default BottomTabs;