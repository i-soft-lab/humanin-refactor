import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import BottomTabs from './components/stack/bottomTabs';
import '../global.css';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BottomTabs />
        <Toast />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
