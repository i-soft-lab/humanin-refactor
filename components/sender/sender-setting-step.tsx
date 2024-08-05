import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Faq } from '@/components/common/faq';

const SenderSettingStep = () => {
  return (
    <View className="flex gap-y-16">
      <View className="my-10 w-full h-48 bg-neutral-900">
        <Text className="p-4 text-center text-white">이곳에 영상 넣기</Text>
      </View>
      <Faq screen="S01" />
    </View>
  );
};
export { SenderSettingStep };
