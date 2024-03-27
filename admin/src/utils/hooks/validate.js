const { useCallback } = require("react");

const isNotEmpty = (data) => {
  return data !== null && data !== undefined;
};

const useValidate = (validate) => {
  return useCallback(
    (data) => {
      const result = {};

      if (!Array.isArray(validate) && validate.length === 0) {
        result.isError = false;
        return result;
      }

      validate.forEach((item) => {
        const name = item.name;
        const element = data?.[name];

        if (item.notNull && !element) {
          result[name] = "notNull";
        }
        if (
          isNotEmpty(item.minLength) &&
          String(element).length < item.minLength
        ) {
          result[name] = "minLength";
        }
        if (
          isNotEmpty(item.maxLength) &&
          String(element).length > item.maxLength
        ) {
          result[name] = "maxLength";
        }

        if (isNotEmpty(item.minValue) && parseFloat(element) > item.minValue) {
          result[name] = "minValue";
        }
        if (isNotEmpty(item.maxValue) && parseFloat(element) > item.maxValue) {
          result[name] = "maxValue";
        }
      });

      return { fields: result, isError: Object.keys(result).length > 0 };
    },
    [validate]
  );
};

export { useValidate };
