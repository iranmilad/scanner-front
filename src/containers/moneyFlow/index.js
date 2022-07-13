import { useState, Component } from 'react';
import {
  Modal,
  Group,
  Text,
  Button,
  MultiSelect,
  ScrollArea,
  Grid,
} from '@mantine/core';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import Chart from '../../components/Chart';
import ChartData from "../../components/Chart/chartData"
import { getEveryFeeder } from '../../apis/main/main';

class MoneyFlow extends Component {
  state = {
    modalOpen: false,
    list: [
      {
        value: '1',
        label: 'تغییرات سرانه های خرید و فروش بازار',
      },
    ],
    selectedList: [],
    chart1: {
      title: "تغییرات سرانه های خرید و فروش بازار",
      data: {}
    }
  };

  async chart1() {
    // find an object that it has a key named ChangeBuySellHeadsHistory
    const findedIt = this.props.chartAndtables.find(
      (item) => item.key === 'ChangeBuySellHeadsHistory'
    );
    try {
      let response = await getEveryFeeder(findedIt.feeder_url);
      // update that chart in the state chart it has 1 id
      this.setState({ chart1: { ...this.state.chart1, data: response.data.data } });
    } catch (error) {
      console.log(error);
    }
  }
  isSelectedChart = (chartId) => {
    return this.state.selectedList.includes(chartId);
  }
  chartDisplayChanger = (values)=>{
    this.setState({selectedList:values})
  }
  componentDidMount() {
    this.chart1();
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
        <Grid>
            <Grid.Col sm={12} md={4}>
              {this.isSelectedChart('1') && (
                <Chart
                  title={this.state.chart1.title}
                  data={this.state.chart1.data.series}
                  type="area"
                  width="100%"
                  height={300}
                  options={{
                    options:ChartData.FX1
                  }}
                />
              )}
            </Grid.Col>
          </Grid>
        <Modal
          opened={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
          title="نمایش چارت ها"
          zIndex={99999999999999}
        >
          <ScrollArea sx={{ height: 300 }}>
            <MultiSelect
              data={this.state.list}
              defaultValue={this.state.selectedList}
              placeholder="چارت را انتخاب کنید"
              zIndex={99999999999999}
              onChange={(values) => this.chartDisplayChanger(values)}
            />
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
