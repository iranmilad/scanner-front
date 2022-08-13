import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { createChart, CrosshairMode, PriceScaleMode } from 'lightweight-charts';
import { Paper } from '@mantine/core';
import { Group } from '@mantine/core';
import { Button } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import colors from 'tailwindcss/colors';
import { getEveryFeeder } from '../../../../apis/main/main';

class LightChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.stockId,
      percentageBtn: false,
      chartFullIndex: false,
      equalWeightIndex: false,
      linearGraph: false,
      navChart: false,
      navExist: false,
    };
    this.chartRef = React.createRef();
    this.volumChart =
      this.candleStickChart =
      this.symbolChartIndex =
      this.equalWeightIndex =
      this.linearGraph =
      this.ChartNav =
        null;
  }

  setPercentageBtn = () => {
    this.setState({
      percentageBtn: !this.state.percentageBtn,
    });
    if (!this.state.percentageBtn) {
      this.chart.applyOptions({
        rightPriceScale: { mode: PriceScaleMode.Percentage },
      });
      this.chart.applyOptions({
        overlayPriceScales: { mode: PriceScaleMode.Percentage },
      });
    } else {
      this.chart.applyOptions({
        rightPriceScale: { mode: PriceScaleMode.Normal },
      });
      this.chart.applyOptions({
        overlayPriceScales: { mode: PriceScaleMode.Normal },
      });
    }
  };

  setChartFullIndex = () => {
    this.setState({
      chartFullIndex: !this.state.chartFullIndex,
    });
    if (this.state.chartFullIndex) {
      this.symbolChartIndex.applyOptions({ visible: false });
    } else {
      this.symbolChartIndex.applyOptions({ visible: true });
    }
  };

  setEqualWeightIndex = () => {
    this.setState({
      equalWeightIndex: !this.state.equalWeightIndex,
    });
    if (this.state.equalWeightIndex) {
      this.equalWeightIndex.applyOptions({ visible: false });
    } else {
      this.equalWeightIndex.applyOptions({ visible: true });
    }
  };

  setLinearGraph = () => {
    this.setState({
      linearGraph: !this.state.linearGraph,
    });
    if (this.state.linearGraph) {
      this.linearGraph.applyOptions({ visible: false });
    } else {
      this.linearGraph.applyOptions({ visible: true });
    }
  };

  setNavChart = () => {
    this.setState({
      navChart: !this.state.navChart,
    });
    if (this.state.navChart) {
      this.ChartNav.applyOptions({ visible: false });
    } else {
      this.getChartNav();
      this.ChartNav.applyOptions({ visible: true });
    }
  };

  getVolumeChart = async () => {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolChartVolume');
    if (this.volumChart === null)
      this.volumChart = this.chart.addHistogramSeries({
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: 'left',
        overlay: true,
        scaleMargins: {
          top: 0.5,
          bottom: 0,
        },
        color: colors.yellow[600],
        visible: true,
      });

    try {
      let response = await getEveryFeeder(
        `${thatItem.feeder_url}/${this.props.stockId}`
      );
      this.volumChart.setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  getCandleStickChart = async () => {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolChart');

    if (this.candleStickChart === null)
      this.candleStickChart = this.chart.addCandlestickSeries({
        color: colors.yellow[600],
        visible: true,
      });

    try {
      let response = await getEveryFeeder(
        `${thatItem.feeder_url}/${this.props.stockId}`
      );
      if (response.data.fund) {
        this.setState({ navExist: true });
      }
      this.candleStickChart.setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  getChartFullIndex = async () => {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolChartIndex');
    if (this.symbolChartIndex === null)
      this.symbolChartIndex = this.chart.addLineSeries({
        symbol: 'AAPL',
        color: colors.green[600],
        visible: false,
        priceScaleId: 'left',
      });

    try {
      let response = await getEveryFeeder(`${thatItem.feeder_url}/00`);
      this.symbolChartIndex.setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  getEqualWeightIndex = async () => {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolChartIndex');
    if (this.equalWeightIndex === null)
      this.equalWeightIndex = this.chart.addLineSeries({
        symbol: 'AAPL',
        color: colors.blue[600],
        visible: false,
        priceScaleId: 'left',
      });

    try {
      let response = await getEveryFeeder(
        `${thatItem.feeder_url}/${this.state.id}`
      );
      this.equalWeightIndex.setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  getLinearGraph = async () => {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolChartIndex');
    if (this.linearGraph === null)
      this.linearGraph = this.chart.addLineSeries({
        symbol: 'AAPL',
        color: colors.pink[600],
        visible: false,
        priceScaleId: 'left',
      });

    try {
      let response = await getEveryFeeder(
        `${thatItem.feeder_url}/${this.props.stockId}`
      );
      console.log(response);
      this.linearGraph.setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  getChartNav = async () => {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolChartNav');
    if (this.ChartNav === null)
      this.ChartNav = this.chart.addLineSeries({
        symbol: 'AAPL',
        color: colors.yellow[600],
        visible: false,
        priceScaleId: 'left',
      });

    try {
      let response = await getEveryFeeder(
        `${thatItem.feeder_url}/${this.props.stockId}`
      );
      this.ChartNav.setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.chart = createChart(this.chartRef.current, {
      width: this.chartRef.current.offsetWidth,
      height: this.chartRef.current.offsetHeight,
      crosshair: {
        horzLine: {
          visible: false,
        },
        vertLine: {
          visible: false,
        },
      },
      priceScale: {
        scaleMargins: {
          top: 0.05,
          bottom: 0.55,
        },
        borderVisible: false,
      },
    });
    this.getVolumeChart();
    this.getCandleStickChart();
    this.getChartFullIndex();
    this.getEqualWeightIndex();
    this.getLinearGraph();
  }
  render() {
    return (
      <Paper p="xl" radius="md" shadow="xs" mt="xl">
        <Group position="apart">
          <div>
            <Button
              color={this.state.chartFullIndex ? 'pink' : 'blue'}
              onClick={() => this.setChartFullIndex()}
            >
              شاخص کل
            </Button>
            <Button
              ml="sm"
              color={this.state.equalWeightIndex ? 'yellow' : 'blue'}
              onClick={() => this.setEqualWeightIndex()}
            >
              شاخص هم وزن
            </Button>
            <Button
              ml="sm"
              color={this.state.linearGraph ? 'green' : 'blue'}
              onClick={() => this.setLinearGraph()}
            >
              نمودار خطی
            </Button>
            {this.state.navExist && (
              <Button
                ml="sm"
                color={this.state.navChart ? 'pink' : 'blue'}
                onClick={() => this.setNavChart()}
              >
                NAV
              </Button>
            )}
          </div>
          <Button
            color={this.state.percentageBtn ? 'orange' : 'blue'}
            onClick={() => this.setPercentageBtn()}
          >
            مقیاس درصدی
          </Button>
        </Group>
        <div ref={this.chartRef} className="mt-10 w-full h-96" />
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
});

export default connect(mapStateToProps)(LightChart);
