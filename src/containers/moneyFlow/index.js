import React, { useState, Component } from 'react';
import {
  Modal,
  Group,
  Text,
  Button,
  ScrollArea,
  Grid,
  Checkbox,
  Stack,
} from '@mantine/core';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import Chart from '../../components/Chart';
import ChartData from '../../components/Chart/chartData';
import { getEveryFeeder } from '../../apis/main';
import { matchSorter } from 'match-sorter';

class MoneyFlow extends Component {
  constructor(props) {
    super(props);
    this.oneCol = React.createRef();
  }
  state = {
    modalOpen: false,
    list: [
      {
        label: 'تغییرات سرانه های خرید و فروش',
        checked: 1,
        id: '1',
      },
      {
        label: 'تغییرات سرانه های خرید و فروش سهام حق تقدم و ص.سهامی',
        checked: 0,
        id: '2',
      },
      {
        label: 'تغییرات سرانه های خرید و فروش صندوق های درآمد ثابت',
        checked: 0,
        id: '3',
      },
      {
        label: 'تغییرات سرانه های خرید و فروش پنجاه سهم بزرگ',
        checked: 0,
        id: '4',
      },
      {
        label: 'تغییرات سرانه های خرید و فروش سهام و حق تقدم ها',
        checked: 0,
        id: '5',
      },
      {
        label: 'تغییرات سرانه های خرید و فروش صندوق های سهامی',
        checked: 0,
        id: '6',
      },
      {
        label: 'تغییرات ارزش کل سفارش های بازار',
        checked: 1,
        id: '7',
      },
      {
        label: 'تغییرات ارزش کل سفارش های سهام و حق تقدم و ص.سهامی',
        checked: 0,
        id: '8',
      },
      {
        label: 'تغییرات ارزش کل سفارش های صندوق های درآمد ثابت',
        checked: 0,
        id: '9',
      },
      {
        label: 'تغییرات ارزش کل سفارش های پنجاه سهم بزرگ',
        checked: 0,
        id: '10',
      },
      {
        label: 'تغییرات ارزش کل سفارش های سهام و حق تقدم ها',
        checked: 0,
        id: '11',
      },
      {
        label: 'تغییرات ارزش کل سفارش های صندوق سهامی',
        checked: 0,
        id: '12',
      },
      {
        label: 'تغییرات ورود پول اشخاص حقیقی به بازار',
        checked: 1,
        id: '13',
      },
      {
        label: 'تغییرات ورود پول اشخاص حقیقی به سهام و حق تقدم و ص.سهامی',
        checked: 0,
        id: '14',
      },
      {
        label: 'تغییرات ورود پول اشخاص حقیقی به صندوق های درآمد ثابت',
        checked: 0,
        id: '15',
      },
      {
        label: 'تغییرات ورود پول اشخاص حقیقی به پنجاه سهم بزرگ',
        checked: 0,
        id: '16',
      },
      {
        label: 'تغییرات ورود پول اشخاص حقیقی به سهام و حق تقدم ها',
        checked: 0,
        id: '17',
      },
      {
        label: 'تغییرات ورود پول اشخاصی حقیقی به صندوق های سهامی',
        checked: 0,
        id: '18',
      },
    ],
    selectedList: [],
    chart1: {
      title: 'تغییرات سرانه های خرید و فروش بازار',
      data: {},
    },
    chart2: {
      title: 'تغییرات سرانه های خرید و فروش سهام حق تقدم و ص.سهامی',
      data: {},
    },
    chart3: {
      title: 'تغییرات سرانه های خرید و فروش صندوق های درآمد ثابت',
      data: {},
    },
    chart4: {
      title: 'تغییرات سرانه های خرید و فروش پنجاه سهم بزرگ',
      data: {},
    },
    chart5: {
      title: 'تغییرات سرانه های خرید و فروش سهام و حق تقدم ها',
      data: {},
    },
    chart6: {
      title: 'تغییرات سرانه های خرید و فروش صندوق های سهامی',
      data: {},
    },
    chart7: {
      title: 'تغییرات ارزش کل سفارش های بازار',
      data: {},
    },
    chart8: {
      title: 'تغییرات ارزش کل سفارش های سهام و حق تقدم و ص.سهامی',
      data: {},
    },
    chart9: {
      title: 'تغییرات ارزش کل سفارش های صندوق های',
      data: {},
    },
    chart10: {
      title: 'تغییرات ارزش کل سفارش های پنجاه سهم بزرگ',
      data: {},
    },
    chart11: {
      title: 'تغییرات ارزش کل سفارش های سهام و حق تقدم ها',
      data: {},
    },
    chart12: {
      title: 'تغییرات ارزش کل سفارش های صندوق سهامی',
      data: {},
    },
    chart13: {
      title: 'تغییرات ورود پول اشخاص حقیقی به بازار',
      data: {},
    },
    chart14: {
      title: 'تغییرات ورود پول اشخاص حقیقی به سهام و حق تقدم و ص.سهامی',
      data: {},
    },
    chart15: {
      title: 'تغییرات ورود پول اشخاصی حقیقی به صندوق های درآمد ثابت',
      data: {},
    },
    chart16: {
      title: 'تغییرات ورود پول اشخاصی حقیقی به پنجاه سهم بزرگ',
      data: {},
    },
    chart17: {
      title: 'تغییرات ورود پول اشخاصی حقیقی به سهام و حق تقدم ها',
      data: {},
    },
    chart18: {
      title: 'تغییرات ورود پول اشخاصی حقیقی به صندوق های سهامی',
      data: {},
    },
  };

