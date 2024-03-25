/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import 'intl-pluralrules';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: require('./src/assets/locales/en.json'),
      },
      ko: {
        translation: require('./src/assets/locales/ko.json'),
      },
    },
    lng: 'ko',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  })
  .then(_ => AppRegistry.registerComponent(appName, () => App));
