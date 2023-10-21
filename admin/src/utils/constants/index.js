const getHash = () => window.location.hash?.replace("#", "");

const setHash = (value) => (window.location.hash = value);

export { getHash, setHash };
