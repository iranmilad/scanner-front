import { Grid } from '@mantine/core';
import { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../../../components/Chart';
import { getEveryFeeder } from '../../../apis/main';
import { Text } from '@mantine/core';
import { Group } from '@mantine/core';
import { Select } from '@mantine/core';

class InstantCharts extends Component {
  state = {
    MoneyflowTotalEnterManyBuyerIHistoryData: [],
    MoneyflowTotalChangeBuySellHeadsHistoryData: [],
    symbolTradeLastDayHistoryData: [],
    symbolTradeValueHistoryData: [],
    symbolCounterBuyerSellerHistoryData: [],
    symbolTradeTimeValueHistoryData: [],
    id: this.props.stockId,
    withDate: false
  };

  getMoneyflowTotalEnterManyBuyerIHistoryData() {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find(
      (item) => item.key === 'symbolMoneyflowTotalEnterManyBuyerIHistory'
    );
    getEveryFeeder(`${thatItem.feeder_url}/${this.props.stockId}`).then(
      (res) => {
        this.setState({
          MoneyflowTotalEnterManyBuyerIHistoryData: res.data.data.series,
        });
      }
    );
    this.MoneyflowTotalEnterManyBuyerIHistoryInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${this.props.stockId}`).then(
        (res) => {
          this.setState({
            MoneyflowTotalEnterManyBuyerIHistoryData: res.data.data.series,
          });
        }
      );
    }, thatItem.refresh_time * 1000);
  }

  getMoneyflowTotalChangeBuySellHeadsHistoryData() {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find(
      (item) => item.key === 'symbolMoneyflowTotalChangeBuySellHeadsHistory'
    );
    getEveryFeeder(`${thatItem.feeder_url}/${this.props.stockId}`).then(
      (res) => {
        this.setState({
          MoneyflowTotalChangeBuySellHeadsHistoryData: res.data.data.series,
        });
      }
    );
    this.MoneyflowTotalChangeBuySellHeadsHistoryInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${this.props.stockId}`).then(
        (res) => {
          this.setState({
            MoneyflowTotalChangeBuySellHeadsHistoryData: res.data.data.series,
          });
        }
      );
    }, thatItem.refresh_time * 1000);
  }

  getTradeLastDayHistoryData() {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find(
      (item) => item.key === 'symbolTradeLastDayHistory'
    );
    getEveryFeeder(`${thatItem.feeder_url}/${this.props.stockId}`).then(
      (res) => {
        this.setState({
          symbolTradeLastDayHistoryData: res.data.data.series,
        });
      }
    );
    this.symbolTradeLastDayHistoryInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${this.props.stockId}`).then(
        (res) => {
          this.setState({
            symbolTradeLastDayHistoryData: res.data.data.series,
          });
        }
      );
    }, thatItem.refresh_time * 1000);
  }

  getTradeValueHistoryData() {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolTradeValueHistory');
    getEveryFeeder(`${thatItem.feeder_url}/${this.props.stockId}`).then(
      (res) => {
        this.setState({
          symbolTradeValueHistoryData: res.data.data.series,
        });
      }
    );
    this.symbolTradeValueHistoryInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${this.props.stockId}`).then(
        (res) => {
          this.setState({
            symbolTradeValueHistoryData: res.data.data.series,
          });
        }
      );
    }, thatItem.refresh_time * 1000);
  }

  getCounterBuyerSellerHistoryData() {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find(
      (item) => item.key === 'symbolCounterBuyerSellerHistory'
    );
    getEveryFeeder(`${thatItem.feeder_url}/${this.props.stockId}`).then(
      (res) => {
        this.setState({
          symbolCounterBuyerSellerHistoryData: res.data.data.series,
        });
      }
    );
    this.symbolCounterBuyerSellerHistoryInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${this.props.stockId}`).then(
        (res) => {
          this.setState({
            symbolCounterBuyerSellerHistoryData: res.data.data.series,
          });
        }
      );
    }, thatItem.refresh_time * 1000);
  }

  getTradeTimeValueHistoryData() {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find(
      (item) => item.key === 'symbolTradeTimeValueHistory'
    );
    getEveryFeeder(`${thatItem.feeder_url}/${this.props.stockId}`).then(
      (res) => {
        this.setState({
          symbolTradeTimeValueHistoryData: res.data.data.series,
        });
      }
    );
    this.symbolTradeTimeValueHistoryInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${this.props.stockId}`).then(
        (res) => {
          this.setState({
            symbolTradeTimeValueHistoryData: res.data.data.series,
          });
        }
      );
    }, thatItem.refresh_time * 1000);
  }

  componentDidMount() {
    this.getMoneyflowTotalEnterManyBuyerIHistoryData();
    this.getMoneyflowTotalChangeBuySellHeadsHistoryData();
    this.getTradeLastDayHistoryData();
    this.getTradeValueHistoryData();
    this.getCounterBuyerSellerHistoryData();
    this.getTradeTimeValueHistoryData();
  }
  componentWillUnmount() {
    clearInterval(this.MoneyflowTotalEnterManyBuyerIHistoryInterval);
    clearInterval(this.MoneyflowTotalChangeBuySellHeadsHistoryInterval);
    clearInterval(this.symbolTradeLastDayHistoryInterval);
    clearInterval(this.symbolTradeValueHistoryInterval);
    clearInterval(this.symbolCounterBuyerSellerHistoryInterval);
    clearInterval(this.symbolTradeTimeValueHistoryInterval);
  }
  render() {
    return (
      <>
        <Grid mt="md">
          <Grid.Col sm={6} md={4}>
            <Chart
              special="FX1"
              data={this.state.MoneyflowTotalEnterManyBuyerIHistoryData}
              title="تغییرات ورود پول اشخاص حقیقی"
              type="area"
              width={350}
              height={300}
            />
          </Grid.Col>
          <Grid.Col sm={6} md={4}>
            <Chart
              special="FX2"
              data={this.state.MoneyflowTotalChangeBuySellHeadsHistoryData}
              title="تغییرات سرانه های خرید و فروش"
              type="line"
              width={350}
              height={300}
            />
          </Grid.Col>
          <Grid.Col sm={6} md={4}>
            <Chart
              special="FX3"
              data={this.state.symbolTradeLastDayHistoryData}
              title="نمودار تغییرات قیمت"
              type="area"
              width={350}
              height={300}
            />
          </Grid.Col>
          <Grid.Col sm={6} md={4}>
            <Chart
              special="FX4"
              data={this.state.symbolTradeValueHistoryData}
              title="تغییرات ارزش معاملات"
              type="area"
              width={350}
              height={300}
            />
          </Grid.Col>
          <Grid.Col sm={6} md={4}>
            <Chart
              special="FX5"
              data={this.state.symbolCounterBuyerSellerHistoryData}
              title="تغییرات تعداد کدهای خریدار و فروشنده"
              type="line"
              width={350}
              height={300}
            />
          </Grid.Col>
          <Grid.Col sm={6} md={4}>
            <Chart
              special="FX6"
              data={this.state.symbolTradeValueHistoryData}
              title="ارزش لحظه ای معاملات"
              type="bar"
              width={350}
              height={300}
            />
          </Grid.Col>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
});

export default connect(mapStateToProps, null)(InstantCharts);
