import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faq = [
  {
    key: 'q1',
    question: 'LED에 불이 들어오지 않아요',
    answer: '장치에 충전기가 연결되어있는지 확인해주세요.',
  },
  {
    key: 'q2',
    question: '센서가 잘 붙지 않아요',
    answer: '센서 교체는 0000-0000으로 문의해주세요',
  },
];

const SenderSettingStep = () => {
  return (
    <View className="flex gap-y-16">
      <View className="my-10 w-full h-48 bg-neutral-900">
        <Text className="p-4 text-center text-white">이곳에 영상 넣기</Text>
      </View>
      <View>
        <Text className="font-semibold text-xl">FAQ</Text>
        <Accordion
          type="single"
          defaultValue="item-1"
          className="w-full max-w-sm native:max-w-md"
        >
          {faq.map(({ key, question, answer }) => (
            <AccordionItem key={key} value={key}>
              <AccordionTrigger>
                <Text className="text-neutral-900">{question}</Text>
              </AccordionTrigger>
              <AccordionContent>
                <Text className="text-neutral-500">{answer}</Text>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </View>
    </View>
  );
};
export { SenderSettingStep };
