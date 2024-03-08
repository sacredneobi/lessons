import { useState, useCallback, useEffect } from "react";
import { parse } from "../object";

const useStore = (storeName, def) => {
  const [name, setName] = useState(storeName);
  const [data, setData] = useState(localStorage.getItem(storeName) ?? def);

  const setNewData = useCallback(
    (value) => {
      let newState = value;
      if (typeof value === "function") {
        newState = value(data);
      }
      setData(newState);
      localStorage.setItem(name, JSON.stringify(newState));
    },
    [name, data]
  );

  useEffect(() => {
    setName(storeName);
    setData(parse(localStorage.getItem(storeName)));
  }, [storeName]);

  return [data, setNewData];
};

export { useStore };
