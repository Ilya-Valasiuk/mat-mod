import React from 'react';
import PropTypes from 'prop-types';
import { Chart as GoogleChart } from 'react-google-charts';
import { CHART_TYPES } from './../../constants/constants';

export const Chart = props => (
  <div className="my-pretty-chart-container">
    <GoogleChart
      chartType={props.type}
      data={props.data}
      options={props.options}
      graph_id={props.id}
      width="100%"
      height="400px"
      legend_toggle
    />
  </div>
);

Chart.propTypes = {
  options: PropTypes.shape({}).isRequired,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

Chart.defaultProps = {
  type: CHART_TYPES.HISTOGRAM,
};
