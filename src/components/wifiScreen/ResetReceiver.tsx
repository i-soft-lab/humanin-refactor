import IconPulseButton from '../common/IconPulseButton';
import React, {useState} from 'react';
import axios from 'axios';
import {showErrorToast, showSuccessToast} from '../Toast';

const ResetReceiver = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const iconName = isError ? 'priority-high' : 'autorenew';

  const handleResetReceiver = async () => {
    setIsLoading(true);
    await axios.get('http://192.168.4.1/api/ssid').catch(_ => {
      setIsError(true);
      showErrorToast('리시버 초기화 실패');
    });
    showSuccessToast('리시버 초기화 완료');
    setIsLoading(false);
  };

  return (
    <IconPulseButton
      text={'버튼을 눌러 기기를 초기화하세요'}
      iconName={iconName}
      isPulse={isLoading}
      onPress={handleResetReceiver}
    />
  );
};

export default ResetReceiver;
