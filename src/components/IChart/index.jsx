import { Component } from 'react';
import lodash from 'lodash';
import Chart from 'react-apexcharts';
import { Group, Loader } from '@mantine/core';
import {chartType} from './functions';
import ChartData from './chartData';


class IChart extends Component {
  state = {
    series: this.props.series.series,
    options: chartType(this.props.special),
  };


  render() {
    return (
      <>
        {lodash.isEmpty(this.state.series) ? (
          <Group position="center">
            <Loader color="indigo" variant="bars" />
          </Group>
        ) : (
          <Chart
            width="100%"
            options={this.state.options}
            series={this.state.series}
            type={ChartData[this.props.special].type}
            height={350}
          />
        )}
      </>
    );
  }
}


// a function for generate clock time from 9:00 to 14:00 with every 1 min
export const clockTime = () => {
  let arr = [];
  for (let i = 9; i < 15; i++) {
    for (let j = 0; j < 60; j++) {
      arr.push(`${i}:${j}`);
    }
  }
  return arr;
};

export default IChart;
