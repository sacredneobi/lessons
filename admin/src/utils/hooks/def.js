const useDef = (data, onChange, error) => (name) => ({
  name,
  caption: name,
  value: data?.[name],
  error: error?.fields?.[name],
  onChange,
  clear: true,
});

export { useDef };
