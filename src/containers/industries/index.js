import {
  Text,
  Select,
  Group,
  Grid,
  Paper,
  Center,
  Loader,
} from '@mantine/core';
import React, { Component, useEffect, useState } from 'react';
import ITable from '../../components/ITable';
import {
  industries_table1,
  industries_table2,
  industries_table3_type1,
  industries_table3_type2,
} from '../../helper/statics';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getEveryFeeder } from '../../apis/main';
import Chart from '../../components/Chart';
import { withRouter } from 'react-router-dom';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      industries: [],
      error: false,
      table1: [],
      table2: [],
      table3: [],
      chart1: [],
      chart2: [],
      chart3: [],
      chart4: [],
      chart5: [],
      interval: false,
      industryLists: [],
      id: props.route.match.params.id,
    };
  }

  table1(id = this.state.id) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'totalIndustriesActivity');
    this.setState({ loading: true });
    getEveryFeeder(`${thatItem.feeder_url}/${id}`)
      .then((res) => {
        this.setState({ table1: res.data, loading: false });
      })
      .catch((err) => this.setState({ error: true, loading: false }));
  }

  table2(id = this.state.id) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'totalIndustriesStockLOrN');
    this.setState({ loading: true });
    getEveryFeeder(`${thatItem.feeder_url}/${id}`)
      .then((res) => {
        this.setState({ table2: res.data.data, loading: false });
      })
      .catch((err) => this.setState({ error: true, loading: false }));
  }

  table3(id = this.state.id) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'totalIndustrialsStocks');
    this.setState({ loading: true });
    getEveryFeeder(`${thatItem.feeder_url}/${id}`)
      .then((res) => {
        this.setState({ table3: res.data, loading: false });
      })
      .catch((err) => this.setState({ error: true, loading: false }));
  }

  chart1(id = this.state.id) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find(
      (item) => item.key === 'totalIndustriesStockPresent'
    );
    getEveryFeeder(`${thatItem.feeder_url}/${id}`)
      .then((res) => {
        this.setState({ chart1: res.data.data, loading: false });
      })
      .catch((err) => this.setState({ error: true, loading: false }));
  }

  chart2(id = this.state.id) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find(
      (item) => item.key === 'totalIndustriesStockValueQueue'
    );
    getEveryFeeder(`${thatItem.feeder_url}/${id}`)
      .then((res) => {
        this.setState({ chart2: res.data.data, loading: false });
      })
      .catch((err) => this.setState({ error: true, loading: false }));
  }

  chart3(id = this.state.id) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find(
      (item) => item.key === 'totalIndustriesChangeBuySellHeadsHistory'
    );
    getEveryFeeder(`${thatItem.feeder_url}/${id}`)
      .then((res) => {
        this.setState({ chart3: res.data.data, loading: false });
      })
      .catch((err) => this.setState({ error: true, loading: false }));
  }

  chart4(id = this.state.id) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find(
      (item) => item.key === 'totalIndustriesEnterManyBuyerIHistory'
    );
    getEveryFeeder(`${thatItem.feeder_url}/${id}`)
      .then((res) => {
        this.setState({ chart4: res.data.data, loading: false });
      })
      .catch((err) => this.setState({ error: true, loading: false }));
  }

  chart5(id = this.state.id) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find(
      (item) => item.key === 'totalIndustriesMarketOrderValueHistory'
    );
    getEveryFeeder(`${thatItem.feeder_url}/${id}`)
      .then((res) => {
        this.setState({ chart5: res.data.data, loading: false });
      })
      .catch((err) => this.setState({ error: true, loading: false }));
  }

  getIndustryList = (id = this.state.id) => {
    if (_.isEmpty(this.state.industryLists)) {
      let thatItem = this.props.chartAndtables;
      thatItem = thatItem.find((item) => item.key === 'totalIndustriesGroup');
      getEveryFeeder(thatItem.feeder_url)
        .then((res) => {
          this.setState({ industryLists: res.data.data });
        })
        .catch((err) => {
          this.setState({ error: true });
        });
    }
  };

  industry_history(id) {
    this.props.history.push(`/industries/${id}`);
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.table1();
    this.table2();
    this.table3();
    this.chart1();
    this.chart2();
    this.chart3();
    this.chart4();
    this.chart5();

    this.props.route.history.listen((location) => {
      let { pathname } = location;
      let id = pathname.split('/')[2];
      this.setState({ id, loading: false });
      this.table1(id);
      this.table2(id);
      this.table3(id);
      this.chart1(id);
      this.chart2(id);
      this.chart3(id);
      this.chart4(id);
      this.chart5(id);
    });
  }

  componentWillUnmount() {
    this.setState({ interval: false });
  }

  render() {
    return (
      <>
        <Helmet>
          <title>دیده بان گروه</title>
        </Helmet>
        {/* {this.state.error === false && this.state.loading === false ? (
          
        ) : (
          <Paper padding="xl" radius="md" shadow="xs" mt="xl">
            <Center>
              <Text size="sm">
                موردی یافت نشد ( از این لیست گروه صنایع مد نظر خود را انتخاب
                کنید)
              </Text>
            </Center>
            <Center mt="lg">
              <Select
                placeholder="انتخاب کنید"
                dropdownComponent="div"
                onChange={(e) => console.log(e)}
                data={this.state.industries}
              />
            </Center>
          </Paper>
        )} */}
        <Group position="apart" mt="my">
          <Text size="md">{`گروه ${this.state.table1.title || ''}`}</Text>
          <Select
            searchable
            onChange={(value) => this.industry_history(value)}
            placeholder="انتخاب صنعت"
            onMouseOver={() => this.getIndustryList()}
            data={this.state.industryLists || []}
          />
        </Group>
        {this.state.loading ? (
          <Paper shadow="xs" p="lg" radius="md" mt="md">
            <Center>
              <Loader variant="dots" />
            </Center>
          </Paper>
        ) : (
          <>
            <ITable
              title={this.state.table1.title}
              data={this.state.table1.data}
              column={industries_table1.header}
            />
            <ITable
              title="جدول حقیقی حقوقی"
              data={this.state.table2}
              column={industries_table2.header}
            />
            <Grid grow mt="lg">
              <Grid.Col sm={12} lg={6}>
                <Chart
                  data={this.state.chart1.series}
                  special={this.state.chart1.special}
                  title="محدوده قیمتی آخرین معامله نماد"
                />
              </Grid.Col>
              <Grid.Col sm={12} lg={6}>
                <Chart
                  data={this.state.chart2.series}
                  special={this.state.chart2.special}
                  title="ارزش کل سفارش های روی تابلو گروه به میلیارد تومان"
                />
              </Grid.Col>
              <Grid.Col sm={12} lg={6}>
                <Chart
                  data={this.state.chart3.series}
                  special={this.state.chart3.special}
                  title="تغیرات سرانه های خرید و فروش گروه به میلیون تومان"
                />
              </Grid.Col>
              <Grid.Col sm={12} lg={6}>
                <Chart
                  data={this.state.chart4.series}
                  special={this.state.chart4.special}
                  title="تغییرات ورود پول اشخاص حقیقی به میلیارد تومان"
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Chart
                  data={this.state.chart5.series}
                  special={this.state.chart5.special}
                  title="تغییرات ارزش کل سفارش ها به میلیارد تومان"
                />
              </Grid.Col>
            </Grid>

            {'type' in this.state.table3 ? (
              <ITable
                title={this.state.table3.title}
                data={this.state.table3.data}
                column={
                  this.state.table3.type == 1
                    ? industries_table3_type1.header
                    : industries_table3_type2.header
                }
              />
            ) : (
              <ITable />
            )}
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  industryGroups: state.config.industriesGroups,
  chartAndtables: state.config.needs.chartAndtables,
});

export default withRouter(connect(mapStateToProps)(Index));
