const checkProps = (data, props) => {
  if (!Array.isArray(props) && props.length === 0) {
    return ["props not array"];
  }
  if (!data) {
    return props;
  }
  const arrCheck = props.filter((item) => !data[item]);
  if (arrCheck.length !== 0) {
    return arrCheck;
  }
  return null;
};

module.exports = { checkProps };
