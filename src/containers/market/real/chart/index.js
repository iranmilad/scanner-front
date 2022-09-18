import React, { Component } from 'react';
import {
  Chip,
  Group,
  Input,
  Paper,
  Select,
  Text,
  Button,
  Modal,
  Grid,
  InputWrapper,
  Divider,
  MultiSelect,
  Chips,
  LoadingOverlay,
} from '@mantine/core';
import { Helmet } from 'react-helmet';
import { getEveryFeeder } from '../../../../apis/main';
import { createChart, PriceScaleMode, CrosshairMode } from 'lightweight-charts';
import { withRouter } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '../../../../components/FormsUI/TextField';
import { connect } from 'react-redux';
import { getMarket, setMarket } from '../../../../redux/reducers/market';
import lodash from 'lodash';
import colors from 'tailwindcss/colors';

class Market extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'بازار',
      industrieLists: [],
      shorttermData: null,
      midtermData: null,
      longtermData: null,
      shortmovingtermData: null,
      midmovingtermData: null,
      longmovingtermData: null,
      chipsValue: 0,
      comparisonPeriod: '',
      allowSelectLastChip: true,
      openedModal: false,
      overloayModal: false,
      loading: false,
      averageSettings: {
        shortterm: '10',
        midterm: '20',
        longterm: '50',
        shortmovingterm: '10',
        midmovingterm: '20',
        longmovingterm: '50',
      },
      pageID: props.route.match.params.id,
    };
    this.history = props.history;
    /**
     * Group id is the same as the market id
     * @type {string}
     */
    this.group = props.route.match.params.id;
    this.chartRef = React.createRef();
    this.chart = this.Candlestick = this.volumeStudy = null;
    this.candleStickData = [];
    /**
     * market is every data exists in the market chart page
     * @type {array}
     */
    this.market = props.marketData;
    this.shorttermChart =
      this.midtermChart =
      this.longtermChart =
      this.shortmovingtermChart =
      this.midmovingtermChart =
      this.longmovingtermChart =
      this.compareSell =
      this.compareBuy =
      this.chip1 =
      this.chip4 =
        null;
  }

  /**
   * get Industries groups list
   * it doesn't have a specific api route
   */
  async getGroupLists() {
    this.setState({ loading: true });
    try {
      let response = await getEveryFeeder(
        'https://feed.tseshow.com/api/totalIndustriesGroupHisory'
      );
      this.setState({ industrieLists: response.data.data, loading: false });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
    }
  }

  /**
   * change page parameter id without reloading page
   * @param {string} value
   */
  changeGroup(value) {
    this.history.push(`/stock/chart/${value}`);
  }

  /**
   * chips change event
   * @param {string} value
   */
  async onChangeChips(value) {
    this.setState({ chipsValue: value });

    if (+value >= 0 && +value <= 4) {
      if (this.compareBuy !== null)
        this.compareBuy.applyOptions({ visible: false });
      if (this.compareSell !== null)
        this.compareSell.applyOptions({ visible: false });
      if (+value === 0) {
        this.CandlestickInitialize(this.state.pageID);
      }
      this.VolumeStudyWorker(this.state.pageID, value);
      this.shortTermChartWorker(this.state.pageID, value);
      this.midTermChartWorker(this.state.pageID, value);
      this.longTermChartWorker(this.state.pageID, value);
      this.shortmovingtermWorker(this.state.pageID, value);
      this.midMovingTermChartWorker(this.state.pageID, value);
      this.longMovingTermChartWorker(this.state.pageID, value);
    } else {
      this.CompareBuyWorker();
      this.CompareSellWorker();
    }
  }

  /**
   * last chips child need a input to enable and disable.
   * if it is between 1 and 100 it will be enabled.
   * it just accepts the number.
   * @param {string} value
   */
  lastChipInputChange(value) {
    value.length > 0
      ? this.setState({ allowSelectLastChip: false })
      : this.setState({ allowSelectLastChip: true });
    if (value > 0 && value <= 100) {
      this.setState({ allowSelectLastChip: false });
    } else {
      this.setState({ allowSelectLastChip: true });
    }
    this.setState({ comparisonPeriod: value });
  }

  /**
   * this a method for candle stick chart.
   * candle stick chart is a first chart to load.
   *
   * @param {string} id
   */
  async CandlestickInitialize(id = this.group) {
    if (this.Candlestick === null)
      this.Candlestick = this.chart.addCandlestickSeries({
        priceScaleId: 'right',
        visible: true,
      });
    this.Candlestick.applyOptions({
      visible: true,
    });
    this.setState({ loading: true });
    try {
      let response = await getEveryFeeder(
        `https://feed.tseshow.com/api/stock/chart/${id}`
      );
      this.setState({ loading: false });
      this.Candlestick.setData(response.data.data);
      this.candleStickData = response.data.data;
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
    }
  }

  /**
   *
   * @param {array} values
   */
  chartDisplaySettings(values) {
    this.Candlestick.applyOptions({
      visible: values.includes('0') ? false : true,
    });
    this.chart.applyOptions({
      rightPriceScale: {
        mode: values.includes('1')
          ? PriceScaleMode.Logarithmic
          : PriceScaleMode.Normal,
      },
    });
  }

  /**
   * average settings forms handle submit
   * @param {array} values
   */
  handleAverageSettings(values) {
    if (
      values.shortterm == this.state.averageSettings.shortterm &&
      values.midterm == this.state.averageSettings.midterm &&
      values.longterm == this.state.averageSettings.longterm &&
      values.shortmovingterm == this.state.averageSettings.shortmovingterm &&
      values.midmovingterm == this.state.averageSettings.midmovingterm &&
      values.longmovingterm == this.state.averageSettings.longmovingterm
    )
      return;
    // compare two objects and return the difference
    this.setState({ averageSettings: values });
    this.shortTermChartWorker();
    this.midTermChartWorker();
    this.longTermChartWorker();
    this.shortMovingTermChartWorker();
    this.midMovingTermChartWorker();
    this.longMovingTermChartWorker();
  }

  /**
   * Show averages on the chart
   * @param {array} values
   */
  averagesDisplaySettings(values) {
    this.volumeStudy.applyOptions({
      visible: values.includes('0') ? true : false,
    });
    this.shorttermChart.applyOptions({
      visible: values.includes('1') ? true : false,
    });
    this.midtermChart.applyOptions({
      visible: values.includes('2') ? true : false,
    });
    this.longtermChart.applyOptions({
      visible: values.includes('3') ? true : false,
    });
    this.shortmovingtermChart.applyOptions({
      visible: values.includes('4') ? true : false,
    });
    this.midmovingtermChart.applyOptions({
      visible: values.includes('5') ? true : false,
    });
    this.longmovingtermChart.applyOptions({
      visible: values.includes('6') ? true : false,
    });
  }

  async VolumeStudyWorker(id = this.group, chips = this.state.chipsValue) {
    if (this.volumeStudy === null)
      this.volumeStudy = this.volumeStudy = this.chart.addHistogramSeries({
        color: colors.blue[500],
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: 'left',
        overlay: true,
        visible: false,
        scaleMargins: {
          top: 0.5,
          bottom: 0,
        },
      });
    if (chips !== 5) {
      this.setState({ loading: true });
      try {
        let volumeData = await getEveryFeeder(
          `https://feed.tseshow.com/api/stock/movingAveragePrice/${id}/1`
        );
        this.volumeStudy.setData(volumeData.data.data);
        this.setState({ loading: false });
      } catch (error) {
        this.setState({ loading: false });
        console.log(error);
      }
    }
  }

  async CompareSellWorker() {
    if (this.compareSell === null)
      this.compareSell = this.chart.addLineSeries({
        color: colors.red[500],
        visible: true,
      });
    if (this.Candlestick !== null) {
      this.Candlestick.applyOptions({
        visible: false,
      });
    }
    this.compareSell.applyOptions({ visible: true });
    this.setState({ loading: true });
    try {
      let compareData = await getEveryFeeder(
        `https://feed.tseshow.com/api/stock/movingAverage/${this.state.pageID}/3/${this.state.comparisonPeriod}`
      );
      this.compareSell.setData(compareData.data.data);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });

      console.log(error);
    }
  }

  async CompareBuyWorker() {
    if (this.compareBuy === null)
      this.compareBuy = this.chart.addLineSeries({
        color: colors.green[500],
        visible: true,
      });
    if (this.Candlestick !== null) {
      this.Candlestick.applyOptions({
        visible: true,
      });
    }
    this.compareBuy.applyOptions({ visible: true });
    this.setState({ loading: true });

    try {
      let compareData = await getEveryFeeder(
        `https://feed.tseshow.com/api/stock/movingAverage/${this.state.pageID}/2/${this.state.comparisonPeriod}`
      );
      this.compareBuy.setData(compareData.data.data);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });

      console.log(error);
    }
  }

  async shortTermChartWorker(
    id = this.state.pageID,
    chips = this.state.chipsValue
  ) {
    if (this.shorttermChart === null)
      this.shorttermChart = this.chart.addLineSeries({
        color: colors.emerald[600],
        visible: false,
        priceScaleId: 'left',
        priceFormat: {
          type: 'volume',
        },
        scaleMargins: {
          top: 0.5,
          bottom: 0,
        },
      });
    this.setState({ loading: true });

    try {
      let shortterm = await getEveryFeeder(
        `https://feed.tseshow.com/api/stock/movingAverage/${id}/${chips}/${this.state.averageSettings.shortterm}`
      );
      this.shorttermChart.setData([
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "14"
          },
          "value": 2248
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "15"
          },
          "value": 2207
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "16"
          },
          "value": 2205
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "17"
          },
          "value": 2194
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "18"
          },
          "value": 2193
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "21"
          },
          "value": 2185
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "22"
          },
          "value": 2176
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "23"
          },
          "value": 2153
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "24"
          },
          "value": 2136
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "25"
          },
          "value": 2124
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "28"
          },
          "value": 2103
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "29"
          },
          "value": 2076
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "30"
          },
          "value": 2053
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "31"
          },
          "value": 2033
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "01"
          },
          "value": 2017
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "06"
          },
          "value": 1994
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "07"
          },
          "value": 1974
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "08"
          },
          "value": 1958
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "11"
          },
          "value": 1941
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "12"
          },
          "value": 1927
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "13"
          },
          "value": 1925
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "14"
          },
          "value": 1926
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "15"
          },
          "value": 1921
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "19"
          },
          "value": 1910
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "20"
          },
          "value": 1907
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "21"
          },
          "value": 1905
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "22"
          },
          "value": 1907
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "25"
          },
          "value": 1918
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "26"
          },
          "value": 1920
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "27"
          },
          "value": 1921
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "28"
          },
          "value": 1927
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "29"
          },
          "value": 1931
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "02"
          },
          "value": 1925
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "03"
          },
          "value": 1921
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "04"
          },
          "value": 1919
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "05"
          },
          "value": 1916
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "06"
          },
          "value": 1907
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "09"
          },
          "value": 1897
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "11"
          },
          "value": 1880
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "12"
          },
          "value": 1869
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "13"
          },
          "value": 1863
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "16"
          },
          "value": 1852
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "17"
          },
          "value": 1842
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "19"
          },
          "value": 1833
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "20"
          },
          "value": 1825
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "23"
          },
          "value": 1819
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "24"
          },
          "value": 1810
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "25"
          },
          "value": 1794
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "26"
          },
          "value": 1779
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "27"
          },
          "value": 1767
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "30"
          },
          "value": 1752
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "31"
          },
          "value": 1731
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "01"
          },
          "value": 1715
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "02"
          },
          "value": 1700
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "03"
          },
          "value": 1694
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "06"
          },
          "value": 1697
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "09"
          },
          "value": 1704
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "10"
          },
          "value": 1711
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "13"
          },
          "value": 1726
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "14"
          },
          "value": 1747
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "15"
          },
          "value": 1771
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "16"
          },
          "value": 1800
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "17"
          },
          "value": 1836
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "27"
          },
          "value": 1858
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "28"
          },
          "value": 1879
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "29"
          },
          "value": 1897
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "30"
          },
          "value": 1907
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "31"
          },
          "value": 1919
        }
      ]);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });

      console.log(error);
    }
  }

  async midTermChartWorker(
    id = this.state.pageID,
    chips = this.state.chipsValue
  ) {
    if (this.midtermChart === null)
      this.midtermChart = this.chart.addLineSeries({
        color: colors.red[600],
        visible: false,
        priceScaleId: 'left',
        priceFormat: {
          type: 'volume',
        },
        scaleMargins: {
          top: 0.5,
          bottom: 0,
        },
      });
    this.setState({ loading: true });

    try {
      let midterm = await getEveryFeeder(
        `https://feed.tseshow.com/api/stock/movingAverage/${id}/${chips}/${this.state.averageSettings.midterm}`
      );
      this.midtermChart.setData([
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "14"
          },
          "value": 2248
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "15"
          },
          "value": 2208
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "16"
          },
          "value": 2206
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "17"
          },
          "value": 2195
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "18"
          },
          "value": 2194
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "21"
          },
          "value": 2187
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "22"
          },
          "value": 2179
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "23"
          },
          "value": 2159
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "24"
          },
          "value": 2145
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "25"
          },
          "value": 2135
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "28"
          },
          "value": 2117
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "29"
          },
          "value": 2095
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "30"
          },
          "value": 2077
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "31"
          },
          "value": 2060
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "01"
          },
          "value": 2046
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "06"
          },
          "value": 2027
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "07"
          },
          "value": 2012
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "08"
          },
          "value": 1998
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "11"
          },
          "value": 1984
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "12"
          },
          "value": 1972
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "13"
          },
          "value": 1967
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "14"
          },
          "value": 1965
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "15"
          },
          "value": 1960
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "19"
          },
          "value": 1950
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "20"
          },
          "value": 1946
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "21"
          },
          "value": 1943
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "22"
          },
          "value": 1941
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "25"
          },
          "value": 1946
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "26"
          },
          "value": 1945
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "27"
          },
          "value": 1944
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "28"
          },
          "value": 1946
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "29"
          },
          "value": 1947
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "02"
          },
          "value": 1944
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "03"
          },
          "value": 1940
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "04"
          },
          "value": 1938
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "05"
          },
          "value": 1936
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "06"
          },
          "value": 1930
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "09"
          },
          "value": 1923
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "11"
          },
          "value": 1914
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "12"
          },
          "value": 1907
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "13"
          },
          "value": 1902
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "16"
          },
          "value": 1894
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "17"
          },
          "value": 1887
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "19"
          },
          "value": 1881
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "20"
          },
          "value": 1875
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "23"
          },
          "value": 1869
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "24"
          },
          "value": 1863
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "25"
          },
          "value": 1853
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "26"
          },
          "value": 1843
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "27"
          },
          "value": 1834
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "30"
          },
          "value": 1824
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "31"
          },
          "value": 1811
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "01"
          },
          "value": 1800
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "02"
          },
          "value": 1789
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "03"
          },
          "value": 1783
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "06"
          },
          "value": 1780
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "09"
          },
          "value": 1780
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "10"
          },
          "value": 1780
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "13"
          },
          "value": 1783
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "14"
          },
          "value": 1790
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "15"
          },
          "value": 1800
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "16"
          },
          "value": 1811
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "17"
          },
          "value": 1827
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "27"
          },
          "value": 1837
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "28"
          },
          "value": 1847
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "29"
          },
          "value": 1857
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "30"
          },
          "value": 1863
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "31"
          },
          "value": 1870
        }
      ]);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });

      console.log(error);
    }
  }

  async longTermChartWorker(
    id = this.state.pageID,
    chips = this.state.chipsValue
  ) {
    if (this.longtermChart === null)
      this.longtermChart = this.chart.addLineSeries({
        color: colors.yellow[600],
        visible: false,
        priceScaleId: 'left',
        priceFormat: {
          type: 'volume',
        },
        scaleMargins: {
          top: 0.5,
          bottom: 0,
        },
      });
    this.setState({ loading: true });

    try {
      let longterm = await getEveryFeeder(
        `https://feed.tseshow.com/api/stock/movingAverage/${id}/${chips}/${this.state.averageSettings.longterm}`
      );
      this.longtermChart.setData([
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "13"
          },
          "value": 2248
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "14"
          },
          "value": 2205
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "15"
          },
          "value": 2204
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "16"
          },
          "value": 2191
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "17"
          },
          "value": 2191
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "20"
          },
          "value": 2181
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "21"
          },
          "value": 2171
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "22"
          },
          "value": 2141
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "23"
          },
          "value": 2121
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "24"
          },
          "value": 2108
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "27"
          },
          "value": 2081
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "28"
          },
          "value": 2046
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "29"
          },
          "value": 2018
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "30"
          },
          "value": 1993
        },
        {
          "time": {
            "year": "2022",
            "month": "05",
            "day": "31"
          },
          "value": 1976
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "05"
          },
          "value": 1946
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "06"
          },
          "value": 1925
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "07"
          },
          "value": 1908
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "10"
          },
          "value": 1888
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "11"
          },
          "value": 1875
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "12"
          },
          "value": 1880
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "13"
          },
          "value": 1890
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "14"
          },
          "value": 1889
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "18"
          },
          "value": 1875
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "19"
          },
          "value": 1877
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "20"
          },
          "value": 1879
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "21"
          },
          "value": 1887
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "24"
          },
          "value": 1910
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "25"
          },
          "value": 1915
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "26"
          },
          "value": 1918
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "27"
          },
          "value": 1929
        },
        {
          "time": {
            "year": "2022",
            "month": "06",
            "day": "28"
          },
          "value": 1936
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "01"
          },
          "value": 1925
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "02"
          },
          "value": 1916
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "03"
          },
          "value": 1915
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "04"
          },
          "value": 1910
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "05"
          },
          "value": 1894
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "08"
          },
          "value": 1877
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "10"
          },
          "value": 1850
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "11"
          },
          "value": 1835
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "12"
          },
          "value": 1829
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "15"
          },
          "value": 1815
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "16"
          },
          "value": 1803
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "18"
          },
          "value": 1794
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "19"
          },
          "value": 1786
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "22"
          },
          "value": 1780
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "23"
          },
          "value": 1771
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "24"
          },
          "value": 1748
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "25"
          },
          "value": 1727
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "26"
          },
          "value": 1715
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "29"
          },
          "value": 1695
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "30"
          },
          "value": 1666
        },
        {
          "time": {
            "year": "2022",
            "month": "07",
            "day": "31"
          },
          "value": 1647
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "01"
          },
          "value": 1632
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "02"
          },
          "value": 1633
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "05"
          },
          "value": 1648
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "08"
          },
          "value": 1672
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "09"
          },
          "value": 1691
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "12"
          },
          "value": 1722
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "13"
          },
          "value": 1762
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "14"
          },
          "value": 1807
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "15"
          },
          "value": 1856
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "16"
          },
          "value": 1913
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "26"
          },
          "value": 1941
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "27"
          },
          "value": 1966
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "28"
          },
          "value": 1985
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "29"
          },
          "value": 1988
        },
        {
          "time": {
            "year": "2022",
            "month": "08",
            "day": "30"
          },
          "value": 1995
        }
      ]);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });

      console.log(error);
    }
  }

  async shortmovingtermWorker(id = this.state.pageID) {
    if (this.shortmovingtermChart === null)
      this.shortmovingtermChart = this.chart.addLineSeries({
        color: colors.blue[600],
        visible: false,
      });
    this.setState({ loading: true });

    try {
      let shortmovingterm = await getEveryFeeder(
        `https://feed.tseshow.com/api/stock/movingAveragePrice/${id}/${this.state.averageSettings.shortmovingterm}`
      );
      this.shortmovingtermChart.setData(shortmovingterm.data.data);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });

      console.log(error);
    }
  }

  async midmovingtermWorker(id = this.state.pageID) {
    if (this.midmovingtermChart === null)
      this.midmovingtermChart = this.chart.addLineSeries({
        color: colors.green[600],
        visible: false,
      });
    this.setState({ loading: true });

    try {
      let midtmovingterm = await getEveryFeeder(
        `https://feed.tseshow.com/api/stock/movingAveragePrice/${id}/${this.state.averageSettings.midmovingterm}`
      );
      this.midmovingtermChart.setData(midtmovingterm.data.data);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });

      console.log(error);
    }
  }

  async longmovingtermWorker(id = this.state.pageID) {
    if (this.longmovingtermChart === null)
      this.longmovingtermChart = this.chart.addLineSeries({
        color: colors.yellow[600],
        visible: false,
      });
    this.setState({ loading: true });

    try {
      let longtmovingterm = await getEveryFeeder(
        `https://feed.tseshow.com/api/stock/movingAveragePrice/${id}/${this.state.averageSettings.longmovingterm}`
      );
      this.longmovingtermChart.setData(longtmovingterm.data.data);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
    }
  }

  componentDidMount() {
    this.getGroupLists();
    // CREATE CHART
    this.chart = createChart(this.chartRef.current, {
      width: this.chartRef.current.offsetWidth,
      height: this.chartRef.current.offsetHeight,
      overlayPriceScales: {
        visible: false,
      },
      grid: {
        horzLines: {
          color: 'rgba(240, 243, 250,1)',
        },
        vertLines: {
          color: 'rgba(240, 243, 250,0)',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        visible: true,
        borderColor: 'rgba(197, 203, 206, 1)',
        scaleMargins: {
          top: 0,
          bottom: 0.5,
        },
      },
      leftPriceScale: {
        visible: true,
        borderColor: 'rgba(197, 203, 206, 1)',
        scaleMargins: {
          top: 0.5,
          bottom: 0,
        },
      },
      layout: {
        backgroundColor: '#ffffff',
        textColor: 'rgba(33, 56, 77, 1)',
      },
    });

    this.CandlestickInitialize();
    this.VolumeStudyWorker();
    this.shortTermChartWorker();
    this.midTermChartWorker();
    this.longTermChartWorker();
    this.shortmovingtermWorker();
    this.midmovingtermWorker();
    this.longmovingtermWorker();

    /**
     * change candle stick data
     */
    this.history.listen((location) => {
      let { pathname } = location;
      let id = pathname.split('/')[3];
      this.setState({ pageID: id });
      this.CandlestickInitialize(id);
      // this.VolumeStudyWorker(id);
      if (!this.state.chipsValue.includes('0')) {
        this.getNormalAverages(id);
        this.getMovingAverages(id);
        this.shortTermChartWorker();
        this.midTermChartWorker();
        this.longTermChartWorker();
        this.shortmovingtermWorker();
        this.midmovingtermWorker();
        this.longmovingtermWorker();
      }
    });
  }
  render() {
    return (
      <>
        <Helmet>
          <title>نمودار های جریانات نقدینگی {this.state.title}</title>
        </Helmet>
        <Group position="apart">
          <Text>{this.state.title}</Text>
          <Select
            onChange={(e) => this.changeGroup(e)}
            placeholder="انتخاب کنید"
            data={this.state.industrieLists}
          />
        </Group>
        <Paper p="lg" shadow="xs" radius="md" mt="lg">
          <Chips
            defaultValue="0"
            radius="sm"
            onChange={(e) => this.onChangeChips(e)}
          >
            <Chip value="0" defaultChecked>
              ورود پول
            </Chip>
            <Chip value="1">ارزش میانگین معاملات</Chip>
            <Chip value="2">سرانه خرید</Chip>
            <Chip value="3">سرانه فروش</Chip>
            <Chip value="4">قدرت خرید</Chip>
            <Chip value="5" disabled={this.state.allowSelectLastChip}>
              مقایسه ای سرانه خرید و فروش
            </Chip>
          </Chips>
          <Group mt="sm">
            <Input
              value={this.state.comparisonPeriod}
              min={1}
              max={100}
              maxLength={3}
              size="xs"
              onChange={(e) => this.lastChipInputChange(e.target.value)}
              placeholder="دوره مقایسه بین 1 تا 100"
              inputMode="numeric"
            />
            <Button
              size="xs"
              variant="outline"
              onClick={() => this.setState({ openedModal: true })}
            >
              تنظیم دوره های میانگین
            </Button>
          </Group>
          <Divider my="lg" label="بیشتر" labelPosition="center" />
          <Group position="apart">
            <MultiSelect
              clearable
              placeholder="انتخاب کنید"
              onChange={(e) => this.chartDisplaySettings(e)}
              label="تنظیمات نمایشی"
              data={[
                { value: '0', label: 'مخفی کردن نمودار قیمت' },
                { value: '1', label: 'لگاریتمی' },
              ]}
            />
            <div className="relative">
              <MultiSelect
                clearable
                placeholder="انتخاب کنید"
                label="میانگین ها"
                onChange={(e) => this.averagesDisplaySettings(e)}
                data={[
                  { value: '0', label: 'بازار' },
                  { value: '1', label: 'کوتاه مدت' },
                  { value: '2', label: 'میان مدت' },
                  { value: '3', label: 'بلند مدت' },
                  { value: '4', label: 'متحرک کوتاه مدت - پول' },
                  { value: '5', label: 'متحرک میان مدت - پول' },
                  { value: '6', label: 'متحرک بلند مدت - پول' },
                ]}
              />
            </div>
          </Group>
          <div className='h-[70vh] relative'>
            <LoadingOverlay visible={this.state.loading} loaderProps={{variant:"dots"}} />
            <div ref={this.chartRef} className="mt-10 w-full h-full"  />
          </div>
        </Paper>
        <Modal
          dir="rtl"
          title="تنظیم دوره های میانگین"
          zIndex={9999999999}
          opened={this.state.openedModal}
          onClose={() => this.setState({ openedModal: false })}
        >
          <Formik
            enableReinitialize
            initialValues={{
              shortterm: this.state.averageSettings.shortterm,
              midterm: this.state.averageSettings.midterm,
              longterm: this.state.averageSettings.longterm,
              shortmovingterm: this.state.averageSettings.shortmovingterm,
              midmovingterm: this.state.averageSettings.midmovingterm,
              longmovingterm: this.state.averageSettings.longmovingterm,
            }}
            validationSchema={FormSchema}
            onSubmit={(values) => this.handleAverageSettings(values)}
          >
            <Form>
              <Grid>
                <Grid.Col md={6} sm={12}>
                  <InputWrapper label="دوره میانگین کوتاه مدت">
                    <TextField placeholder="1 تا 50" name="shortterm" />
                  </InputWrapper>
                </Grid.Col>
                <Grid.Col md={6} sm={12}>
                  <InputWrapper label="دوره میانگین میان مدت">
                    <TextField placeholder="1 تا 100" name="midterm" />
                  </InputWrapper>
                </Grid.Col>
                <Grid.Col md={6} sm={12}>
                  <InputWrapper label="دوره میانگین بلند مدت">
                    <TextField placeholder="1 تا 200" name="longterm" />
                  </InputWrapper>
                </Grid.Col>
                <Grid.Col md={6} sm={12}>
                  <InputWrapper label="دوره میانگین متحرک کوتاه مدت">
                    <TextField placeholder="1 تا 200" name="shortmovingterm" />
                  </InputWrapper>
                </Grid.Col>
                <Grid.Col md={6} sm={12}>
                  <InputWrapper label="دوره میانگین متحرک میان مدت">
                    <TextField placeholder="1 تا 200" name="midmovingterm" />
                  </InputWrapper>
                </Grid.Col>
                <Grid.Col md={6} sm={12}>
                  <InputWrapper label="دوره میانگین متحرک بلند مدت">
                    <TextField placeholder="1 تا 200" name="longmovingterm" />
                  </InputWrapper>
                </Grid.Col>
              </Grid>
              <Group position="apart" mt="lg">
                <Button
                  color="green"
                  size="sm"
                  type="submit"
                  loading={this.state.overloayModal}
                >
                  ثبت
                </Button>
              </Group>
            </Form>
          </Formik>
        </Modal>
      </>
    );
  }
}

