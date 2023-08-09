import {Dialog, Icon, Slider, Text} from '@rneui/themed';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  isVisible: boolean;
  handleVisible: (isVisible: boolean) => void;
};

export default function GraphOptionDialog({isVisible, handleVisible}: Props) {
  const [value, setValue] = useState(0);

  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={() => handleVisible(isVisible)}>
      <Dialog.Title
        title="그래프 렌더링 주기 설정"
        titleStyle={{color: 'black', marginBottom: 24}}
      />
      <View style={styles.sliderContainer}>
        <Text style={styles.iconText}>🐢</Text>
        <Text>{(18 - value) / 10}초마다 렌더링</Text>
        <Text style={styles.iconText}>🐇</Text>
      </View>
      <Slider
        value={value}
        onValueChange={setValue}
        maximumValue={15}
        minimumValue={3}
        step={1}
        allowTouchTrack
        trackStyle={{height: 5, backgroundColor: 'transparent'}}
        thumbStyle={{height: 20, width: 20, backgroundColor: 'transparent'}}
        thumbProps={{
          children: (
            <Icon
              name="play-speed"
              type="material-community"
              size={20}
              reverse
              containerStyle={{bottom: 20, right: 20}}
              color={'rgb(32,153,232)'}
            />
          ),
        }}
      />
      <Dialog.Actions>
        <Dialog.Button
          title="완료"
          onPress={() => console.log('Primary Action Clicked!')}
        />
        <Dialog.Button title="취소" onPress={() => handleVisible(isVisible)} />
      </Dialog.Actions>
    </Dialog>
  );
}
const styles = StyleSheet.create({
  sliderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  iconText: {
    fontSize: 20,
  },
});
