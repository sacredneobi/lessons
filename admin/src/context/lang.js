import { createContext, useContext } from "react";

class LangStore {
  constructor(langBase) {
    this._langBase = langBase;
  }

  get lang() {
    return this._langBase;
  }

  set lang(value) {
    this._langBase = value;
  }
}

const context = createContext(null);

const useDef = () => useContext(context);

const Context = (props) => {
  const { lang, children, ...other } = props;

  return (
    <context.Provider
      value={new LangStore(lang)}
      name="LANG CONTEXT"
      children={children}
      {...other}
    />
  );
};

export { Context as LangContext, useDef as useLang };
