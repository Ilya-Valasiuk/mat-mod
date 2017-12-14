const uniformFormula = ({ a, b, x = Math.random() }) => a + (x * (b - a));

const getFunctionX = ({ x, a, b }) => [uniformFormula({ a, b, x }), x];

const getDensity = ({ x, a, b }) => [uniformFormula({ a, b, x }), 1 / (b - a)];

const getM = ({ a, b }) => +((+(b + a).toFixed(15)) / 2).toFixed(15);

const getD = ({ a, b }) => +(Math.pow(b - a, 2).toFixed(15) / 12);

export {
  uniformFormula,
  getFunctionX,
  getDensity,
  getM,
  getD,
};
