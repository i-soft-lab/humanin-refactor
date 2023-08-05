import {StyleSheet} from 'react-native';
import LineChart from '../components/LineChart';
import {SafeAreaView} from 'react-native-safe-area-context';

const GraphScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LineChart />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

export default GraphScreen;
