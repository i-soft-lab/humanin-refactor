import {Dialog, Icon, Slider, Text} from '@rneui/themed';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';

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

  const {t} = useTranslation();

  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={() => handleVisible(isVisible)}>
      <Dialog.Title
        title={t('graph_rendering_period_setting')}
        titleStyle={{color: 'black', marginBottom: 24}}
      />
      <View style={styles.sliderContainer}>
        <Text style={styles.iconText}>🐢</Text>
        <Text>{t('rendering_every_seconds', {value: (16 - value) / 10})}</Text>
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
          title={t('done')}
          onPress={() => handleComplete(18 - value)}
        />
        <Dialog.Button
          title={t('cancel')}
          onPress={() => handleVisible(!isVisible)}
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
