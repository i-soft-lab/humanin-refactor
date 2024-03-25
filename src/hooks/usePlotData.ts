import {useEffect, useState} from 'react';
import {Characteristic} from 'react-native-ble-plx';
import base64 from 'react-native-base64';

export default function usePlotData() {
  const [chartData, setChartData] = useState<{y: number}[]>([{y: 135}]);
  let receiveData: {y: number}[] = [];

  useEffect(() => {
    if (chartData.length > 450) {
      setChartData([]);
    }
  }, [chartData]);

  const handleChartData = (dataArr: Characteristic | null) => {
    const [dataStr, flagStr] = base64.decode(dataArr?.value!).split(',');
    const data = Number.parseInt(dataStr);
    const flag = flagStr === '0' || flagStr === '1';
    receiveData.push({y: data});
    if (receiveData.length >= 1) {
      setChartData(prevChartData => [...prevChartData, ...receiveData]);
      receiveData = [];
    }
    return {flag, flagStr};
  };

  return {
    chartData,
    handleChartData,
  };
}
