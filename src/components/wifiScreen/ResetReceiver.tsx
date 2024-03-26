import IconPulseButton from '../common/IconPulseButton';
import React, {useState} from 'react';
import axios from 'axios';
import {showSuccessToast} from '../Toast';

type ResetReceiverProps = {
  onReset: () => void;
};

const ResetReceiver: React.FC<ResetReceiverProps> = ({onReset}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleResetReceiver = () => {
    axios.get('http://192.168.4.1/api/restart');
    showSuccessToast('리시버 초기화 완료');
    onReset();
  };

  return (
    <IconPulseButton
      text={'버튼을 눌러 기기를 초기화하세요'}
      iconName="autorenew"
      isPulse={isLoading}
      onPress={handleResetReceiver}
    />
  );
};

export default ResetReceiver;
