import React from 'react';
import { Keyboard } from 'react-native';
import { create } from 'zustand';

interface IKeyboardStore {
  isOpen: boolean;
  KeyboardHeight: number;
  show: (height: number) => void;
  hide: () => void;
}

export const useKeyboardStore = create<IKeyboardStore>((set) => ({
  isOpen: false,
  KeyboardHeight: 0,
  show: (height: number) => set((state) => ({ isOpen: true, KeyboardHeight: height })),
  hide: () => set((state) => ({ isOpen: false, KeyboardHeight: 0 })),
}));

const useKeyboard = () => {
  const showKeyboard = useKeyboardStore((state) => state.show);
  const hideKeyboard = useKeyboardStore((state) => state.hide);
  React.useEffect(() => {
    const listenerDeyboardDidShow = Keyboard.addListener('keyboardDidShow', (e) => {
      showKeyboard(e.endCoordinates.height);
    });
    const listenerDeyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      hideKeyboard();
    });
    return () => {
      listenerDeyboardDidShow.remove();
      listenerDeyboardDidHide.remove();
    };
  }, [hideKeyboard, showKeyboard]);
};

export default useKeyboard;
