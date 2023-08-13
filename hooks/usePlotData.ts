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
    // const [data, flag] = dataArr;
    const data = Number.parseInt(base64.decode(dataArr?.value!)) + 150;
    const flag = data > 168;
    receiveData.push({y: data});
    if (receiveData.length >= 1) {
      setChartData(prevChartData => [...prevChartData, ...receiveData]);
      receiveData = [];
    }
    return flag;
  };

  return {
    chartData,
    handleChartData,
  };
}
