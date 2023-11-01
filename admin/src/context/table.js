import { createContext, useContext } from "react";

class TableStore {
  constructor() {
    this._selected = [];
  }

  get selected() {
    return this._selected;
  }

  set selected(value) {
    this._selected = value;
  }
}

const context = createContext(null);

const useTable = () => useContext(context);

const Context = (props) => (
  <context.Provider value={new TableStore()} name="TABLE CONTENT" {...props} />
);

export { Context as TableContext, useTable };
