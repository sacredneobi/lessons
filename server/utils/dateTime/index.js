const sleep = (interval = 5000) =>
  new Promise((resolve) => {
    setTimeout(resolve, interval);
  });

module.exports = { sleep };
