import { useCallback, useEffect } from "react";
import { getStoreData } from "../localStorage";

const useAction = (setData, onChange) => {
  return useCallback(
    (name) => (value) => {
      setData((prev) => {
        if (!prev) {
          prev = {};
        }
        if (typeof onChange === "function") {
          prev[name] = onChange(name, value, prev);
        } else {
          prev[name] = value;
        }
        return { ...prev };
      });
    },
    [setData, onChange]
  );
};

const useActionDialog = (setData, storeName, itemsStore) => {
  useEffect(() => {
    const oldData = getStoreData(storeName);

    const newData = Object.keys(oldData).reduce((prev, item) => {
      if (itemsStore.includes(item)) {
        prev[item] = oldData[item];
      }
      return prev;
    }, {});

    if (Object.keys(oldData).length > 0) {
      setData((prev) => ({ ...prev, ...newData }));
    }
  }, [storeName, itemsStore, setData]);

  const store = useCallback(
    (name, value, prev) => {
      if (Array.isArray(itemsStore) && storeName) {
        const oldData = getStoreData(storeName);

        itemsStore.forEach((item) => {
          if (name === item) {
            oldData[item] = value;
          }
        });

        localStorage.setItem(storeName, JSON.stringify(oldData));
      }
      return value;
    },
    [itemsStore, storeName]
  );

  return useAction(setData, store);
};

export { useAction, useActionDialog };
