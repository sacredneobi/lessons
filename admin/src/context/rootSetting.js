import { dispatch } from "@utils";
import { createContext, useContext } from "react";

class RootSettingStore {
  constructor() {
    this._userAuth = (localStorage.getItem("auth") ?? "false") === "true";
  }

  set userAuth(value) {
    this._userAuth = value;
    localStorage.setItem("auth", JSON.stringify(value));
    dispatch("auth");
  }

  get userAuth() {
    return this._userAuth;
  }
}

const contextStore = new RootSettingStore();

const context = createContext(null);

const useRootSetting = () => useContext(context);

const Context = (props) => (
  <context.Provider
    value={contextStore}
    name="ROOT SETTING CONTEXT"
    {...props}
  />
);

export { Context as RootSettingContext, useRootSetting };
