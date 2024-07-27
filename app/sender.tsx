import { View } from 'react-native';
import { SenderSettingStep } from '@/components/sender/sender-setting-step';
import { Step, Steps, StepsProvider } from '@/components/ui/step';
import { useRouter } from 'expo-router';
import { BluetoothConnectStep } from '@/components/sender/bluetooth-connect-step';
import { useBle } from '@/hooks/useBle';

const SenderScreen = () => {
  const router = useRouter();
  const {
    connectStatus: { device },
  } = useBle();

  const steps = {
    '센더 설정': { complete: true },
    '블루투스 연결': { complete: !device },
  };

  console.log(device);

  return (
    <View style={{ flex: 1 }} className="px-6">
      <StepsProvider>
        <Steps steps={steps}>
          <Step
            value="센더 설정"
            title="1. Sender 세팅하기"
            description="아래 영상을 참고해서 sender를 연결해주세요."
            goPrev={() => {
              router.back();
            }}
          >
            <SenderSettingStep />
          </Step>
          <Step
            value="블루투스 연결"
            title="2. Sender 블루투스 연결하기"
            description="블루투스 목록에서 sender의 시리얼 번호랑 동일한 장치를 선택해서 연결해주세요."
          >
            <BluetoothConnectStep />
          </Step>
        </Steps>
      </StepsProvider>
    </View>
  );
};

export default SenderScreen;
