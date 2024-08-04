import { LineChart } from 'react-native-charts-wrapper';
import { processColor, View } from 'react-native';
import { useBle } from '@/hooks/useBle';
import { Text } from '@/components/ui/text';
import { useEffect } from 'react';
import { useMqtt } from '@/hooks/use-mqtt';

const Chart: React.FC = () => {
  const { publish } = useMqtt();

  const {
    readSenderData,
    senderData,
    connectStatus: { device },
  } = useBle();

  useEffect(() => {
    if (!senderData.length) {
      readSenderData((flagMessage) => {
        publish(flagMessage);
      });
    }
  }, [device]);

  if (!device)
    return (
      <View className="flex justify-center items-center h-full">
        <Text>Sender를 연결하면 차트가 표시됩니다.</Text>
      </View>
    );

  return (
    <View style={{ flex: 1 }} className="p-2">
      <LineChart
        style={{ flex: 1 }}
        highlightPerTapEnabled={false}
        doubleTapToZoomEnabled={false}
        touchEnabled={false}
        chartDescription={{
          text: '',
        }}
        data={{
          dataSets: [
            {
              label: 'sender',
              values: senderData,
              config: {
                mode: 'CUBIC_BEZIER',
                drawValues: false,
                lineWidth: 0.8,
                color: processColor('#FFAE2A'),
                drawCircles: false,
                drawCubicIntensity: 0,
              },
            },
          ],
        }}
        xAxis={{
          enabled: true,
          position: 'BOTTOM',
          drawAxisLine: true,
          drawGridLines: false,
          drawLabels: false,
          textSize: 10,
          textColor: processColor('#000000'),
          axisLineColor: processColor('#000000'),
          axisLineWidth: 1,
          axisMaximum: 500,
        }}
        yAxis={{
          left: {
            enabled: true,
            drawAxisLine: true,
            drawGridLines: true,
            drawLabels: true,
            textSize: 10,
            textColor: processColor('#000000'),
            axisLineColor: processColor('#000000'),
            axisLineWidth: 1,
            axisMinimum: 80,
            axisMaximum: 200,
          },
          right: {
            enabled: true,
            textSize: 10,
            axisLineColor: processColor('#000000'),
            axisLineWidth: 1,
            axisMinimum: 80,
            axisMaximum: 200,
          },
        }}
        legend={{
          enabled: true,
          textSize: 16,
        }}
      />
    </View>
  );
};

export { Chart };

type TChartProps = {
  publish: (message: string) => void;
};
