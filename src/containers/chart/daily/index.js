import React, { Component } from 'react';
import Chart from '../../../components/Chart';
import { getEveryUser } from '../../../apis/main';
import { Group, Text, Select, Stack } from '@mantine/core';
import ChartData from '../../../components/Chart/chartData';
import { connect } from 'react-redux';
import { setDailyList } from '../../../redux/reducers/config';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

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
    getEveryUser(`/CashFlowDaily/dailyTradeValue/${id}`).then((res) => {
      ChartData.dailyChart1.options.labels = res.data.data.date;
      this.setState({ chart1: res.data.data, title: res.data.title });
    });
  }

  chart2(id = this.id) {
    getEveryUser(`/CashFlowDaily/dailyEntryMany/${id}`).then((res) => {
      this.setState({ chart2: res.data.data, title: res.data.title });
      ChartData.dailyChart2.options.labels = res.data.data.date;
    });
  }

  chart3(id = this.id) {
    getEveryUser(`/CashFlowDaily/dailyPowerBuyer/${id}`).then((res) => {
      this.setState({ chart3: res.data.data, title: res.data.title });
      ChartData.dailyChart3.options.labels = res.data.data.date;
    });
  }

  daily_history(value) {
    this.history.push(`/chart/daily/${value}`);
  }

  get_daily_history() {
    if (!this.props.dailyList.length > 0) {
      getEveryUser(`/CashFlowDaily/dailyCashFlowIndustriesGroup`).then(
        (res) => {
          this.setState({ dailyLists: res.data.data });
          this.props.setDailyList(res.data.data);
        }
      );
    }
  }

  history_updater() {
    this.history.listen((location) => {
      let { pathname } = location;
      let id = pathname.split('/')[3];
      this.chart1(id);
      this.chart2(id);
      this.chart3(id);
    });
  }

  componentDidMount() {
    if (this.props.dailyList.length > 0) {
      this.setState({ dailyLists: this.props.dailyList });
    } else {
      this.get_daily_history();
    }
    this.history_updater();
    this.chart1();
    this.chart2();
    this.chart3();
  }

  render() {
    return (
      <>
        <Helmet>
          <title>نمودار های جریانات نقدیندگی</title>
        </Helmet>
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
      </>
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
