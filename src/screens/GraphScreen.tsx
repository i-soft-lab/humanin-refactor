import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect, useState} from 'react';
import {
  GraphScreenNavigationProp,
  RootStackParamList,
} from '../types/navigationType';
import {RouteProp} from '@react-navigation/native';
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from '../components/Toast';
import LineChart from '../components/LineChart';
import usePlotData from '../hooks/usePlotData';
import useBle from '../hooks/useBle';
import {useBleContext} from '../context/BleProvider';
import SwitchWithText from '../components/SwitchWithText';
import {Icon} from '@rneui/themed';
import useMqtt from '../hooks/useMqtt';
import ThresholdLimitSlider from '../components/ThresholdLimitSlider';
import {useTranslation} from 'react-i18next';

interface GraphScreenProps {
  navigation: GraphScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'Graph'>;
}

const GraphScreen: React.FC<GraphScreenProps> = ({navigation, route}) => {
  const {bleManager} = useBleContext();
  const {id, name} = route.params;
  const {
    findServicesAndCharacteristics,
    connect,
    disconnect,
    isConnectedDevice,
    write,
    onDisconnect,
    subscribeCharacteristic,
  } = useBle(bleManager);
  const {chartData, handleChartData} = usePlotData();
  const {
    isMqttConnected,
    isMqttLoading,
    setIsMqttLoading,
    mqttConnect,
    mqttDisconnect,
    sendMessage,
  } = useMqtt(name);
  const [isBluetoothConnected, setIsBluetoothConnected] = useState(false);
  const [isBluetoothLoading, setIsBluetoothLoading] = useState(false);
  const [thresholdLimit, setThresholdLimit] = useState(155);

  const {t} = useTranslation();

  useEffect(() => {
    if (isBluetoothConnected) {
      findServicesAndCharacteristics(id)
        .then(() => {
          subscribeCharacteristic(id, dataArr => {
            const res = handleChartData(dataArr);
            sendMessage(res);
          });
        })
        .catch(e => {
          showErrorToast(t('cannot_get_data'), e.message);
        });
    }

    // 블루투스 연결 해제 리스너 등록
    onDisconnect(id, () => {
      setIsBluetoothConnected(false);
    });
  }, [isBluetoothConnected]);

  useEffect(() => {
    isConnectedDevice(id).then((res: boolean) => setIsBluetoothConnected(res));

    return () => {
      isConnectedDevice(id).then((res: boolean) => {
        if (res) {
          disconnect(id)
            .then(() => {
              showSuccessToast(
                t('disconnecting_device'),
                t('press_back_to_disconnect'),
              );
            })
            .catch(() => {
              showInfoToast(t('press_device_reset'));
            });
        }
      });
    };
  }, []);

  const handleBluetoothConnect = () => {
    connect(id)
      .then(res => {
        if (res) {
          setIsBluetoothConnected(true);
        } else {
          showErrorToast(t('device_connection_failed'));
        }
      })
      .catch(e => {
        showErrorToast(t('device_connection_failed'), e.message);
      })
      .finally(() => setIsBluetoothLoading(false));
  };

  const handleBluetoothDisconnect = () => {
    disconnect(id)
      .then(() => {
        setIsBluetoothConnected(false);
      })
      .catch(e => {
        showErrorToast(t('device_shutdown_failed'), e.message);
      })
      .finally(() => setIsBluetoothLoading(false));
  };

  const handleBluetoothTogglePress = () => {
    setIsBluetoothLoading(true);
    if (!isBluetoothConnected) {
      handleBluetoothConnect();
    } else {
      handleBluetoothDisconnect();
    }
  };

  const handleMqttTogglePress = () => {
    setIsMqttLoading(true);
    if (isMqttConnected) {
      mqttDisconnect();
    } else {
      mqttConnect();
    }
  };

  const handleThresholdLimitCheckButtonPress = () => {
    write(id, thresholdLimit.toString())
      .then(() => {
        showSuccessToast(t('threshold_setting_complete'));
      })
      .catch(e => {
        showErrorToast(t('threshold_setting_failed'), e.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottomContainer} className="rounded-t-4xl bg-white">
        <TouchableOpacity className="pt-2" onPress={() => navigation.goBack()}>
          <Icon name="chevrons-down" type="feather" size={30} />
        </TouchableOpacity>
        <View className="pb-2">
          <SwitchWithText
            title={t('bluetooth')}
            subTitle={name}
            switchValue={isBluetoothConnected}
            isLoading={isBluetoothLoading}
            iconName="bluetooth"
            iconType="font-awesome"
            color="#0DA6FBFF"
            disableTurnOff={false}
            onPress={handleBluetoothTogglePress}
          />
          <SwitchWithText
            title="MQTT"
            subTitle={`gbrain/${name}`}
            switchValue={isMqttConnected}
            isLoading={isMqttLoading}
            iconName="signal"
            iconType="font-awesome"
            color="#36BE9EFF"
            disableTurnOff={false}
            onPress={handleMqttTogglePress}
          />
          <ThresholdLimitSlider
            value={thresholdLimit}
            setValue={setThresholdLimit}
            onPress={handleThresholdLimitCheckButtonPress}
          />
        </View>
        <LineChart data={chartData} limit={thresholdLimit} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101945',
  },
  bottomContainer: {
    flex: 1,
  },
});

export default GraphScreen;
