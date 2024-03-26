import {cssInterop} from 'nativewind';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PropsWithChildren} from 'react';

const ScreenLayout: React.FC<PropsWithChildren> = ({children}) => {
  // @ts-expect-error
  const StyledSafeAreaView = cssInterop(SafeAreaView, {className: 'style'});

  return (
    <StyledSafeAreaView className="flex gap-y-2 h-screen py-4 bg-blue-950">
      {children}
    </StyledSafeAreaView>
  );
};

export default ScreenLayout;
