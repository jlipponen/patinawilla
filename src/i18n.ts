import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import fi from './locales/fi/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fi: { translation: fi },
    },
    lng: 'fi',
    fallbackLng: 'fi',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
