import React from 'react';
import GraphScreen from './screens/GraphScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {RootStackParamList} from './types/navigationType';
import BleScreen from './screens/BleScreen';
import {BleProvider} from './context/BleProvider';
import BottomTabs from './types/bottomTabs';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BottomTabs/>
        <Toast/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