  async chart1() {
    // find an object that it has a key named ChangeBuySellHeadsHistory
    const findedIt = this.props.chartAndtables.find(
      (item) => item.key === 'MF1'
    );
    try {
      let response = await getEveryFeeder(findedIt.feeder_url);
      // update that chart in the state chart it has 1 id
      this.setState({
        chart1: { ...this.state.chart1, data: response.data.data },
      });
    } catch (error) {
      console.log(error);
    }
  }

  checkBoxesWorker = (e) => {
    // find that item
    const findedIt = this.state.list.find((item) => item.id === e.target.id);
    findedIt.checked = e.target.checked;
    // update the state
    this.setState({ list: Object.assign([], this.state.list, findedIt) });
  };
  getAllCharts = () => {
    // get all charts feed
    let findKeys = matchSorter(this.props.chartAndtables, 'MF', {
      keys: ['key'],
    });
    findKeys.map(async (item) => {
      try {
        let response = await getEveryFeeder(item.feeder_url);
        let removeLettersFromKey = item.key.replace('MF', '');
        this.setState({
          [`chart${removeLettersFromKey}`]: {
            ...this.state[`chart${removeLettersFromKey}`],
            data: response.data.data,
          },
        });
      } catch (error) {
        console.log(error);
      }
      setInterval(async () => {
        try {
          let response = await getEveryFeeder(item.feeder_url);
          let removeLettersFromKey = item.key.replace('MF', '');
          this.setState({
            [`chart${removeLettersFromKey}`]: {
              ...this.state[`chart${removeLettersFromKey}`],
              data: response.data.data,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }, item.refresh_time * 1000);
    });
  };
  componentDidMount() {
    this.getAllCharts();
  }
  render() {
    return (
      <>
        <Helmet>
          <title>نمودار های جریانات نقدینگی لحظه ای</title>
        </Helmet>
        <Group position="apart">
          <Text size="sm">نمودار های جریانات نقدینگی لحظه ای</Text>
          <Button size="sm" onClick={() => this.setState({ modalOpen: true })}>
            تنظیمات نمایش چارت ها
          </Button>
        </Group>
        <Grid mt="md">
          {this.state.list[0].checked && (
            <Grid.Col sm={12} md={4}>
              <Chart
                title={this.state.chart1.title}
                data={this.state.chart1.data.series}
                type="line"
                special="MF1"
                options={ChartData['MF1'].options}
                width={350}
                height={300}
              />
            </Grid.Col>
          )}
          {this.state.list[6].checked && (
            <Grid.Col sm={12} md={4}>
              <Chart
                title={this.state.chart7.title}
                data={this.state.chart7.data.series}
                type="line"
                special="MF7"
                options={ChartData['MF1'].options}
                width={350}
                height={300}
              />
            </Grid.Col>
          )}
          {this.state.list[12].checked && (
            <Grid.Col sm={12} md={4}>
              <Chart
                title={this.state.chart13.title}
                data={this.state.chart13.data.series}
                type="area"
                special="MF13"
                options={ChartData['MF13'].options}
                width={350}
                height={300}
              />
            </Grid.Col>
          )}
          {this.state.list[1].checked === true && (
            <Grid.Col sm={12} md={4} ref={this.oneCol}>
              <Chart
                title={this.state.chart2.title}
                data={this.state.chart2.data.series}
                type="line"
                special="MF1"
                options={ChartData['MF1'].options}
                width={350}
                height={300}
              />
            </Grid.Col>
          )}
          {this.state.list[7].checked === true && (
            <Grid.Col sm={12} md={4}>
              <Chart
                title={this.state.chart8.title}
                data={this.state.chart8.data.series}
                type="line"
                special="MF7"
                options={ChartData['MF7'].options}
                width={350}
                height={300}
              />
            </Grid.Col>
          )}
          {this.state.list[13].checked === true && (
            <Grid.Col sm={12} md={4}>
              <Chart
                title={this.state.chart14.title}
                data={this.state.chart14.data.series}
                type="line"
                special="MF7"
                options={ChartData['MF7'].options}
                width={350}
                height={300}
              />
            </Grid.Col>
          )}
          {this.state.list[2].checked === true && (
            <Grid.Col sm={12} md={4}>
              <Chart
                title={this.state.chart3.title}
                data={this.state.chart3.data.series}
                type="line"
                special="MF7"
                options={ChartData['MF7'].options}
                width={350}
                height={300}
              />
            </Grid.Col>
          )}
          {this.state.list[8].checked === true && (
            <Grid.Col sm={12} md={4}>
              <Chart
                title={this.state.chart9.title}
                data={this.state.chart9.data.series}
                type="line"
                special="MF7"
                options={ChartData['MF7'].options}
                width={350}
                height={300}
              />
            </Grid.Col>
          )}
          {this.state.list[14].checked === true && (
            <Grid.Col sm={12} md={4}>
              <Chart
                title={this.state.chart15.title}
                data={this.state.chart15.data.series}
                type="line"
                special="MF7"
                options={ChartData['MF7'].options}
                width={350}
                height={300}
              />
            </Grid.Col>
          )}
          {this.state.list[3].checked === true && (
            <Grid.Col sm={12} md={4}>
              <Chart
                title={this.state.chart4.title}
                data={this.state.chart4.data.series}
                type="line"
                special="MF7"
                options={ChartData['MF7'].options}
                width={350}
                height={300}
              />
            </Grid.Col>
          )}
          {this.state.list[9].checked === true && (
            <Grid.Col sm={12} md={4}>
              <Chart
                title={this.state.chart10.title}
                data={this.state.chart10.data.series}
                type="line"
                special="MF7"
                options={ChartData['MF7'].options}
                width={350}
                height={300}
              />
            </Grid.Col>
          )}
          {this.state.list[15].checked === true && (
            <Grid.Col sm={12} md={4}>
              <Chart
                title={this.state.chart16.title}
                data={this.state.chart16.data.series}
                type="line"
                special="MF7"
                options={ChartData['MF7'].options}
                width={350}
                height={300}
              />
            </Grid.Col>
          )}
          {this.state.list[4].checked === true && (
            <Grid.Col sm={12} md={4}>
              <Chart
                title={this.state.chart5.title}
                data={this.state.chart5.data.series}
                type="line"
                special="MF7"
                options={ChartData['MF7'].options}
                width={350}
                height={300}
              />
            </Grid.Col>
          )}
          {this.state.list[10].checked === true && (
            <Grid.Col sm={12} md={4}>
              <Chart
                title={this.state.chart11.title}
                data={this.state.chart11.data.series}
                type="line"
                special="MF7"
                options={ChartData['MF7'].options}
                width={350}
                height={300}
              />
            </Grid.Col>
          )}  
          {this.state.list[16].checked === true && (
            <Grid.Col sm={12} md={4}>
              <Chart
                title={this.state.chart17.title}
                data={this.state.chart17.data.series}
                type="line"
                special="MF7"
                options={ChartData['MF7'].options}
                width={350}
                height={300}
              />
            </Grid.Col>
          )}
          {this.state.list[5].checked === true && (
            <Grid.Col sm={12} md={4}>
              <Chart
                title={this.state.chart6.title}
                data={this.state.chart6.data.series}
                type="line"
                special="MF7"
                options={ChartData['MF7'].options}
                width={350}
                height={300}
              />
            </Grid.Col>
          )}
          {this.state.list[11].checked === true && (
            <Grid.Col sm={12} md={4}>
              <Chart
                title={this.state.chart12.title}
                data={this.state.chart12.data.series}
                type="line"
                special="MF7"
                options={ChartData['MF7'].options}
                width={350}
                height={300}
              />
            </Grid.Col>
          )}
          {this.state.list[17].checked === true && (
            <Grid.Col sm={12} md={4}>
              <Chart
                title={this.state.chart18.title}
                data={this.state.chart18.data.series}
                type="line"
                special="MF7"
                options={ChartData['MF7'].options}
                width={350}
                height={300}
              />
            </Grid.Col>
          )}
        </Grid>
        <Modal
          opened={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
          title="نمایش چارت ها"
          zIndex={99999999999999}
          dir="rtl"
        >
          <ScrollArea sx={{ height: 300 }} dir="rtl" type="always">
            <Stack>
              {this.state.list.map((item, index) => (
                <Checkbox
                  key={index}
                  onChange={(e) => this.checkBoxesWorker(e)}
                  {...item}
                />
              ))}
            </Stack>
          </ScrollArea>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
});

export default connect(mapStateToProps)(MoneyFlow);
