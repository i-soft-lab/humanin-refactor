import {Dialog, Icon, Slider, Text} from '@rneui/themed';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useLanguage} from '../context/LanguageProvider';

type Props = {
  isVisible: boolean;
  handleVisible: (isVisible: boolean) => void;
  handleComplete: (speed: number) => void;
};

export default function GraphOptionDialog({
  isVisible,
  handleVisible,
  handleComplete,
}: Props) {
  const [value, setValue] = useState(5);

  const {language} = useLanguage();

  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={() => handleVisible(isVisible)}>
      <Dialog.Title
        title={
          language === 'ko'
            ? '그래프 렌더링 주기 설정'
            : 'Setting the graph rendering period'
        }
        titleStyle={{color: 'black', marginBottom: 24}}
      />
      <View style={styles.sliderContainer}>
        <Text style={styles.iconText}>🐢</Text>
        <Text>
          {language === 'ko'
            ? `${(16 - value) / 10}초마다 렌더링`
            : `Rendering every ${(16 - value) / 10} seconds`}
        </Text>
        <Text style={styles.iconText}>🐇</Text>
      </View>
      <Slider
        value={value}
        onValueChange={setValue}
        maximumValue={15}
        minimumValue={1}
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
          title={language === 'ko' ? '완료' : 'Done'}
          onPress={() => handleComplete(18 - value)}
        />
        <Dialog.Button
          title={language === 'ko' ? '취소' : 'Cancel'}
          onPress={() => handleVisible(isVisible)}
        />
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
