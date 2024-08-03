import { useEffect, useState } from 'react';
import { NetworkInfo } from 'react-native-network-info';
import { useAtom } from 'jotai';
import NetInfo from '@react-native-community/netinfo';
import { connectedWifiSSIDAtom } from '@/lib/atoms/receiver-atom';

const useNetworkInfo = () => {
  const [isError, setIsError] = useState(false);
  const [, setConnectedWifiSSID] = useAtom(connectedWifiSSIDAtom);

  const fetchNetworkInfo = async () => {
    try {
      const ipAddress = await NetworkInfo.getIPV4Address();
      setConnectedWifiSSID(ipAddress);
    } catch {
      setIsError(true);
    }
  };

  useEffect(() => {
    void fetchNetworkInfo();

    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        void fetchNetworkInfo();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { isError };
};

export default useNetworkInfo;
