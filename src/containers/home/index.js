import { Helmet } from 'react-helmet';
import {
  totalSummeryIndustrials,
  summaryTrans,
  totalSummerStockLOrN,
  totalSummeryGroupState,
} from '../../helper/statics';
import ITable from '../../components/ITable';
import LoopChart from '../../components/LoopChart';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getEveryFeeder } from '../../apis/main';
import _ from 'lodash';
import NewsTable from './news';
import { Text } from '@mantine/core';
import ExtractCharTable from './ExtractCharTable';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table1: {},
      table2: {},
      table3: {},
      table4: {},
      charts: [],
    };
  }
  setTable1() {
    let table1 = this.props.config.needs.chartAndtables.find(
      (item) => item.key === 'tb-summaryTrans'
    );

    getEveryFeeder(table1.feeder_url)
      .then((res) => {
        this.setState({ table1: res.data.data });
      })
      .catch((err) => {});
  }
  setTable2() {
    let table2 = this.props.config.needs.chartAndtables.find(
      (item) => item.key === 'tb-GroupState'
    );
    getEveryFeeder(table2.feeder_url)
      .then((res) => {
        this.setState({ table2: res.data.data });
      })
      .catch((err) => {});
  }
  setTable3() {
    let table3 = this.props.config.needs.chartAndtables.find(
      (item) => item.key === 'tb-StockLOrN'
    );
    getEveryFeeder(table3.feeder_url)
      .then((res) => {
        this.setState({ table3: res.data.data });
      })
      .catch((err) => {});
  }
  setTable4() {
    let table4 = this.props.config.needs.chartAndtables.find(
      (item) => item.key === 'tb-Industrials'
    );
    getEveryFeeder(table4.feeder_url)
      .then((res) => {
        this.setState({ table4: res.data.data });
      })
      .catch((err) => {});
  }
  setCharts() {
    /**
     * @type {Array}
     */
    let config = this.props.config.needs.chartAndtables;
    let charts = config.filter((item) => item.key.match(/A[0-9]/g));
    this.setState({ charts });
  }
  componentDidMount() {
    this.setCharts();

    this.setTable1();
    let table1 = this.props.config.needs.chartAndtables.find(
      (item) => item.key === 'tb-summaryTrans'
    );

    this.interval1 = setInterval(() => {
      this.setTable1();
    }, table1.refresh_time * 1000);

    this.setTable2();
    let table2 = this.props.config.needs.chartAndtables.find(
      (item) => item.key === 'tb-GroupState'
    );
    this.interval2 = setInterval(() => {
      this.setTable2();
    }, table2.refresh_time * 1000);

    this.setTable3();
    let table3 = this.props.config.needs.chartAndtables.find(
      (item) => item.key === 'tb-StockLOrN'
    );
    this.interval3 = setInterval(() => {
      this.setTable3();
    }, table3.refresh_time * 1000);

    this.setTable4();
    let table4 = this.props.config.needs.chartAndtables.find(
      (item) => item.key === 'tb-Industrials'
    );
    this.interval4 = setInterval(() => {
      this.setTable4();
    }, table4.refresh_time * 1000);
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Tseshow</title>
        </Helmet>
        <Text size="lg">صفحه خانه</Text>
        <ITable
          column={summaryTrans.header}
          data={this.state.table1}
          title="خلاصه معاملات خرد سهام و صندوق ها"
        />
        <ITable
          column={totalSummeryGroupState.header}
          data={this.state.table2}
          title="آمار تفکیک شده معاملات خرد"
        />
        <ITable
          column={totalSummerStockLOrN.header}
          data={this.state.table3}
          title="حقیقی حقوقی"
        ></ITable>
        <NewsTable />

        <LoopChart charts={this.state.charts} />
        <ITable
          className="narrow"
          column={totalSummeryIndustrials.header}
          data={this.state.table4}
          title="خلاصه معاملات صنایع بورس (جهت مشاهده دیده بان هر گروه روی نام آن گروه کلیک کنید.)"
          fixedHeader
          fixedHeaderScrollHeight="80vh"
        />
        <ExtractCharTable />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  config: state.config,
});

export default connect(mapStateToProps)(Index);
