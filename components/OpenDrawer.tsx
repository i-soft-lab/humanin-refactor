import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, Text, View} from 'react-native';
import {State} from 'react-native-gesture-handler';

type Props = {
  onPress: () => void;
  isOpen: boolean;
  onChangeOpenValue: () => void;
};

const OpenDrawer: React.FC<Props> = ({onPress, isOpen, onChangeOpenValue}) => {
  const translateY = useRef(new Animated.Value(0)).current;

  const handleGestureEvent = (event: any) => {
    if (
      event.nativeEvent.state === State.END &&
      event.nativeEvent.translateY < -100
    ) {
      console.log('Test', 'gesture recongnize');
      onChangeOpenValue();
    }
  };

  useEffect(() => {
    console.log('Test', {isOpen});
    if (!isOpen) {
      const upAni = Animated.timing(translateY, {
        toValue: -10,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.linear,
      });

      const downAni = Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.linear,
      });

      const fullAni = Animated.sequence([upAni, downAni]);

      const baseAni = Animated.loop(fullAni);
      baseAni.start();
      return () => baseAni.stop();
    }
  }, [isOpen]);

  return (
    <View style={styles.animateContainer} onTouchEnd={onPress}>
      <Animated.View style={[styles.button, {transform: [{translateY}]}]}>
        <Text style={styles.text}></Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  animateContainer: {
    width: '20%',
    height: 10,
  },
  button: {
    width: '100%',
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    backgroundColor: 'gray',
    width: '100%',
    height: 10,
  },
});

export default OpenDrawer;
