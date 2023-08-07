import React from 'react';
import BluetoothScreen from './screens/BluetoothScreen';
import GraphScreen from './screens/GraphScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Button, Icon, ThemeProvider} from '@rneui/themed';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'Bluetooth'}>
            <Stack.Screen
              name={'Bluetooth'}
              component={BluetoothScreen}
              options={{title: '블루투스'}}
            />
            <Stack.Screen
              name={'Graph'}
              component={GraphScreen}
              options={{
                title: '그래프',
                headerRight: () => (
                  <Button type="clear" color="gray">
                    <Icon name="info" color="gray" />
                  </Button>
                ),
              }}
            />
          </Stack.Navigator>
          <Toast />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
