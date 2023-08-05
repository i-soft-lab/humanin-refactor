import React from 'react';
import {processColor, StyleSheet, View} from 'react-native';
import {LineChart as ImportLineChart} from 'react-native-charts-wrapper';

const LineChart = () => {
  return (
    <View style={styles.container}>
      <ImportLineChart
        style={styles.chart}
        data={{
          dataSets: [
            {
              label: 'demo',
              values: [{y: 1}, {y: 2}, {y: 1}, {y: 3}, {y: 5}, {y: 10}],
              config: {
                mode: 'CUBIC_BEZIER',
                drawValues: false,
                lineWidth: 1,
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
          axisMaximum: 200,
        }}
        yAxis={{
          left: {
            enabled: true,
            drawAxisLine: true,
            drawGridLines: false,
            drawLabels: true,
            textSize: 10,
            textColor: processColor('gray'),
            axisMinimum: 0,
            axisMaximum: 250,
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
  },
  chart: {
    flex: 1,
    margin: 20,
  },
});

export default LineChart;
