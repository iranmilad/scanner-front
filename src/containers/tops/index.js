import { Component } from 'react';
import { extraTops } from '../../helper/statics';
import ITable from '../../components/ITable';
import { Helmet } from 'react-helmet';
import { Text, Input, Group } from '@mantine/core';
import { matchSorter } from 'match-sorter';
import { getEveryFeeder } from '../../apis/main';
import lodash from 'lodash';
import { connect } from 'react-redux';

class Tops extends Component {
  state = {
    data: [],
    filterData: [],
  };

  filterData(value) {
    if (value.length === 0)
      return this.setState({ filterData: this.state.data });
    let filtered = matchSorter(this.state.data, value, {
      keys: lodash.map(new Array(6), (el, i) => `n${i}`),
    });
    this.setState({ filterData: filtered });
  }

  /**
   * get 6 stats for select
   */
  async getTopsList() {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'tops');
    try {
      let stats = await getEveryFeeder(thatItem.feeder_url);
      this.setState({ data: stats.data.data, filterData: stats.data.data });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.getTopsList();
  }

  render() {
    return (
      <>
        <Helmet>
          <title>جدول درصد کاهش قیمت سهم ها از سقف قیمتی</title>
        </Helmet>
        <Text size="sm">جدول درصد کاهش قیمت سهم ها از سقف قیمتی</Text>
        {this.state.data.length > 0 && (
          <Group mt="md">
            <Input
              placeholder="جستجو در جدول"
              onChange={(e) => this.filterData(e.target.value)}
            />
          </Group>
        )}
        <ITable
          pagination
          fixedHeader
          fixedHeaderScrollHeight="70vh"
          data={this.state.filterData}
          column={extraTops}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
});

export default connect(mapStateToProps)(Tops);
