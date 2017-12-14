import React, { Component } from 'react';
import { CHART_TYPES } from './../../constants/constants';
// Components
import { Chart } from './../chart/chart';
import { SimpleText } from './../simple-text/simple-text';
// Services
import {
  middleOfSquareMethod,
  multiplicativeCongruentialMethod,
  calcM,
  calcD,
  calcR,
} from './../../services/base-random-variables';
// Helpers
import { buildBaseHistogramData } from './../../helper/histogram-helper';

const defaultOptions = {
  middleOfSquareMethod: {
    title: 'Метод серидины квадрата',
    method: middleOfSquareMethod,
    counts: [100, 10000],
  },
  multiplicativeCongruentialMethod: {
    title: 'Мультипликативный конгруэнтный метод',
    method: multiplicativeCongruentialMethod,
    counts: [100, 10000],
  },
};

const prepareData = (options) => {
  const keys = Object.keys(options);

  return keys.reduce((result, key) => {
    const config = options[key];

    return result.concat(config.counts.map((count) => {
      const values = config.method(count);
      const M = calcM(values);
      const D = calcD(values, M);
      const R = calcR(values);

      return {
        title: config.title,
        M,
        D,
        R,
        values,
      };
    }));
  }, []);
};

export class BaseRandomVariablesCharacteristics extends Component {
  state = {
    randomVariables: prepareData(defaultOptions),
  };

  render() {
    return (
      <div>
        {this.state.randomVariables.map(sequence => (
          <div key={sequence.title + Math.random(0, 1)}>
            <Chart
              id={sequence.title + Math.random(0, 1)}
              type={CHART_TYPES.HISTOGRAM}
              options={{
                title: `${sequence.title} для ${sequence.values.length} значений`,
                vAxis: { scaleType: 'mirrorLog' },
                legend: 'none',
              }}
              data={buildBaseHistogramData({ data: sequence.values })}
            />
            <SimpleText title="M" value={sequence.M} />
            <SimpleText title="D" value={sequence.D} />
            <SimpleText title="R" value={sequence.R} />
          </div>
          ))
        }
      </div>
    );
  }
}
