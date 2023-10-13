import { createContext, useContext } from "react";

class DashboardStore {
  constructor() {
    this._token = "";
  }

  get token() {
    return this._token;
  }

  set token(value) {
    this._token = value;
  }
}

const context = createContext(null);

const useDashboard = () => useContext(context);

const Context = (props) => (
  <context.Provider
    value={new DashboardStore()}
    name="DASHBOARD CONTENT"
    {...props}
  />
);

export { Context as DashboardContext, useDashboard };
