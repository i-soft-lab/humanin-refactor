import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { useBleStore } from '@/lib/store/sender-store';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/button';

const BluetoothConnectStep = () => {
  const {
    scanDeviceList,
    isScan,
    startScan,
    connect,
    stopScan,
    connectStatus: { isLoading },
  } = useBleStore();

  useEffect(() => {
    (async () => {
      if (!isScan) await startScan();
    })();
  }, []);

  const toggleScan = async () => {
    isScan ? stopScan() : await startScan();
  };

  const handleConnect = async (deviceId: string) => {
    await connect(deviceId);
  };

  return (
    <View className="pt-10">
      <View className="bg-slate-100 rounded-lg px-4 py-2 h-56">
        {isLoading ? (
          <View className="flex items-center justify-center h-full">
            <ActivityIndicator size="large" />
            <Text>연결중입니다...</Text>
          </View>
        ) : (
          <>
            <View className="flex flex-row justify-between items-center">
              <Text className="font-semibold">연결 가능한 장치 목록</Text>
              <Pressable
                onPress={toggleScan}
                className="flex flex-row gap-x-1 items-center"
              >
                <Text className="text-neutral-700">
                  {isScan ? '스캔 중지' : '주변 장치 스캔'}
                </Text>
                <Ionicons name="reload-circle" size={24} color="black" />
              </Pressable>
            </View>
            <View className="w-full h-[1px] my-2 bg-slate-200" />
            <FlatList
              data={scanDeviceList}
              keyExtractor={(item) => item.id}
              renderItem={({ item: { name, id } }) => (
                <Button
                  className="flex-row justify-between items-center py-2 mb-1.5 bg-slate-200 active:bg-slate-300"
                  variant="ghost"
                  onPress={() => handleConnect(id)}
                >
                  <Text>{name}</Text>
                  <Text className="text-xs text-neutral-600">{id}</Text>
                </Button>
              )}
            />
          </>
        )}
      </View>
    </View>
  );
};

export { BluetoothConnectStep };
