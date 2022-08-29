import { Component } from 'react';
import { Group, Input, Select, Text } from '@mantine/core';
import { getEveryFeeder } from '../../apis/main';
import { matchSorter } from 'match-sorter';
import lodash from 'lodash';
import ITable from '../../components/ITable';
import { orderWatch } from '../../helper/statics';
import { connect } from 'react-redux';

class OrderWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: [],
      orders: [],
      ordersFiltered: [],
    };
  }

  /**
   * get Orders from server with 6 stats
   * @param {number} defaultState
   */
  async GetTotalOrders(defaultState = 0) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find(item => item.key === "getTotalOrders")
    try {
      let orders = await getEveryFeeder(`${thatItem.feeder_url}/${defaultState}`);
      this.setState({
        orders: orders.data.data,
        ordersFiltered: orders.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * get 6 stats for select
   */
  async totalOrderWatchStates() {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find(item => item.key === "totalOrdersWatchState")
    try {
      let stats = await getEveryFeeder(thatItem.feeder_url);
      this.setState({ stats: stats.data.data });
    } catch (err) {
      console.log(err);
    }
  }

  changeSelect(e) {
    this.GetTotalOrders(e);
  }

  filterOrders(value) {
    let filtered = matchSorter(this.state.orders, value, {keys: lodash.map(new Array(13),(el,i)=>`n${i}`)});
    this.setState({ordersFiltered: filtered})
  }

  async componentDidMount() {
    this.GetTotalOrders();
    this.totalOrderWatchStates();
  }

  render() {
    return (
      <>
        <Text size="sm">دیده بان سفارش ها</Text>
        <Group position="apart" mt="md">
          {this.state.orders.length > 0 && (
            <Input
              placeholder="جستجو در جدول"
              onChange={(e) => this.filterOrders(e.target.value)}
            />
          )}
          {this.state.stats.length > 0 && (
            <Select
              data={this.state.stats}
              onChange={(e) => this.changeSelect(e)}
              defaultValue={0}
              placeholder="نوع اوراق"
            />
          )}
        </Group>
        <ITable
          pagination
          fixedHeader
          fixedHeaderScrollHeight="70vh"
          data={this.state.ordersFiltered}
          column={orderWatch.header}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  chartAndtables: state.config.needs.chartAndtables
})

export default connect(mapStateToProps)(OrderWatch);
