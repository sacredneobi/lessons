import { useState, useCallback, useEffect } from "react";

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

    let data;
    try {
      data = localStorage.getItem(storeName);
      if (data && data !== "") {
        data = JSON.parse(data);
      }
    } catch (err) {
      console.log(err);
    }

    setData(data);
  }, [storeName]);

  return [data, setNewData];
};

export { useStore };
