import {Client, Message} from 'paho-mqtt';
import {useEffect} from 'react';

export default function useMqtt() {
  const client = new Client('broker.mqtt-dashboard.com', 1883, 'gbrain-1234');

  useEffect(() => {
    if (client) {
      client.connect({
        onSuccess: () => {
          console.log('connected');
        },
        onFailure: e => {
          console.log(e);
        },
      });
    }
  }, []);

  const sendMqttMessage = (message: string) => {
    if (client) {
      const messageObj = new Message(message);
      messageObj.destinationName = `gbrain`;
      client.send(messageObj);
    }
  };

  return {
    sendMqttMessage,
  };
}
