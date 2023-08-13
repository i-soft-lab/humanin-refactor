import React from 'react';
import {processColor, StyleSheet, View} from 'react-native';
import {LineChart as ImportLineChart} from 'react-native-charts-wrapper';

type Props = {
  data: {y: number}[];
};

const LineChart: React.FC<Props> = ({data}) => {
  return (
    <View style={styles.container}>
      <ImportLineChart
        style={styles.chart}
        highlightPerTapEnabled={false}
        doubleTapToZoomEnabled={false}
        touchEnabled={false}
        chartDescription={{
          text: 'data from sender',
        }}
        data={{
          dataSets: [
            {
              label: 'data',
              values: data,
              config: {
                mode: 'CUBIC_BEZIER',
                drawValues: false,
                lineWidth: 0.8,
                color: processColor('#FF5082'),
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
          axisLineColor: processColor('#000'),
          axisMaximum: 500,
        }}
        yAxis={{
          left: {
            enabled: true,
            drawAxisLine: true,
            drawGridLines: false,
            drawLabels: true,
            textSize: 10,
            textColor: processColor('#1f1f1f'),
            axisLineColor: processColor('#000'),
            axisMinimum: 80,
            axisMaximum: 200,
          },
          right: {
            enabled: false,
          },
        }}
        legend={{
          enabled: false,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8FB',
    padding: 8,
  },
  chart: {
    flex: 1,
  },
});

export default LineChart;
