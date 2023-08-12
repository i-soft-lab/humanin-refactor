import MQTT, {IMqttClient} from 'sp-react-native-mqtt';
import {useEffect, useState} from 'react';
import {showErrorToast} from '../components/Toast';

const useMqtt = (topic: string) => {
  const [connectedClient, setConnectedClient] = useState<IMqttClient>();
  const [isMqttConnected, setIsMqttConnected] = useState(false);
  const [isMqttLoading, setIsMqttLoading] = useState(false);

  useEffect(() => {
    // @ts-ignore
    MQTT.createClient({
      host: 'broker.mqtt-dashboard.com',
      port: 1883,
      protocol: 'mqtt',
      clientId: 'gbrain717',
    })
      .then(client => {
        client.on('closed', function () {
          setIsMqttConnected(false);
          setIsMqttLoading(false);
        });

        client.on('error', function (msg) {
          showErrorToast('MQTT 오류 발생', msg);
        });

        client.on('connect', function () {
          setIsMqttConnected(true);
          setIsMqttLoading(false);
        });
        setConnectedClient(client);
        client.connect();
      })
      .catch(err => {
        showErrorToast('MQTT 오류 발생', err.message);
      });
  }, []);

  useEffect(() => {
    return () => {
      if (connectedClient) {
        MQTT.removeClient(connectedClient);
      }
    };
  }, [connectedClient]);

  const mqttConnect = () => {
    connectedClient?.connect();
  };

  const mqttDisconnect = () => {
    connectedClient?.disconnect();
  };

  const sendMessage = (flag: boolean) => {
    // connectedClient?.publish(`gbrain/${topic}`, message, 0, false);
    if (flag) {
      connectedClient?.publish(`gbrain`, 'true', 0, false);
    }
  };

  return {
    isMqttConnected,
    isMqttLoading,
    setIsMqttLoading,
    mqttConnect,
    mqttDisconnect,
    sendMessage,
  };
};

export default useMqtt;
