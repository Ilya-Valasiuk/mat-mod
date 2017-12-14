import React, { Component } from 'react';
import { CHART_TYPES } from './../../constants/constants';
// Components
import { Chart } from './../chart/chart';
import { SimpleText } from './../simple-text/simple-text';
// Services
import { multiplicativeCongruentialMethod } from './../../services/base-random-variables';
import {
  uniformFormula,
  getFunctionX,
  getDensity,
  getM,
  getD,
} from './../../services/uniform-destribution';
// Helpers
import { buildBaseHistogramData, buildScatterData } from './../../helper/histogram-helper';

const defaultOptions = {
  title: 'Равномерное распределение',
  destFunTitle: 'Функция распределения',
  destDensityTitle: 'Плотность распределения',
  count: 1000,
  method: multiplicativeCongruentialMethod,
  startPoint: 2,
  endPoint: 5,
};

const getDefaultState = (options) => {
  const {
    count,
    method,
    destFunTitle,
    destDensityTitle,
    startPoint,
    endPoint,
  } = options;
  const randomSequence = method(count);
  const histogramData = randomSequence.map(x => uniformFormula({ x, a: startPoint, b: endPoint }));
  const destributionFunctionData = randomSequence.map(x => getFunctionX({ x, a: startPoint, b: endPoint }));
  const destributionDensityData = randomSequence.map(x => getDensity({ x, a: startPoint, b: endPoint }));
  const M = getM({ a: startPoint, b: endPoint });
  const D = getD({ a: startPoint, b: endPoint });

  return {
    startPoint,
    endPoint,
    destFunTitle,
    destDensityTitle,
    histogramData,
    destributionFunctionData,
    destributionDensityData,
    M,
    D,
  };
};

export class InverseFunctionMethod extends Component {
  state = {
    title: `${defaultOptions.title} для ${defaultOptions.count}`,
    ...getDefaultState(defaultOptions),
  };

  render() {
    const {
      title,
      startPoint,
      endPoint,
      destFunTitle,
      destDensityTitle,
      histogramData,
      destributionFunctionData,
      destributionDensityData,
      M,
      D,
    } = this.state;

    return (
      <div>
        <Chart
          id="uniformSequence"
          type={CHART_TYPES.HISTOGRAM}
          options={{
            title,
            vAxis: { scaleType: 'mirrorLog' },
            legend: 'none',
          }}
          data={buildBaseHistogramData({ data: histogramData })}
        />
        <Chart
          id={destFunTitle}
          type={CHART_TYPES.SCATTER_CHART}
          options={{
            title: destFunTitle,
            vAxis: {
              title: 'Y',
              minValue: 0,
              maxValue: 1,
            },
            hAxis: {
              title: 'X',
              minValue: startPoint || 0,
              maxValue: endPoint || 15,
            },
          }}
          data={buildScatterData({ data: destributionFunctionData })}
        />
        <Chart
          id={destDensityTitle}
          type={CHART_TYPES.SCATTER_CHART}
          options={{
            title: destDensityTitle,
            vAxis: {
              title: 'Y',
              minValue: 0,
              maxValue: 1,
            },
            hAxis: {
              title: 'X',
              minValue: startPoint || 0,
              maxValue: endPoint || 15,
            },
          }}
          data={buildScatterData({ data: destributionDensityData })}
        />
        <SimpleText title="M" value={M} />
        <SimpleText title="D" value={D} />
      </div>
    );
  }
}
