import { Component } from 'react';
import { connect } from 'react-redux';
import InstantCharts from '../instantCharts';
import { Group, Text, Select, Grid } from '@mantine/core';
import { getEveryFeeder } from '../../../../apis/main/main';
import Chart from '../../../../components/Chart';
import lodash from 'lodash';
import {setMarketId,setMainHeader} from "../../../../redux/reducers/main"
import { withRouter } from 'react-router-dom';

class SixChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      MoneyflowTotalEnterManyBuyerIHistoryData: [],
      MoneyflowTotalChangeBuySellHeadsHistoryData: [],
      symbolTradeLastDayHistoryData: [],
      symbolTradeValueHistoryData: [],
      symbolCounterBuyerSellerHistoryData: [],
      symbolTradeTimeValueHistoryData: [],
      id: this.props.route.match.params.id,
      withDate: false,
      DatePickerItems: [],
      DatePickerDefaultValue: '',
      SelectedDate: '',
      loadingDatePicker: false,
    };
  }
  getMoneyflowTotalEnterManyBuyerIHistoryData(date = this.state.SelectedDate) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find(
      (item) => item.key === 'symbolMoneyflowTotalEnterManyBuyerIHistory'
    );
    getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}/${date}`).then(
      (res) => {
        this.setState({
          MoneyflowTotalEnterManyBuyerIHistoryData: res.data.data.series,
        });
      }
    );
    this.MoneyflowTotalEnterManyBuyerIHistoryInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}/${date}`).then(
        (res) => {
          this.setState({
            MoneyflowTotalEnterManyBuyerIHistoryData: res.data.data.series,
          });
        }
      );
    }, thatItem.refresh_time * 1000);
  }

  getMoneyflowTotalChangeBuySellHeadsHistoryData(
    date = this.state.SelectedDate
  ) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find(
      (item) => item.key === 'symbolMoneyflowTotalChangeBuySellHeadsHistory'
    );
    getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}/${date}`).then(
      (res) => {
        this.setState({
          MoneyflowTotalChangeBuySellHeadsHistoryData: res.data.data.series,
        });
      }
    );
    this.MoneyflowTotalChangeBuySellHeadsHistoryInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}/${date}`).then(
        (res) => {
          this.setState({
            MoneyflowTotalChangeBuySellHeadsHistoryData: res.data.data.series,
          });
        }
      );
    }, thatItem.refresh_time * 1000);
  }

  getTradeLastDayHistoryData(date = this.state.SelectedDate) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find(
      (item) => item.key === 'symbolTradeLastDayHistory'
    );
    getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}/${date}`).then(
      (res) => {
        this.setState({
          symbolTradeLastDayHistoryData: res.data.data.series,
        });
      }
    );
    this.symbolTradeLastDayHistoryInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}/${date}`).then(
        (res) => {
          this.setState({
            symbolTradeLastDayHistoryData: res.data.data.series,
          });
        }
      );
    }, thatItem.refresh_time * 1000);
  }

  getTradeValueHistoryData(date = this.state.SelectedDate) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolTradeValueHistory');
    getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}/${date}`).then(
      (res) => {
        this.setState({
          symbolTradeValueHistoryData: res.data.data.series,
        });
      }
    );
    this.symbolTradeValueHistoryInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}/${date}`).then(
        (res) => {
          this.setState({
            symbolTradeValueHistoryData: res.data.data.series,
          });
        }
      );
    }, thatItem.refresh_time * 1000);
  }

  getCounterBuyerSellerHistoryData(date = this.state.SelectedDate) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find(
      (item) => item.key === 'symbolCounterBuyerSellerHistory'
    );
    getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}/${date}`).then(
      (res) => {
        this.setState({
          symbolCounterBuyerSellerHistoryData: res.data.data.series,
        });
      }
    );
    this.symbolCounterBuyerSellerHistoryInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}/${date}`).then(
        (res) => {
          this.setState({
            symbolCounterBuyerSellerHistoryData: res.data.data.series,
          });
        }
      );
    }, thatItem.refresh_time * 1000);
  }

  getTradeTimeValueHistoryData(date = this.state.SelectedDate) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find(
      (item) => item.key === 'symbolTradeTimeValueHistory'
    );
    getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}/${date}`).then(
      (res) => {
        this.setState({
          symbolTradeTimeValueHistoryData: res.data.data.series,
        });
      }
    );
    this.symbolTradeTimeValueHistoryInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}/${date}`).then(
        (res) => {
          this.setState({
            symbolTradeTimeValueHistoryData: res.data.data.series,
          });
        }
      );
    }, thatItem.refresh_time * 1000);
  }

  getInformation(id = this.state.id) {
    return new Promise((resolve, reject) => {
      let thatItem = this.props.chartAndtables;
      thatItem = thatItem.find((item) => item.key === 'symbolInfo');
      getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then((res) => {
        this.setState({
          title: res.data.data.name,
        });
        resolve(id);
      }).catch(err => {
        reject(err)
      })
    })
  }

  getDates(id = this.state.id) {
    this.setState({ loadingDatePicker: true });
    return new Promise((resolve, reject) => {
      let thatItem = this.props.chartAndtables;
      thatItem = thatItem.find((item) => item.key === 'symbolHistoryDate');
      getEveryFeeder(`${thatItem.feeder_url}/${id}`)
        .then((res) => {
          this.setState({
            DatePickerItems: res.data.data,
            DatePickerDefaultValue: res.data.data[0].value,
            SelectedDate: res.data.data[0].value,
            loadingDatePicker: false,
          });
          resolve(res.data.data[0].value);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  dateChanger = (e) => {
    this.setState({
      SelectedDate: e,
    });
    this.getMoneyflowTotalEnterManyBuyerIHistoryData(e);
    this.getMoneyflowTotalChangeBuySellHeadsHistoryData(e);
    this.getTradeLastDayHistoryData(e);
    this.getTradeValueHistoryData(e);
    this.getCounterBuyerSellerHistoryData(e);
    this.getTradeTimeValueHistoryData(e);
  };

  async componentDidMount() {
    this.props.setMarketId(this.state.id);
    this.props.setMainHeader(1);
    try {
      let id = await this.getInformation(this.state.id);
      let date = await this.getDates(id);
      this.getMoneyflowTotalEnterManyBuyerIHistoryData(date);
      this.getMoneyflowTotalChangeBuySellHeadsHistoryData(date);
      this.getTradeLastDayHistoryData(date);
      this.getTradeValueHistoryData(date);
      this.getCounterBuyerSellerHistoryData(date);
      this.getTradeTimeValueHistoryData(date);
    } catch (error) {
      console.log(error)
    }

    this.props.history.listen(async location => {
      let { pathname } = location;
      let URL_ID = pathname.split('/')[3];
      this.setState({id: URL_ID});
      this.props.setMarketId(URL_ID);
      try {
        let id = await this.getInformation(URL_ID);
        let date = await this.getDates(id);
        this.getMoneyflowTotalEnterManyBuyerIHistoryData(date);
        this.getMoneyflowTotalChangeBuySellHeadsHistoryData(date);
        this.getTradeLastDayHistoryData(date);
        this.getTradeValueHistoryData(date);
        this.getCounterBuyerSellerHistoryData(date);
        this.getTradeTimeValueHistoryData(date);
      } catch (error) {
        console.log(error)
      }
    })


  }
  componentWillUnmount() {
    this.props.setMainHeader(0);
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
        <Group position="apart">
          <Text>{this.state.title}</Text>
          {this.state.DatePickerDefaultValue !== '' && (
            <Select
              zIndex={9999999999}
              defaultValue={`${this.state.DatePickerDefaultValue}`}
              data={this.state.DatePickerItems}
              onChange={(e) => this.dateChanger(e)}
              disabled={this.state.loadingDatePicker}
            />
          )}
        </Group>
        <Grid mt="md">
          <Grid.Col sm={6} md={4}>
            <Chart
              special="FX1"
              data={this.state.MoneyflowTotalEnterManyBuyerIHistoryData}
              title="تغییرات ورود پول اشخاص حقیقی"
              type="area"
              height={300}
            />
          </Grid.Col>
          <Grid.Col sm={6} md={4}>
            <Chart
              special="FX2"
              data={this.state.MoneyflowTotalChangeBuySellHeadsHistoryData}
              title="تغییرات سرانه های خرید و فروش"
              type="line"

              height={300}
            />
          </Grid.Col>
          <Grid.Col sm={6} md={4}>
            <Chart
              special="FX3"
              data={this.state.symbolTradeLastDayHistoryData}
              title="نمودار تغییرات قیمت"
              type="area"

              height={300}
            />
          </Grid.Col>
          <Grid.Col sm={6} md={4}>
            <Chart
              special="FX4"
              data={this.state.symbolTradeValueHistoryData}
              title="تغییرات ارزش معاملات"
              type="area"

              height={300}
            />
          </Grid.Col>
          <Grid.Col sm={6} md={4}>
            <Chart
              special="FX5"
              data={this.state.symbolCounterBuyerSellerHistoryData}
              title="تغییرات تعداد کدهای خریدار و فروشنده"
              type="line"

              height={300}
            />
          </Grid.Col>
          <Grid.Col sm={6} md={4}>
            <Chart
              special="FX6"
              data={this.state.symbolTradeValueHistoryData}
              title="ارزش لحظه ای معاملات"
              type="bar"

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

const mapDispatchToProps = (dispatch) => ({
  setMarketId: (marketId) => dispatch(setMarketId(marketId)),
  setMainHeader: (id) => dispatch(setMainHeader(id)),
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SixChart));
