import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as RNLocalize from 'react-native-localize';

interface LanguageProviderProps {
  children: ReactNode;
}

interface LanguageContextProps {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>('');

  useEffect(() => {
    const currentLanguage = RNLocalize.getLocales()[0]?.languageCode || 'en;';
    setLanguage(currentLanguage);
  }, []);

  const contextValue: LanguageContextProps = {language, setLanguage};

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
