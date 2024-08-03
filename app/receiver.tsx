import { View } from 'react-native';
import { Step, Steps, StepsProvider } from '@/components/ui/step';
import { BluetoothConnectStep } from '@/components/sender/bluetooth-connect-step';
import { useRouter } from 'expo-router';
import { ReceiverConnectStep } from '@/components/receiver/receiver-connect-step';
import { WifiSelectStep } from '@/components/receiver/wifi-select-step';
import useNetworkInfo from '@/hooks/use-network-info';
import { useAtom } from 'jotai/index';
import {
  connectedWifiSSIDAtom,
  selectedWifiSSIDAtom,
} from '@/lib/atoms/receiver-atom';

const ReceiverScreen = () => {
  const router = useRouter();

  const [connectedWifiSSID] = useAtom(connectedWifiSSIDAtom);
  const [selectedWifiSSID] = useAtom(selectedWifiSSIDAtom);

  useNetworkInfo();

  const steps = {
    'Receiver 접속': {
      complete:
        connectedWifiSSID !== process.env.EXPO_PUBLIC_RECEIVER_IP_ADDRESS,
    },
    'wifi 선택': { complete: !!selectedWifiSSID },
    'wifi 비밀번호 입력': { complete: true },
  };

  return (
    <View style={{ flex: 1 }} className="px-6">
      <StepsProvider>
        <Steps steps={steps}>
          <Step
            value="Receiver 접속"
            title="1. Receiver 접속하기"
            description="설명은 github에 json 올려서 받아오자"
            goPrev={() => {
              router.back();
            }}
          >
            <ReceiverConnectStep />
          </Step>
          <Step
            value="wifi 선택"
            title="2. Receiver와 연결할 WIFI 네트워크 선택"
            description="설명설명"
          >
            <WifiSelectStep />
          </Step>
          <Step
            value="wifi 비밀번호 입력"
            title="3. Receiver와 연결할 WIFI 네트워크의 비밀번호 입력"
            description="설명설명"
          >
            <BluetoothConnectStep />
          </Step>
        </Steps>
      </StepsProvider>
    </View>
  );
};

export default ReceiverScreen;
