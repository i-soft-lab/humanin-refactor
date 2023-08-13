import {Avatar, Icon, Slider} from '@rneui/themed';
import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
};

const ThresholdLimitSlider: React.FC<Props> = ({value, setValue}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Slider
          value={value}
          onValueChange={setValue}
          maximumValue={10}
          minimumValue={0}
          step={1}
          allowTouchTrack
          trackStyle={{height: 5, backgroundColor: 'transparent'}}
          thumbStyle={{height: 20, width: 20, backgroundColor: 'transparent'}}
          thumbProps={{
            children: (
              <Icon
                name="heartbeat"
                type="font-awesome"
                size={20}
                reverse
                containerStyle={{bottom: 20, right: 20}}
                color={'#FF497A'}
              />
            ),
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Avatar
          size={40}
          icon={{
            name: 'save',
            type: 'material',
            color: 'white',
          }}
          containerStyle={{
            backgroundColor: '#FFAE2A',
            borderRadius: 16,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 16,
    marginVertical: 12,
    marginHorizontal: 24,
  },
  sliderContainer: {
    flex: 4,
    marginRight: 8,
  },
  buttonContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
});

export default ThresholdLimitSlider;
