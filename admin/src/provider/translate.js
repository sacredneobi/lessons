import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./res.json";

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  ns: undefined,
  defaultNS: null,
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
