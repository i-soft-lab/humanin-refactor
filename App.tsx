import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import BluetoothScreen from './screens/BluetoothScreen';
import GraphScreen from './screens/GraphScreen';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Bluetooth'}>
          <Stack.Screen name={'Bluetooth'} component={BluetoothScreen} />
          <Stack.Screen name={'Graph'} component={GraphScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
