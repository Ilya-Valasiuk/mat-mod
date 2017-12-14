import React, { Component } from 'react';
import { CHART_TYPES } from './../../constants/constants';
// Components
import { Chart } from './../chart/chart';
// Services
import {
  buildMatrix,
  calculcateCharacteristics,
  findGamblingData,
} from './../../services/discrete-random-values';
// Helpers
import { buildHistogramPairsData } from './../../helper/histogram-helper';

const defaultOptions = {
  X: {
    values: [2, 5, 6, 10],
    probabilities: [0.2, 0.1, 0.3, 0.4],
  },
  Y: {
    values: [0, 1, 4],
    probabilities: [0.3, 0.3, 0.4],
  },
  gambling: 3,
};

const getDefaultState = (options) => {
  const {
    X,
    Y,
    gambling,
  } = options;
  const matrix = buildMatrix({ X, Y });
  const characteristics = calculcateCharacteristics(matrix, { X, Y });
  const gamblingData = findGamblingData({ count: gambling, X, Y });

  console.log(characteristics);

  return {
    ...gamblingData,
  };
};

export class DiscreteRandomValues extends Component {
  state = getDefaultState(defaultOptions);

  render() {
    const { pairs, xData, yData } = this.state;

    return (
      <div>
        <Chart
          id="Pairs"
          type={CHART_TYPES.BAR_CHART}
          options={{ title: 'Pairs Distribution' }}
          data={buildHistogramPairsData({ pairsData: pairs, pairsCreator: item => ({ ...item, label: `{${item.X};${item.Y}}` }) })}
        />
        <Chart
          id="xInfo"
          type={CHART_TYPES.BAR_CHART}
          options={{ title: 'X info' }}
          data={buildHistogramPairsData({ pairsData: xData.data, pairsCreator: item => ({ ...item, label: `[${item.range[0]};${item.range[1]}]` }) })}
        />
        <Chart
          id="yInfo"
          type={CHART_TYPES.BAR_CHART}
          options={{ title: 'Y info' }}
          data={buildHistogramPairsData({ pairsData: yData.data, pairsCreator: item => ({ ...item, label: `[${item.range[0]};${item.range[1]}]` }) })}
        />
      </div>
    );
  }
}
