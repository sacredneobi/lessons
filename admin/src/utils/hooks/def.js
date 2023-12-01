const useDef = (data, onChange) => (name) => ({
  name,
  caption: name,
  value: data?.[name],
  onChange,
  clear: true,
});

export { useDef };
