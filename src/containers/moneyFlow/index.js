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
    let config = this.props.chartAndtables;
    let findKeys = config.filter((item) => item.key.match(/MF[0-9]/g));
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
      this[`${item.key}Interval`] = setInterval(async () => {
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

  componentWillUnmount() {
    this.clearInterval();
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
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
          <div>
            {[0, 1, 2, 3, 4, 5].map((item, id) => (
              <div className="my-2">
                {this.state.list[item].checked == true && (
                  <Chart
                    key={id}
                    title={this.state[`chart${item + 1}`].title}
                    data={this.state[`chart${item + 1}`].data.series}
                    type="line"
                    special="MF1"
                    options={ChartData['MF1'].options}
                    height={300}
                  />
                )}
              </div>
            ))}
          </div>
          <div>
            {[6, 7, 8, 9, 10, 11].map((item, id) => (
              <div className="my-2">
                {this.state.list[item].checked == true && (
                  <Chart
                    key={id}
                    title={this.state[`chart${item + 1}`].title}
                    data={this.state[`chart${item + 1}`].data.series}
                    type="line"
                    special="MF7"
                    options={ChartData['MF7'].options}
                    height={300}
                  />
                )}
              </div>
            ))}
          </div>
          <div>
            {[12, 13, 14, 15, 16, 17].map((item, id) => (
              <div className="my-2">
                {this.state.list[item].checked == true && (
                  <Chart
                    key={id}
                    title={this.state[`chart${item + 1}`].title}
                    data={this.state[`chart${item + 1}`].data.series}
                    type="area"
                    special="MF13"
                    options={ChartData['MF13'].options}
                    width={350}
                    height={300}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
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
