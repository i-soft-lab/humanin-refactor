import {StyleSheet, View} from 'react-native';
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
  // const {sendMqttMessage} = useMqtt();
  const [isBluetoothConnected, setIsBluetoothConnected] = useState(false);
  const [isBluetoothLoading, setIsBluetoothLoading] = useState(false);
  const [isMqttConnected, setIsMqttConnected] = useState(true);
  const [isMqttLoading, setIsMqttLoading] = useState(false);

  useEffect(() => {
    if (isBluetoothConnected) {
      findServicesAndCharacteristics(id).then(() => {
        write(id, 'plot')
          .then(() => {
            subscribeCharacteristic(id, dataArr => {
              handleChartData(dataArr);
            });
          })
          .catch(e => {
            showErrorToast('데이터를 받아올 수 없습니다', e.message);
          });
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
            .then(() =>
              showSuccessToast(
                '디바이스와 연결을 종료합니다.',
                '뒤로가기를 눌러서 디바이스 연결이 종료되었습니다.',
              ),
            )
            .catch(() => showInfoToast('디바이스 초기화 버튼을 눌러주세요'));
        }
      });
    };
  }, []);

  const handleReconnect = () => {
    connect(id)
      .then(res => {
        if (res) {
          showSuccessToast('디바이스에 다시 연결되었습니다.');
          setIsBluetoothConnected(true);
        } else {
          showErrorToast('디바이스 연결 실패');
        }
      })
      .catch(e => showErrorToast('디바이스 연결 실패', e.message))
      .finally(() => setIsBluetoothLoading(false));
  };

  const handleDisconnect = () => {
    disconnect(id)
      .then(() => {
        setIsBluetoothConnected(false);
        showSuccessToast('디바이스와 연결을 종료합니다.');
      })
      .catch(e => showErrorToast('디바이스 연결 종료 실패', e.message))
      .finally(() => setIsBluetoothLoading(false));
  };

  const handleBluetoothTogglePress = () => {
    setIsBluetoothLoading(true);
    if (!isBluetoothConnected) {
      handleReconnect();
    } else {
      handleDisconnect();
    }
  };

  const handleMqttTogglePress = () => {
    setIsMqttLoading(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottomContainer}>
        <SwitchWithText
          title="블루투스"
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
          color="#50D4B7FF"
          disableTurnOff={true}
          onPress={handleMqttTogglePress}
        />
        <LineChart data={chartData} />
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
    backgroundColor: '#FFF',
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    paddingTop: 16,
  },
});

export default GraphScreen;
