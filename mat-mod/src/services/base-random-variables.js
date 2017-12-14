const middleOfSquareMethod = (count, randomNumber = 3951) => {
  let randomNumberLocal = randomNumber;

  const rand = () => {
    const rawRandomNumber = Math.pow(randomNumberLocal, 2).toString();
    let fullRandomNumber = rawRandomNumber;

    while (fullRandomNumber.length !== 8) {
      fullRandomNumber = `0${fullRandomNumber}`;
    }

    randomNumberLocal = fullRandomNumber.slice(2, 6);

    return randomNumberLocal / 10000;
  };

  return Array(count).fill().map(rand);
};

const multiplicativeCongruentialMethod = (count, seed = 3) => {
  const m = Math.pow(2, 31) - 1; // modulus
  const a = 48271; // multiplier
  const c = 0; // increment
  let z = seed;
  const rand = () => {
    z = ((a * z) + c) % m;
    return z / m;
  };

  return Array(count).fill().map(rand);
};

const calcM = (numbers) => {
  const sum = numbers.slice(1).reduce((a, b) => a + b);

  return (1 / numbers.length) * sum;
};

const calcD = (numbers, M) => {
  const sum = numbers.slice(1).reduce((a, b) => a + Math.pow(b, 2), Math.pow(numbers[0], 2));

  return (sum / numbers.length) - Math.pow(M, 2);
};

const calcR = (numbers) => {
  const s = 2;
  const selection = numbers.slice(1, numbers.length - s);
  const sum = selection.reduce(
    (a, b, i) => (a + (b * numbers[i + s])),
    numbers[0]
  );
  const prefix = 12 / (numbers.length - s);

  return (prefix * sum) - 3;
};

export {
  middleOfSquareMethod,
  multiplicativeCongruentialMethod,
  calcD,
  calcM,
  calcR,
};
