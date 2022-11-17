import { Component } from 'react';
import lodash from 'lodash';
import Chart from 'react-apexcharts';
import { Group, Loader } from '@mantine/core';
import { chartType } from './functions';
import ChartData from '../Chart/chartData';
import { connect } from 'react-redux';
import { setModal, setChart } from '../../redux/reducers/chartable/chart';
import { getEveryFeeder } from '../../apis/main';
import { useData } from '../../helper';
import { useEffect } from 'react';

const IChart = (props) => {
  useEffect(()=>{
    window['chartable'] = {
      setModal: props.setModal,
      setChart: props.setChart,
    };
  },[])

  let { isFetching, data } = useData(props?.item);
  if (isFetching)
    return (
      <Group position="center">
        <Loader color="blue" variant="dots" />
      </Group>
    );
  return (
    <Chart
      width="100%"
      options={ChartData[data?.data.special].options}
      series={data?.data.series}
      type={ChartData[data?.data.special].type}
      height={350}
    />
  );
};

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

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
});

/**
 * Dispatch to props
 */
const mapDispatchToProps = (dispatch) => ({
  setModal: (data) => dispatch(setModal(data)),
  setChart: (data) => dispatch(setChart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IChart);
