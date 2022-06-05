import { Stack } from '@mantine/core';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Chart from '../../components/Chart';
import { getEveryFeeder } from '../../apis/main/main';
import ChartData from '../../components/Chart/chartData';

class ReportChart extends Component {
  state = {
    title1: '',
    title2: '',
    data: [],
    data2: [],
  };

  getChart1() {
    getEveryFeeder(`/perfomance/A00`).then((res) => {
      ChartData.dailyChart1.options.labels = res.data.data.date;
      this.setState({ title1: res.data.title, data: res.data.data.series });
    });
  }
  getChart2() {
    getEveryFeeder(`/sellPerfomance/A00`).then((res) => {
      ChartData.dailyChart1.options.labels = res.data.data.date;
      this.setState({ title2: res.data.title, data2: res.data.data.series });
    });
  }
  componentDidMount() {
    this.getChart1();
    this.getChart2();
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>نمودار های تولید فروش</title>
        </Helmet>
        <Stack spacing="md">
          <Chart
            data={this.state.data}
            options={{ options: { ...ChartData.dailyChart1.options } }}
            type="line"
            title={this.state.title1}
            width="100%"
            height={350}
          />
          <Chart
            data={this.state.data2}
            options={{ options: { ...ChartData.dailyChart1.options } }}
            type="line"
            title={this.state.title2}
            width="100%"
            height={350}
          />
        </Stack>
      </div>
    );
  }
}

export default ReportChart;
