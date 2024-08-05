import React from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Text } from '@/components/ui/text';
import { useGetFaqQuery } from '@/lib/api/faq/queries';
import { TScreen } from '@/lib/api/faq/client';

const Faq: React.FC<TProps> = (props) => {
  const { screen } = props;

  const { data: faq, isLoading, isError } = useGetFaqQuery(screen);

  return (
    <View>
      <Text className="font-semibold text-xl">FAQ</Text>
      <ScrollView className="h-64">
        {isLoading ? (
          <ActivityIndicator />
        ) : isError ? (
          <Text>FAQ 로드 실패</Text>
        ) : !faq ? (
          <Text>faq가 존재하지 않습니다.</Text>
        ) : (
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
                  <Text className="text-neutral-500 break-keep whitespace-pre-wrap">
                    {answer}
                  </Text>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </ScrollView>
    </View>
  );
};

export { Faq };

type TProps = {
  screen: TScreen;
};
