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
import ThresholdLimitSlider from '../components/thresholdLimitSlider';
import { useLanguage } from '../context/LanguageProvider';

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

  const {language} = useLanguage();

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
          const errMsg = language === 'ko' ? '데이터를 받아올 수 없습니다' : 'cannot get the data.'
          showErrorToast(errMsg, e.message);
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
              if (language === 'ko') {
                showSuccessToast(
                  '디바이스와 연결을 종료합니다.',
                  '뒤로가기를 눌러서 디바이스 연결이 종료되었습니다.',
                );
              } else {
                showSuccessToast(
                  'Disconnecting the device.',
                  'Press back to finish disconnecting the device.',
                );
              }}
            )
            .catch(() => {
              if (language === 'ko') {
                showInfoToast('디바이스 초기화 버튼을 눌러주세요');
              } else {
                showInfoToast('Press the device reset button.');
              }
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
          const errMsg = language === 'ko' ? '디바이스 연결 실패' : 'Device connection failed';
          showErrorToast(errMsg);
        }
      })
      .catch(e => {
        const errMsg = language === 'ko' ? '디바이스 연결 실패' : 'Device connection failed';
        showErrorToast(errMsg, e.message);
      })
      .finally(() => setIsBluetoothLoading(false));
  };

  const handleBluetoothDisconnect = () => {
    disconnect(id)
      .then(() => {
        setIsBluetoothConnected(false);
      })
      .catch(e => {
        const errMsg = language === 'ko' ? '디바이스 연결 종료 실패' : 'Device shutdown failed'
        showErrorToast(errMsg, e.message)
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
        const successMsg = language === 'ko' ? '임계값 설정이 완료되었습니다.' : 'Threshold setting is complete.'
        showSuccessToast(successMsg);
      })
      .catch(e => {
        const errMsg = language === 'ko' ? '임계값 설정에 실패했습니다.' : 'Threshold setting failed.'
        showErrorToast(errMsg, e.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="chevrons-down" type="feather" size={30} />
        </TouchableOpacity>
        <View style={styles.switchButtonContainer}>
          <SwitchWithText
            title={language === 'ko' ? "블루투스" : "Bluetooth"}
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
  backButton: {
    paddingTop: 8,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
  },
  switchButtonContainer: {
    paddingBottom: 8,
  },
});

export default GraphScreen;
