import { dispatch, parse } from "@utils";
import { createContext, useContext } from "react";

class RootSettingStore {
  constructor() {
    this._userAuth = (localStorage.getItem("auth") ?? "false") === "true";
  }

  set userAuth(value) {
    this._userAuth = value;
    localStorage.setItem("auth", JSON.stringify(value));
    if (!value) {
      localStorage.removeItem("token");
    }
    dispatch("auth");
  }

  get userAuth() {
    return this._userAuth;
  }

  get token() {
    return parse(
      atob(localStorage.getItem("token")?.split(".")?.[1] ?? ""),
      {}
    );
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
