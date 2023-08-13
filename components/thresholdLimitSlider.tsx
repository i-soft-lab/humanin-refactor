import {Avatar, Icon, Slider} from '@rneui/themed';
import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

type Props = {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  onPress: () => void;
};

const ThresholdLimitSlider: React.FC<Props> = ({value, setValue, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Slider
          value={value}
          onValueChange={setValue}
          maximumValue={200}
          minimumValue={140}
          step={1}
          allowTouchTrack
          trackStyle={{height: 5, backgroundColor: 'transparent'}}
          thumbStyle={{height: 20, width: 20, backgroundColor: 'transparent'}}
          thumbProps={{
            children: (
              <Icon
                name="electric-bolt"
                size={20}
                reverse
                containerStyle={{bottom: 20, right: 20}}
                color={'#FFAE2A'}
              />
            ),
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPress}>
          <Avatar
            size={40}
            icon={{
              name: 'check',
              type: 'font-awesome',
              color: 'white',
            }}
            containerStyle={{
              backgroundColor: '#7A77D3',
              borderRadius: 16,
            }}
          />
        </TouchableOpacity>
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
    columnGap: 12,
    marginVertical: 12,
    marginLeft: 28,
    marginRight: 20,
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
