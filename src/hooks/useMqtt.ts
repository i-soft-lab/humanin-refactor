import MQTT, {IMqttClient} from 'sp-react-native-mqtt';
import {useEffect, useState} from 'react';
import {showErrorToast} from '../components/Toast';

const useMqtt = (topic: string) => {
  const [connectedClient, setConnectedClient] = useState<IMqttClient>();
  const [isMqttConnected, setIsMqttConnected] = useState(true);
  const [isMqttLoading, setIsMqttLoading] = useState(false);

  useEffect(() => {
    // @ts-ignore
    MQTT.createClient({
      host: process.env.MQTT_HOST,
      port: 1883,
      protocol: 'mqtt',
      clientId: topic,
      auth: true,
      user: process.env.MQTT_USER,
      pass: process.env.MQTT_PASSWORD,
    })
      .then(client => {
        client.on('closed', function () {
          setIsMqttConnected(false);
          setIsMqttLoading(false);
        });

        client.on('error', function (msg) {
          showErrorToast('MQTT Error', msg);
          setIsMqttConnected(false);
          setIsMqttLoading(false);
        });

        client.on('connect', function () {
          setIsMqttConnected(true);
          setIsMqttLoading(false);
        });
        setConnectedClient(client);
        client.connect();
      })
      .catch(err => {
        showErrorToast('MQTT Error', err.message);
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

  const sendMessage = ({flag, flagStr}: {flag: boolean; flagStr: string}) => {
    if (flag) {
      console.log(flag, flagStr);
      connectedClient?.publish(`gbrain/${topic}`, flagStr, 0, false);
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
