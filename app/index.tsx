import {View} from 'react-native';
import {Button} from '@/components/ui/button';
import {Text} from '@/components/ui/text';
import {Link} from 'expo-router';

const DashboardScreen = () => {
  return (
    <View className="p-4">
      <View className="flex flex-row gap-x-2">
        <Link href="/sender" asChild>
          <Button variant="outline" size="lg">
            <Text>Sender 연결</Text>
          </Button>
        </Link>
        <Button variant="outline" size="lg">
          <Text>Receiver 연결</Text>
        </Button>
      </View>
    </View>
  );
};

export default DashboardScreen;
