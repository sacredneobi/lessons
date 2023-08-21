const oldLog = console.log;
const oldError = console.error;

const getDate = () => {
  const current = new Date();

  const day = String(current.getDate()).padStart(2, "0");
  const month = String(current.getMonth() + 1).padStart(2, "0");
  const year = current.getFullYear();

  const hour = String(current.getHours()).padStart(2, "0");
  const minute = String(current.getMinutes()).padStart(2, "0");
  const seconds = String(current.getSeconds()).padStart(2, "0");
  const milliseconds = String(current.getMilliseconds()).padStart(3, "0");

  return `[${year}.${month}.${day} ${hour}:${minute}:${seconds}.${milliseconds}]`;
};

console.log = function (...args) {
  oldLog(`\x1b[33m${getDate()}\x1b[0m`, ...args);
};

console.error = function (name, ...args) {
  oldLog(
    `\x1b[33m${getDate()}\x1b[0m`,
    `\x1b[31m[ERROR]${
      args.length > 0 ? `[${name.toUpperCase()}]` : ""
    }\x1b[0m:`,
    ...(args.length > 0 ? args : [name])
  );
};

console.done = function (name, ...args) {
  oldLog(
    `\x1b[33m${getDate()}\x1b[0m`,
    `\x1b[32m[DONE][${name.toUpperCase()}]\x1b[0m:`,
    ...args
  );
};

console.forUser = function (...args) {
  oldLog(
    `\x1b[33m${getDate()}\x1b[0m`,
    `\x1b[31m[ERROR][USER_LOG]\x1b[0m:`,
    ...args
  );
};
