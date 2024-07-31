import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { useBle } from '@/hooks/useBle';
import React from 'react';
import { ConnectButton } from '@/components/dashboard/connect-button';
import { Chart } from '@/components/dashboard/chart';

const DashboardScreen = () => {
  const {
    connectStatus: { device },
  } = useBle();

  return (
    <View style={{ flex: 1 }} className="p-4">
      <ConnectButton />
      <View className="flex flex-row gap-x-2 mb-2">
        <View className="p-4 rounded-xl bg-slate-100 flex-1">
          <View className="flex flex-row items-center gap-x-2 mb-2">
            <View className="p-1 rounded-full bg-blue-500">
              <Ionicons name="bluetooth" size={16} color="white" />
            </View>
            <Text className="text-neutral-600 text-sm">Sender</Text>
          </View>
          <Text className="font-semibold text-2xl">
            {device ? device?.name : '연결 안됨'}
          </Text>
        </View>
        <View className="p-4 rounded-xl bg-slate-100 flex-1">
          <View className="flex flex-row items-center gap-x-2 mb-2">
            <View className="p-1 rounded-full bg-emerald-500">
              <Ionicons name="wifi" size={16} color="white" />
            </View>
            <Text className="text-neutral-600 text-sm">Receiver</Text>
          </View>
          <Text className="font-semibold text-2xl">
            {device ? device?.name : '연결 안됨'}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }} className="bg-slate-100 rounded-xl py-4">
        <Text className="font-semibold text-xl px-4">Sender 차트</Text>
        <Chart />
      </View>
    </View>
  );
};

export default DashboardScreen;
