import React, {useState, useEffect, createContext} from 'react';
import GraphScreen from './screens/GraphScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {RootStackParamList} from './types/navigationType';
import BleScreen from './screens/BleScreen';
import {BleProvider} from './context/BleProvider';
import BottomTabs from './types/bottomTabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LanguageProvider } from './context/LanguageProvider';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {

  return (
    <LanguageProvider>
      <SafeAreaProvider>      
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer>
            <BottomTabs/>
            <Toast/>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </LanguageProvider>
  );
};

export default App;