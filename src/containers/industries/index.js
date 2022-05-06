import {
  Center,
  Paper,
  Text,
  Select,
  Group,
  Title,
  Button,
  Menu,
  ActionIcon,
  Grid,
} from '@mantine/core';
import React, { Component, useEffect, useState } from 'react';
import { getIndustryData } from '../../apis/main/main';
import ITable from '../../components/ITable';
import {
  industries_table1,
  industries_table2,
  industries_table3_type1,
  industries_table3_type2,
} from '../../helper/statics';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getIndustry, getTable } from '../../apis/tables';
import { BsGridFill } from 'react-icons/bs';
import Chart from '../../components/Chart';
import { getChart } from '../../apis/charts';

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
      industryLists :[]
    };
    this.id = props.route.match.params.id;
  }

  table1() {
    this.setState({ loading: true });
    getTable(
      `/industries/totalIndustriesActivity/${this.id}`
    )
      .then((res) => {
        this.setState({ table1: res.data.data, loading: false });
      })
      .catch((err) => this.setState({ error: true, loading: false }));
  }

  table2() {
    this.setState({ loading: true });
    getTable(
      `/industries/totalIndustriesStockLOrN/${this.id}`
    )
      .then((res) => {
        this.setState({ table2: res.data.data, loading: false });
      })
      .catch((err) => this.setState({ error: true, loading: false }));
  }

  table3() {
    this.setState({ loading: true });
    getTable(
      `/industries/totalIndustrialsStocks/${this.id}`
    )
      .then((res) => {
        this.setState({ table3: res.data, loading: false });
      })
      .catch((err) => this.setState({ error: true, loading: false }));
  }

  chart1(){
    getChart(`/industries/totalIndustriesStockPresent/${this.id}`)
    .then((res) => {
      this.setState({ chart1: res.data.data, loading: false });
    })
    .catch((err) => this.setState({ error: true, loading: false }));
  }

  chart2(){
    getChart(`/industries/totalIndustriesStockValueQueue/${this.id}`)
    .then((res) => {
      this.setState({ chart2: res.data.data, loading: false });
    })
    .catch((err) => this.setState({ error: true, loading: false }));
  }

  chart3(){
    getChart(`/industries/totalIndustriesChangeBuySellHeadsHistory/${this.id}`)
    .then((res) => {
      this.setState({ chart3: res.data.data, loading: false });
    })
    .catch((err) => this.setState({ error: true, loading: false }));
  }

  chart4(){
    getChart(`/industries/totalIndustriesEnterManyBuyerIHistory/${this.id}`)
    .then((res) => {
      this.setState({ chart4: res.data.data, loading: false });
    })
    .catch((err) => this.setState({ error: true, loading: false }));
  }

  chart5(){
    getChart(`/industries/totalIndustriesMarketOrderValueHistory/${this.id}`)
    .then((res) => {
      this.setState({ chart5: res.data.data, loading: false });
    })
    .catch((err) => this.setState({ error: true, loading: false }));
  }

  getIndustryList(){
    getChart('/industries/totalIndustriesGroup')
    .then(res => {
      this.setState({ industryLists: res.data.data, loading: false });
    })
    .catch(err => {
      this.setState({ error: true, loading: false });
    })
  }


  industry_history(id) {
    let host = window.location.host;
    window.location.replace(`http://${host}/industries/${id}`);
  }

  componentDidMount() {
    this.getIndustryList();
    this.setState({ loading: true });
    this.table1();
    this.table2();
    this.table3();
    this.chart1();
    this.chart2();
    this.chart3();
    this.chart4();
    this.chart5();
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
          <Text size="lg">دیده بان صنعت</Text>
          <Menu
            transition="rotate-right"
            transitionDuration={100}
            transitionTimingFunction="ease"
            dir="rtl"
            title="گروه ها"
            control={<Button size="xs">انتخاب صنعت</Button>}
            sx={(theme) => ({
              '& .mantine-Menu-body': {
                maxHeight: '300px !important',
                overflowY: 'auto',
              },
            })}
          >
            {this.state.industryLists.map((item, id) => (
              <Menu.Item key={id} onClick={() => this.industry_history(item.value)}>
                {item.name}
              </Menu.Item>
            ))}
          </Menu>
        </Group>
        <ITable
          title="گروه صندوق های درآمد ثابت و مختلط"
          data={this.state.table1}
          column={industries_table1.header}
        />
        <ITable
          title="جدول حقیقی حقوقی"
          data={this.state.table2}
          column={industries_table2.header}
        />
        <Grid grow mt="lg">
          <Grid.Col sm={12} lg={6}>
            <Chart data={this.state.chart1} title='محدوده قیمتی آخرین معامله نماد' />
          </Grid.Col>
          <Grid.Col sm={12} lg={6}>
          <Chart data={this.state.chart2} title='ارزش کل سفارش های روی تابلو گروه به میلیارد تومان' />
          </Grid.Col>
          <Grid.Col sm={12} lg={6}>
          <Chart data={this.state.chart3} title='تغیرات سرانه های خرید و فروش گروه به میلیون تومان' />
          </Grid.Col>
          <Grid.Col sm={12} lg={6}>
          <Chart data={this.state.chart4} title='تغییرات ورود پول اشخاص حقیقی به میلیارد تومان' />
          </Grid.Col>
          <Grid.Col span={6}>
          <Chart data={this.state.chart5} title='تغییرات ارزش کل سفارش ها به میلیارد تومان' />
          </Grid.Col>
          
        </Grid>

        {'type' in this.state.table3 ? (
          <ITable
            title="دیده بان گروه صندوق های درآمد ثابت و مختلط"
            data={this.state.table3.data}
            column={
              this.state.table3.type == 1
                ? industries_table3_type1.header
                : industries_table3_type2.header
            }
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) =>({
  industryGroups: state.config.industriesGroups,
})

export default connect(mapStateToProps)(Index);