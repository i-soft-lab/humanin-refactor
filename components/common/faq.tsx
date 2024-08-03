import React from 'react';
import { View } from 'react-native';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Text } from '@/components/ui/text';

const faq = [
  {
    key: 'q1',
    question: 'FAQ 서버에서 받아오기',
    answer: '임시 텍스트',
  },
  {
    key: 'q2',
    question: 'FAQ 서버에서 받아오기2',
    answer: '센서 교체는 0000-0000으로 문의해주세요',
  },
];

const Faq = () => {
  return (
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
  );
};

export { Faq };
