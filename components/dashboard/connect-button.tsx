import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Link } from 'expo-router';

const ConnectButton = () => {
  return (
    <View className="absolute right-6 bottom-6">
      <Collapsible className="flex flex-col-reverse items-end">
        <CollapsibleTrigger asChild>
          <Button
            size="icon"
            className={cn('h-14 w-14 bg-blue-500 rounded-full')}
          >
            <Ionicons name="link" size={28} color="white" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex gap-y-2 my-2">
          <Link href="/sender" asChild>
            <Button
              size="lg"
              className={cn('flex flex-row gap-x-2', 'bg-blue-300 rounded-2xl')}
            >
              <Text className="font-semibold text-black">Sender 연결하기</Text>
            </Button>
          </Link>
          <Button
            size="lg"
            className={cn(
              'flex flex-row gap-x-2',
              'bg-emerald-400 rounded-2xl'
            )}
          >
            <Text className="font-semibold text-black">Receiver 연결하기</Text>
          </Button>
        </CollapsibleContent>
      </Collapsible>
    </View>
  );
};

export { ConnectButton };
