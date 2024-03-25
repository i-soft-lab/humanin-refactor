import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StackNav from './stackNav';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WifiScreen from '../screens/WifiScreen';

interface TabIconProps {
  name: string;
  size: number;
  color: string;
}

const TabIcon: React.FC<TabIconProps> = ({name, size, color}) => {
  return <Icon name={name} size={size} color={color} />;
};

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Main">
      <Tab.Screen
        name="Main"
        component={StackNav}
        options={{
          headerShown: false,
          tabBarIcon: props => TabIcon({...props, name: 'home'}),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={WifiScreen}
        options={{
          headerShown: false,
          tabBarIcon: props => TabIcon({...props, name: 'wifi'}),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
