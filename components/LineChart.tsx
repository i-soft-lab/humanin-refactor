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
                lineWidth: 1.4,
                drawCircles: false,
                drawCubicIntensity: 0.2,
              },
            },
          ],
        }}
        xAxis={{
          enabled: true,
          position: 'BOTTOM',
          drawAxisLine: true,
          drawGridLines: false,
          drawLabels: true,
          textSize: 10,
          textColor: processColor('gray'),
          axisMaximum: 450,
        }}
        yAxis={{
          left: {
            enabled: true,
            drawAxisLine: true,
            drawGridLines: false,
            drawLabels: true,
            textSize: 10,
            textColor: processColor('gray'),
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
    backgroundColor: '#F5FCFF',
    marginBottom: 8,
  },
  chart: {
    flex: 1,
  },
});

export default LineChart;
