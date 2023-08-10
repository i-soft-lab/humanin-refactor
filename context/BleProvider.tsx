import React, {createContext, ReactNode, useContext} from 'react';
import {BleManager} from 'react-native-ble-plx';

interface BleContextValue {
  bleManager: BleManager;
}

const BleContext = createContext<BleContextValue | undefined>(undefined);

export const useBleContext = () => {
  const context = useContext(BleContext);
  if (!context) {
    throw new Error('useBleContext must be used within a BleProvider');
  }
  return context;
};

interface BleProviderProps {
  children: ReactNode;
}

export const BleProvider: React.FC<BleProviderProps> = ({children}) => {
  const bleManager = new BleManager();

  const value: BleContextValue = {
    bleManager,
  };

  return <BleContext.Provider value={value}>{children}</BleContext.Provider>;
};
