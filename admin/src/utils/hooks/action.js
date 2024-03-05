import { useCallback } from "react";

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

export { useAction, useAction as useActionDialog };
