import countBy from 'lodash.countby';

const buildHistogramPairsData = ({ pairsData, pairsCreator }) => {
  const sequenceWithLabel = pairsData.map(pairsCreator);
  const pairs = countBy(sequenceWithLabel, 'label');
  const chartData = Object.keys(pairs).map(key => [key, pairs[key]]);

  return [
    [
      'Pairs',
      'Value',
    ],
    ...chartData,
  ];
};

const buildBaseHistogramData = ({ data }) => [['Key', 'Value'], ...data.map(item => ([`Value for ${item}`, item]))];

const buildScatterData = ({ data }) => [['X', 'Y'], ...data];

export {
  buildHistogramPairsData,
  buildBaseHistogramData,
  buildScatterData,
};
