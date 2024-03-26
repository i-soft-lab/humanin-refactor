import {cssInterop} from 'nativewind';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PropsWithChildren} from 'react';

// @ts-expect-error
const StyledSafeAreaView = cssInterop(SafeAreaView, {className: 'style'});

const ScreenLayout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <StyledSafeAreaView className="flex gap-y-2 h-screen py-4 bg-blue-950">
      {children}
    </StyledSafeAreaView>
  );
};

export default ScreenLayout;
