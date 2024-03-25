import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {RootStackParamList} from './src/types/navigationType';
import BottomTabs from './src/types/bottomTabs';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LanguageProvider} from './src/context/LanguageProvider';
import './global.css';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer>
            <BottomTabs />
            <Toast />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </LanguageProvider>
  );
};

export default App;
