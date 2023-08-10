import {StyleSheet} from 'react-native';
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
import SwitchWithText from '../components/SwitchWithText';
import {Button, Icon} from '@rneui/themed';
import GraphOptionDialog from '../components/GraphOptionDialog';
import useBle from '../hooks/useBle';
import {useBleContext} from '../context/BleProvider';

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
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  let renderSpeed = 2;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          type="clear"
          onPress={() => handleDialogVisibility(isDialogVisible)}>
          <Icon name="settings" color="#0389E3" />
        </Button>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (isConnected) {
      findServicesAndCharacteristics(id).then(() => {
        write(id, 'plot')
          .then(() => {
            subscribeCharacteristic(id, dataArr => {
              handleChartData(dataArr, renderSpeed);
            });
          })
          .catch(e => {
            showErrorToast('데이터를 받아올 수 없습니다', e.message);
          });
      });
    }

    // 블루투스 연결 해제 리스너 등록
    onDisconnect(id, () => {
      setIsConnected(false);
    });
  }, [isConnected]);

  useEffect(() => {
    isConnectedDevice(id).then((res: boolean) => setIsConnected(res));
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
          setIsConnected(true);
        } else {
          showErrorToast('디바이스 연결 실패');
        }
      })
      .catch(e => showErrorToast('디바이스 연결 실패', e.message))
      .finally(() => setIsLoading(false));
  };

  const handleDisconnect = () => {
    disconnect(id)
      .then(() => {
        setIsConnected(false);
        showSuccessToast('디바이스와 연결을 종료합니다.');
      })
      .catch(e => showErrorToast('디바이스 연결 종료 실패', e.message))
      .finally(() => setIsLoading(false));
  };

  const handleConnectTogglePress = () => {
    setIsLoading(true);
    if (!isConnected) {
      handleReconnect();
    } else {
      handleDisconnect();
    }
  };

  const handleDialogVisibility = (isVisible: boolean) => {
    if (isVisible) {
      setIsDialogVisible(false);
      handleReconnect();
    } else {
      setIsDialogVisible(true);
      handleDisconnect();
    }
  };

  const handleCompleteSetting = (speed: number) => {
    setIsDialogVisible(false);
    handleReconnect();
    renderSpeed = speed;
  };

  return (
    <SafeAreaView style={styles.container}>
      <SwitchWithText
        title="연결된 기기"
        subTitle={name}
        switchValue={isConnected}
        isLoading={isLoading}
        onPress={handleConnectTogglePress}
      />
      <LineChart data={chartData} />
      <GraphOptionDialog
        isVisible={isDialogVisible}
        handleVisible={isVisible => handleDialogVisibility(isVisible)}
        handleComplete={speed => handleCompleteSetting(speed)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 16,
  },
  chartContainer: {
    height: '60%',
    width: '100%',
  },
});

export default GraphScreen;