const FormSchema = Yup.object().shape({
  shortterm: Yup.number()
    .min(1, 'دوره میانگین کوتاه مدت باید بیشتر از 1 باشد')
    .max(50, 'دوره میانگین کوتاه مدت باید کمتر از 50 باشد')
    .typeError('دوره میانگین کوتاه مدت باید عدد باشد')
    .required('دوره میانگین کوتاه مدت را وارد کنید'),
  midterm: Yup.number()
    .min(1, 'دوره میانگین میان مدت باید بیشتر از 1 باشد')
    .max(100, 'دوره میانگین میان مدت باید کمتر از 100 باشد')
    .typeError('دوره میانگین میان مدت باید عدد باشد')
    .required('دوره میانگین میان مدت را وارد کنید'),
  longterm: Yup.number()
    .min(1, 'دوره میانگین بلند مدت باید بیشتر از 1 باشد')
    .max(200, 'دوره میانگین بلند مدت باید کمتر از 200 باشد')
    .typeError('دوره میانگین بلند مدت باید عدد باشد')
    .required('دوره میانگین بلند مدت را وارد کنید'),
  shortmovingterm: Yup.number()
    .min(1, 'دوره میانگین متحرک کوتاه مدت باید بیشتر از 1 باشد')
    .max(200, 'دوره میانگین متحرک کوتاه مدت باید کمتر از 200 باشد')
    .typeError('دوره میانگین متحرک کوتاه مدت باید عدد باشد')
    .required('دوره میانگین متحرک کوتاه مدت را وارد کنید'),
  midmovingterm: Yup.number()
    .min(1, 'دوره میانگین متحرک میان مدت باید بیشتر از 1 باشد')
    .max(200, 'دوره میانگین متحرک میان مدت باید کمتر از 200 باشد')
    .typeError('دوره میانگین متحرک میان مدت باید عدد باشد')
    .required('دوره میانگین متحرک میان مدت را وارد کنید'),
  longmovingterm: Yup.number()
    .min(1, 'دوره میانگین متحرک بلند مدت باید بیشتر از 1 باشد')
    .max(200, 'دوره میانگین متحرک بلند مدت باید کمتر از 200 باشد')
    .typeError('دوره میانگین متحرک بلند مدت باید عدد باشد')
    .required('دوره میانگین متحرک بلند مدت را وارد کنید'),
});

/**
 * Mapping states to props
 * @param {object} state
 * @returns
 */
const mapStateToProps = (state) => ({
  marketData: state.market,
  chartAndtables: state.config.needs.chartAndtables
});

/**
 * Mapping actions to props
 * @param {object} dispatch
 * @returns
 */
const mapDispatchToProps = (dispatch) => ({
  setMarket: (data) => dispatch(setMarket(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Market));
