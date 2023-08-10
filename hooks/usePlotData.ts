import {useEffect, useState} from 'react';
import {Characteristic} from 'react-native-ble-plx';

export default function usePlotData() {
  const [chartData, setChartData] = useState<{y: number}[]>([{y: 135}]);
  let receiveData: {y: number}[] = [];

  useEffect(() => {
    if (chartData.length > 450) {
      setChartData([]);
    }
  }, [chartData]);

  const handleChartData = (dataArr: Characteristic | null, speed: number) => {
    const [data, flag] = dataArr;
    receiveData.push({y: data});
    if (receiveData.length >= speed) {
      setChartData(prevChartData => [...prevChartData, ...receiveData]);
      receiveData = [];
    }
  };

  return {
    chartData,
    handleChartData,
  };
}
