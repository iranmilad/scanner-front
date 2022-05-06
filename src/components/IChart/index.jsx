import { Component } from 'react';
import lodash from 'lodash';
import Chart from 'react-apexcharts';
import { Group, Loader } from '@mantine/core';
import { chartType } from './functions';
import ChartData from './chartData';
import { connect } from 'react-redux';
import { setModal } from '../../redux/reducers/main';
import { getChart } from '../../apis/charts';

/**
 * IChart for handle the every chart
 * @component
 * @example
 * return (
 * <IChart
 *  type={'line'}
 *  series={data}
 *  options={options}
 * />
 */
class IChart extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    // let options = chartType(this.props.special);
    // let extraEvents = Object.assign({},options?.chart?.events, {reducer:{setModal:this.props.setModal}});
    // options.chart.events = extraEvents;
    // this.setState({
    //   series: this.props.series.series,
    //   options,
    // })
    this.worker();

    setInterval(()=>{
      this.worker();
    },15 * 60 * 1000)
  }

  worker() {
    getChart(this.props.feeder_url)
      .then((res) => {
        this.setState({
          series: res.data.data.series,
          options: ChartData[res.data.data.special].options,
          type: ChartData[res.data.data.special].type,
        });
      })
      .catch((err) => {});
  }

  render() {
    return (
      <>
        {lodash.isEmpty(this.state) ? (
          <Group position="center">
            <Loader color="blue" variant="dots" />
          </Group>
        ) : (
          <Chart
            width="100%"
            options={this.state.options}
            series={this.state.series}
            type={this.state.type}
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

/**
 * Dispatch to props
 */
const mapDispatchToProps = (dispatch) => ({
  setModal: (prop) => dispatch(setModal(prop)),
});

export default connect(null, mapDispatchToProps)(IChart);
