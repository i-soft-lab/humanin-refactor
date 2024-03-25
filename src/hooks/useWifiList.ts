import {useEffect, useState} from 'react';
import WifiManager from 'react-native-wifi-reborn';

const useWifiList = () => {
  const [wifiList, setWifiList] = useState<Array<WifiManager.WifiEntry>>();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    WifiManager.loadWifiList()
      .then(list => {
        setWifiList(list);
      })
      .catch(_ => {
        setIsError(true);
      });
  }, []);

  return {wifiList, isError};
};

export default useWifiList;
