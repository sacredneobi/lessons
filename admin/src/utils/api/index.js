const buildGet = (data) => {
  const items = Object.keys(data)
    .filter((item) => !!data[item])
    .map((item) => `${item ?? "error"}=${data[item] ?? "_"}`);

  if (items?.length > 0) {
    return `?${items.join("&")}`;
  }
  return "";
};

export * from "./useFetch";

export { buildGet };
