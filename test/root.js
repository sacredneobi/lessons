const { checkVal } = require("../utils");

const sum = (a, b) => a + b;

const validate = [
  {
    name: "check 1 + 1 = 2",
    params: [1, 1],
    val: 2,
  },
  {
    name: "check 2 + 3 = 2",
    params: [2, 3],
    val: 2,
  },
];

checkVal(sum, validate);
