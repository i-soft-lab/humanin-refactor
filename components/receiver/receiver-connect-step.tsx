import { Platform, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Faq } from '@/components/common/faq';
import { Button } from '@/components/ui/button';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import * as IntentLauncher from 'expo-intent-launcher';

const openWifiSettings = () => {
  if (Platform.OS === 'android') {
    IntentLauncher.startActivityAsync(
      IntentLauncher.ActivityAction.WIFI_SETTINGS
    );
  } else {
    Linking.openURL('App-Prefs:root=WIFI');
  }
};

const ReceiverConnectStep = () => {
  return (
    <View className="flex gap-y-16">
      <View className="flex gap-y-4 pt-10">
        <View className="w-full h-48 bg-neutral-900">
          <Text className="p-4 text-center text-white">이곳에 영상 넣기</Text>
        </View>
        <Button
          variant="outline"
          size="lg"
          className="flex flex-row items-center gap-x-2"
          onPress={openWifiSettings}
        >
          <Text>와이파이 설정 페이지로 이동</Text>
          <Ionicons name="open-outline" size={20} color="black" />
        </Button>
      </View>
      <Faq screen="R01" />
    </View>
  );
};

export { ReceiverConnectStep };
