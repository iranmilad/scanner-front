import { Group, Text } from '@mantine/core';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Chart from '../../components/Chart';
import { getEveryFeeder } from '../../apis/main/main';
import ChartData from '../../components/Chart/chartData';

class ReportChart extends Component {
  state = {
    title: '',
    data: [],
  };
  
  getChart(){
    console.log(this.props.match.params);
    // getEveryFeeder(`/reports/chart/${this.props.match.params.id}`)
    //   .then((res) => {
    //     this.setState({ title: res.data.data.title, data: res.data.data.data });
    //     ChartData.dailyChart1.options.labels = res.data.data.date;
    //   }
    //   );
  }
  componentDidMount() {
    this.getChart();
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>نمودار های تولید فروش</title>
        </Helmet>
        <Group>
          <Text size="md">{this.state.title ? this.state.title : ''}</Text>
        </Group>
        <Chart
          data={this.state.data}
          options={ChartData.dailyChart1.options}
          type="line"
          title='فروش به میلیارد تومان'
          width="100%"
          height={350}
        />
      </div>
    );
  }
}

export default ReportChart;
