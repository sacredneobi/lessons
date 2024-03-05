import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

const detectionOptions = {
  order: ["localStorage"],
  lookupLocalStorage: "lngAdmin",
  lookupLocalCookie: "lngAdmin",
  lookupSessionStorage: "lngAdmin",
  lookupCookie: "lngAdmin",
};

const backendOptions = {
  loadPath: "/api/locales/{{lng}}",

  customHeaders: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Accept: "*/*",
  },
};

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: localStorage.getItem("lngAdmin") ?? "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    parseMissingKeyHandler: (key) => {
      console.log(
        `%c KEY NOT FOUND -> %c${key} `,
        "color: red",
        "color : #bada55"
      );
      return key;
    },
    backend: backendOptions,
    detection: detectionOptions,
  });

export default i18n;
