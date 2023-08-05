import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import BluetoothScreen from './screens/BluetoothScreen';
import GraphScreen from './screens/GraphScreen';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from '@rneui/themed';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'Bluetooth'}>
            <Stack.Screen name={'Bluetooth'} component={BluetoothScreen} />
            <Stack.Screen name={'Graph'} component={GraphScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
