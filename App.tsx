import React from 'react';
import GraphScreen from './screens/GraphScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Button, Icon} from '@rneui/themed';
import Toast from 'react-native-toast-message';
import {RootStackParamList} from './types/navigationType';
import BleScreen from './screens/BleScreen';
import {BleProvider} from './context/BleProvider';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BleProvider>
          <Stack.Navigator initialRouteName={'Bluetooth'}>
            <Stack.Screen
              name={'Bluetooth'}
              component={BleScreen}
              options={{title: '블루투스'}}
            />
            <Stack.Screen
              name={'Graph'}
              component={GraphScreen}
              options={{
                title: '그래프',
                headerRight: () => (
                  <Button type="clear" color="gray">
                    <Icon name="settings" color="#0389E3" />
                  </Button>
                ),
              }}
            />
          </Stack.Navigator>
          <Toast />
        </BleProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
