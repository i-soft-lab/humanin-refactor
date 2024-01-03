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
        {/* <BleProvider>
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
          <Toast />
        </BleProvider> */}
        <BottomTabs/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
