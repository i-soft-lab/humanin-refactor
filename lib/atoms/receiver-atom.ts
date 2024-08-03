import { atom } from 'jotai';

const selectedWifiSSIDAtom = atom<string | null>(null);
const connectedWifiSSIDAtom = atom<string | null>(null);
const connectedWifiIpAddressAtom = atom<string | null>(null);
const isReceiverNetworkSetFinishedAtom = atom<boolean>(false);

export {
  selectedWifiSSIDAtom,
  connectedWifiSSIDAtom,
  connectedWifiIpAddressAtom,
  isReceiverNetworkSetFinishedAtom,
};
