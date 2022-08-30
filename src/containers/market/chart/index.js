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
  TextInput,
  Divider,
  MultiSelect,
  LoadingOverlay,
} from '@mantine/core';
import { Helmet } from 'react-helmet';
import { getEveryFeeder } from '../../../apis/main';
import { createChart, PriceScaleMode, CrosshairMode } from 'lightweight-charts';
import { withRouter } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '../../../components/FormsUI/TextField';
import { connect } from 'react-redux';
import { getMarket, setMarket } from '../../../redux/reducers/market';
import lodash from 'lodash';
import colors from 'tailwindcss/colors';

class Market extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "بازار",
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
    try {
      let response = await getEveryFeeder('https://feed.tseshow.com/api/totalIndustriesGroupHisory');
      this.setState({ industrieLists: response.data.data });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * change page parameter id without reloading page
   * @param {string} value
   */
  changeGroup(value) {
    this.history.push(`https://feed.tseshow.com/api/market/chart/${value}`);
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
    try {
      let response = await getEveryFeeder(`https://feed.tseshow.com/api/market/chart/${id}`);
      this.Candlestick.setData(response.data.data);
      this.candleStickData = response.data.data;
    } catch (error) {
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
      rightPriceScale: values.includes('1')
        ? PriceScaleMode.Logarithmic
        : PriceScaleMode.Normal,
    });
    this.volumeStudy.applyOptions({
      visible: values.includes('2') ? true : false,
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
    this.shorttermChart.applyOptions({
      visible: values.includes('0') ? true : false,
    });
    this.midtermChart.applyOptions({
      visible: values.includes('1') ? true : false,
    });
    this.longtermChart.applyOptions({
      visible: values.includes('2') ? true : false,
    });
    this.shortmovingtermChart.applyOptions({
      visible: values.includes('3') ? true : false,
    });
    this.midmovingtermChart.applyOptions({
      visible: values.includes('4') ? true : false,
    });
    this.longmovingtermChart.applyOptions({
      visible: values.includes('5') ? true : false,
    });
  }

  async VolumeStudyWorker(id = this.group, chips = this.state.chipsValue) {
    if (this.volumeStudy === null)
      this.volumeStudy = this.volumeStudy = this.chart.addHistogramSeries({
        color: colors.blue[500],
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: '',
        visible: false,
        overlay: true,
        scaleMargins: {
          top: 0.5,
          bottom: 0,
        },
      });
    if (chips !== 5) {
      try {
        let volumeData = await getEveryFeeder(
          `https://feed.tseshow.com/api/market/movingAveragePrice/${id}/1`
        );
        this.volumeStudy.setData(volumeData.data.data);
      } catch (error) {
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
      if(this.Candlestick !== null) {
        this.Candlestick.applyOptions({
          visible: false,
        });
      }
      this.compareSell.applyOptions({visible: true});
    try {
      let compareData = await getEveryFeeder(
        `https://feed.tseshow.com/api/market/movingAverage/${this.state.pageID}/3/${this.state.comparisonPeriod}`
      );
      this.compareSell.setData(compareData.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async CompareBuyWorker() {
    if (this.compareBuy === null)
      this.compareBuy = this.chart.addLineSeries({
        color: colors.green[500],
        visible: true,
      });
      if(this.Candlestick !== null) {
        this.Candlestick.applyOptions({
          visible: true,
        });
      }
      this.compareBuy.applyOptions({visible: true});
    try {
      let compareData = await getEveryFeeder(
        `https://feed.tseshow.com/api/market/movingAverage/${this.state.pageID}/2/${this.state.comparisonPeriod}`
      );
      this.compareBuy.setData(compareData.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async shortTermChartWorker(
    id = this.state.pageID,
    chips = this.state.chipsValue
  ) {
    if (this.shorttermChart === null)
      this.shorttermChart = this.chart.addLineSeries({
        color: colors.blue[600],
        visible: false,
        priceScaleId: 'left',
        overlay: true,
        scaleMargins: {
          top: 0.5,
          bottom: 0.15,
        },
      });

    try {
      let shortterm = await getEveryFeeder(
        `https://feed.tseshow.com/api/market/movingAverage/${id}/${chips}/${this.state.averageSettings.shortterm}`
      );
      this.shorttermChart.setData(shortterm.data.data);
    } catch (error) {
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
        overlay: true,
        scaleMargins: {
          top: 0.5,
          bottom: 0.15,
        },
      });
    try {
      let midterm = await getEveryFeeder(
        `https://feed.tseshow.com/api/market/movingAverage/${id}/${chips}/${this.state.averageSettings.midterm}`
      );
      this.midtermChart.setData(midterm.data.data);
    } catch (error) {
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
        overlay: true,
        scaleMargins: {
          top: 0.5,
          bottom: 0.15,
        },
      });
    try {
      let longterm = await getEveryFeeder(
        `https://feed.tseshow.com/api/market/movingAverage/${id}/${chips}/${this.state.averageSettings.longterm}`
      );
      this.longtermChart.setData(longterm.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async shortmovingtermWorker(id = this.state.pageID) {
    if (this.shortmovingtermChart === null)
      this.shortmovingtermChart = this.chart.addLineSeries({
        color: colors.blue[600],
        visible: false,
      });
    try {
      let shortmovingterm = await getEveryFeeder(
        `https://feed.tseshow.com/api/market/movingAveragePrice/${id}/${this.state.averageSettings.shortmovingterm}`
      );
      this.shortmovingtermChart.setData(shortmovingterm.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async midmovingtermWorker(id = this.state.pageID) {
    if (this.midmovingtermChart === null)
      this.midmovingtermChart = this.chart.addLineSeries({
        color: colors.green[600],
        visible: false,
      });
    try {
      let midtmovingterm = await getEveryFeeder(
        `https://feed.tseshow.com/api/market/movingAveragePrice/${id}/${this.state.averageSettings.midmovingterm}`
      );
      this.midmovingtermChart.setData(midtmovingterm.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async longmovingtermWorker(id = this.state.pageID) {
    if (this.longmovingtermChart === null)
      this.longmovingtermChart = this.chart.addLineSeries({
        color: colors.yellow[600],
        visible: false,
      });
    try {
      let longtmovingterm = await getEveryFeeder(
        `https://feed.tseshow.com/api/market/movingAveragePrice/${id}/${this.state.averageSettings.longmovingterm}`
      );
      this.longmovingtermChart.setData(longtmovingterm.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getGroupLists();
    // CREATE CHART
    this.chart = createChart(this.chartRef.current, {
      width: this.chartRef.current.offsetWidth,
      height: this.chartRef.current.offsetHeight,
      priceScale: {
        scaleMargins: {
          top: 0.05,
          bottom: 0.55,
        },
        borderVisible: false,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        visible: true,
        borderColor: 'rgba(197, 203, 206, 1)',
      },
      leftPriceScale: {
        visible: true,
        borderColor: 'rgba(197, 203, 206, 1)',
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
          <Chip.Group
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
          </Chip.Group>
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
                { value: '2', label: 'روزانه' },
              ]}
            />
            <div className="relative">
              {/* <LoadingOverlay visible /> */}
              <MultiSelect
                clearable
                placeholder="انتخاب کنید"
                label="میانگین ها"
                onChange={(e) => this.averagesDisplaySettings(e)}
                data={[
                  { value: '0', label: 'کوتاه مدت' },
                  { value: '1', label: 'میان مدت' },
                  { value: '2', label: 'بلند مدت' },
                  { value: '3', label: 'متحرک کوتاه مدت - پول' },
                  { value: '4', label: 'متحرک میان مدت - پول' },
                  { value: '5', label: 'متحرک بلند مدت - پول' },
                ]}
              />
            </div>
          </Group>
          {/* <div ref={this.chartRef} className="mt-10 w-full h-[900px]" /> */}
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
                  <TextInput label="دوره میانگین کوتاه مدت">
                    <TextField placeholder="1 تا 50" name="shortterm" />
                  </TextInput>
                </Grid.Col>
                <Grid.Col md={6} sm={12}>
                  <TextInput label="دوره میانگین میان مدت">
                    <TextField placeholder="1 تا 100" name="midterm" />
                  </TextInput>
                </Grid.Col>
                <Grid.Col md={6} sm={12}>
                  <TextInput label="دوره میانگین بلند مدت">
                    <TextField placeholder="1 تا 200" name="longterm" />
                  </TextInput>
                </Grid.Col>
                <Grid.Col md={6} sm={12}>
                  <TextInput label="دوره میانگین متحرک کوتاه مدت">
                    <TextField placeholder="1 تا 200" name="shortmovingterm" />
                  </TextInput>
                </Grid.Col>
                <Grid.Col md={6} sm={12}>
                  <TextInput label="دوره میانگین متحرک میان مدت">
                    <TextField placeholder="1 تا 200" name="midmovingterm" />
                  </TextInput>
                </Grid.Col>
                <Grid.Col md={6} sm={12}>
                  <TextInput label="دوره میانگین متحرک بلند مدت">
                    <TextField placeholder="1 تا 200" name="longmovingterm" />
                  </TextInput>
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
