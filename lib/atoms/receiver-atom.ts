import { atom } from 'jotai';

const selectedWifiSSIDAtom = atom<string | null>(null);
const connectedWifiSSIDAtom = atom<string | null>(null);
const connectedWifiIpAddressAtom = atom<string | null>(null);

export {
  selectedWifiSSIDAtom,
  connectedWifiSSIDAtom,
  connectedWifiIpAddressAtom,
};
