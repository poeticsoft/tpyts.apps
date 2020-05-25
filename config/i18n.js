import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init({
    ns: [
      'common'
    ],
    debug: false,
    uselangs: ['es', 'en'],
    lng: 'es',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: `${window.playmotiv_cloud_editordata.pluginurl}locales/{{lng}}/{{ns}}.json`
    },
    react: {
      useSuspense: false
    }
  });

export default i18n