import { format } from 'd3-format';
import Random from 'random-js';

const sum = (r, a) => r.map((b, i) => a[i] + b);

const findMXY = (matrix, { X, Y }) => {
  const format1f = format('.1f');
  let MXY = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      MXY += +(format1f(X.values[i] * matrix[i][j] * Y.values[j]));
    }
  }

  return +format1f(MXY);
};

const doModifiedMatrix = (matrix, { X, Y }) => {
  const clonedMatrix = matrix.slice(0);

  // Horizontal sum
  clonedMatrix.forEach(row => row.push(row.reduce((acc, item) => acc + item)));
  // Vertical sum
  clonedMatrix.push(clonedMatrix.reduce(sum));
  clonedMatrix.unshift(Y.values);
  clonedMatrix[0].unshift('X/Y');
  clonedMatrix[0].push('Px');
  clonedMatrix[clonedMatrix.length - 1].unshift('Py');

  // Add X values
  clonedMatrix.forEach((row, i) => {
    if (!i || i === clonedMatrix.length - 1) {
      return;
    }

    row.unshift(X.values[i - 1]);
  });

  return clonedMatrix;
};

const getXValues = (matrix) => {
  const format1f = format('.1f');
  let MX = 0;
  let M2X = 0;

  matrix.forEach((X, index) => {
    if (!index || index === matrix.length - 1) {
      return;
    }

    MX += +(format1f(X[0] * X[X.length - 1]));
    M2X += +(format1f((X[0] ** 2) * X[X.length - 1]));
  });

  return { MX: +format1f(MX), M2X: +format1f(M2X) };
};

const getYValues = (matrix) => {
  const format1f = format('.1f');
  let MY = 0;
  let M2Y = 0;

  matrix[0].forEach((Y, index) => {
    if (!index || index === matrix[0].length - 1) {
      return;
    }

    MY += +(format1f(Y * matrix[matrix.length - 1][index]));
    M2Y += +(format1f((Y ** 2) * matrix[matrix.length - 1][index]));
  });

  return { MY: +format1f(MY), M2Y: +format1f(M2Y) };
};

const getDValue = (M, M2) => {
  const format1f = format('.1f');
  return +format1f(M2 - M);
};

const getSValues = (D) => {
  const format1f = format('.1f');
  return +format1f(Math.sqrt(D));
};

const getKXY = ({ MXY, MX, MY }) => {
  const format1f = format('.1f');
  return +format1f(MXY - (MX * MY));
};

const getRXY = ({ KXY, sX, sY }) => {
  const format1f = format('.1f');
  return +format1f(KXY / (sX * sY));
};

const createRange = (data) => {
  const format1f = format('.1f');
  const range = [];

  data.reduce((acc, item) => {
    const next = +format1f(acc + item);

    range.push([acc, next]);

    return next;
  }, 0);

  return range;
};

const findGoodGamble = (diceRoot, rangeRoot, rootValues) => {
  let goodGamble = null;
  let ggIndex = null;

  diceRoot.forEach((dice) => {
    const goodGambleIndex = rangeRoot.findIndex(o => dice >= o[0] && dice < o[1]);

    if (goodGambleIndex >= 0) {
      if (!goodGamble) {
        goodGamble = rootValues[goodGambleIndex];
        ggIndex = goodGambleIndex;
      }
    }
  });

  return { goodGamble, ggIndex };
};

const doGambling = ({ X, Y }) => {
  const engine = Random.engines.mt19937().autoSeed();
  const distribution = Random.real(0, 1);
  const xRange = createRange(X.probabilities);
  const yRange = createRange(Y.probabilities);
  const xDice = X.probabilities.map(() => distribution(engine));
  const yDice = Y.probabilities.map(() => distribution(engine));
  const xGoodGamble = findGoodGamble(xDice, xRange, X.values);
  const yGoodGamble = findGoodGamble(yDice, yRange, Y.values);

  return {
    xGoodGamble,
    yGoodGamble,
    xRange,
    yRange,
    xDice,
    yDice,
  };
};

const buildMatrix = ({ X, Y }) => {
  const format2f = format('.2f');
  const matrix = X.values.reduce((matrixX, valueX, indexX) =>
    matrixX.concat([Y.values.reduce((matrixY, valueY, indexY) =>
      matrixY.concat(+format2f(X.probabilities[indexX] * Y.probabilities[indexY])), [])]), []);

  return matrix;
};

const calculcateCharacteristics = (matrix, { X, Y }) => {
  const MXY = findMXY(matrix, { X, Y });
  const newMatrix = doModifiedMatrix(matrix, { X, Y });
  const { MX, M2X } = getXValues(newMatrix);
  const { MY, M2Y } = getYValues(newMatrix);
  const DX = getDValue(MX, M2X);
  const DY = getDValue(MY, M2Y);
  const sX = getSValues(DX);
  const sY = getSValues(DY);
  const KXY = getKXY({ MXY, MX, MY });
  const rXY = getRXY({ KXY, sX, sY });

  console.table(newMatrix);
  console.log('X Number Characteristics: ');
  console.table({
    MX, M2X, DX, sX, MXY, KXY, rXY,
  });
  console.log('Y Number Characteristics: ');
  console.table({
    MY, M2Y, DY, sY, MXY, KXY, rXY,
  });
};

const findGamblingData = ({ count, X, Y }) => {
  const pairs = [];
  const xData = { data: [] };
  const yData = { data: [] };

  for (let i = 0; i < count; i++) {
    const gamblingResults = doGambling({ X, Y });

    xData.data.push({
      x: gamblingResults.xGoodGamble.goodGamble,
      index: gamblingResults.xGoodGamble.ggIndex,
      range: gamblingResults.xRange[gamblingResults.xGoodGamble.ggIndex],
    });

    xData.range = gamblingResults.xRange;

    yData.data.push({
      y: gamblingResults.yGoodGamble.goodGamble,
      index: gamblingResults.yGoodGamble.ggIndex,
      range: gamblingResults.yRange[gamblingResults.yGoodGamble.ggIndex],
    });

    yData.range = gamblingResults.yRange;

    pairs.push({
      X: gamblingResults.xGoodGamble.goodGamble,
      Y: gamblingResults.yGoodGamble.goodGamble,
    });
  }

  return {
    pairs,
    xData,
    yData,
  };
};

export {
  buildMatrix,
  calculcateCharacteristics,
  findGamblingData,
};
