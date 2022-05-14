import React, { Component } from 'react';
import Chart from '../../../components/Chart';
import { getChart } from '../../../apis/charts';
import { Group, Text, Select, Stack } from '@mantine/core';
import ChartData from '../../../components/Chart/chartData';
import { connect } from 'react-redux';
import { setDailyList } from '../../../redux/reducers/config';
import { withRouter } from 'react-router-dom';

class Daily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      dailyLists: [],
      chart1: {},
      chart2: {},
      chart3: {},
    };

    this.history = props.history;
    this.id = props.route.match.params.id;
  }

  chart1(id = this.id) {
    getChart(`/CashFlowDaily/dailyTradeValue/${id}`).then((res) => {
      this.setState({ chart1: res.data.data, title: res.data.title });
      // ChartData.dailyChart1.options.labels = res.data.date;
    });
  }

  chart2(id = this.id) {
    this.setState({
      chart2: {
        series: [
          {
            name: 'Cash Flow',
            data: [
              1.45, 5.42, 5.9, -0.42, -12.6, -18.1, -18.2, -14.16, -11.1, -6.09,
              0.34, 3.88, 13.07, 5.8, 2, 7.37, 8.1, 13.57, 15.75, 17.1, 19.8,
              -27.03, -54.4, -47.2, -43.3, -18.6, -48.6, -41.1, -39.6, -37.6,
              -29.4, -21.4, -2.4,
            ],
          },
        ],
      },
    });
    // getChart(`/CashFlowDaily/dailyTradeValue/${id}`).then((res) => {
    //   this.setState({ chart2: res.data.data, title: res.data.title });
    //   // ChartData.dailyChart1.options.labels = res.data.date;
    // });
  }

  chart3(id = this.id) {
    this.setState({
      chart3: {
        series: [
          {
            name: 'Cash Flow',
            data: [
              1.45, 5.42, 5.9, -0.42, -12.6, -18.1, -18.2, -14.16, -11.1, -6.09,
              0.34, 3.88, 13.07, 5.8, 2, 7.37, 8.1, 13.57, 15.75, 17.1, 19.8,
              -27.03, -54.4, -47.2, -43.3, -18.6, -48.6, -41.1, -39.6, -37.6,
              -29.4, -21.4, -2.4,
            ],
          },
        ],
      },
    });
    // getChart(`/CashFlowDaily/dailyTradeValue/${id}`).then((res) => {
    //   this.setState({ chart3: res.data.data, title: res.data.title });
    //   // ChartData.dailyChart1.options.labels = res.data.date;
    // });
  }

  daily_history(value) {
    this.history.push(`/chart/daily/${value}`);
  }

  get_daily_history() {
    if (!this.props.dailyList.length > 0) {
      getChart(`/CashFlowDaily/dailyCashFlowIndustriesGroup`).then((res) => {
        this.setState({ dailyLists: res.data.data });
        this.props.setDailyList(res.data.data);
      });
    }
  }

  history_updater() {
    this.history.listen((location) => {
      let { pathname } = location;
      let id = pathname.split('/')[3];
      this.chart1(id);
    });
  }

  componentDidMount() {
    if(this.props.dailyList.length > 0){
        this.setState({dailyLists: this.props.dailyList})
    }
    else{
      this.get_daily_history();
    }
    this.history_updater();
    this.chart1();
    this.chart2();
    this.chart3();
  }

  render() {
    return (
      <Stack spacing="lg">
        <Group position="apart">
          <Text size="md">{this.state.title}</Text>
          <Select
            searchable
            onChange={(value) => this.daily_history(value)}
            placeholder="انتخاب صنعت"
            data={this.state.dailyLists || []}
          />
        </Group>
        <Chart
          data={this.state.chart1.series}
          options={{ options: { ...ChartData.dailyChart1.options } }}
          type="line"
          width="100%"
          height={300}
          title="ارزش معاملات به میلیارد تومان"
        />
        <Chart
          data={this.state.chart2.series}
          options={{ options: { ...ChartData.dailyChart2.options } }}
          type="bar"
          width="100%"
          height={350}
          title="ورود پول اشخاص حقیقی به میلیارد تومان"
        />
        <Chart
          data={this.state.chart3.series}
          options={{ options: { ...ChartData.dailyChart3.options } }}
          type="bar"
          width="100%"
          height={350}
          title="قدرت نسبتی خریدار به فروشنده"
        />
      </Stack>
    );
  }
}

const mapStateToProps = (state) => ({
  dailyList: state.config.dailyList,
});

const mapDispatchToProps = (dispatch) => ({
  setDailyList: (data) => dispatch(setDailyList(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Daily));
