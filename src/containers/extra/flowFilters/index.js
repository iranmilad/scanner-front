import {
  Chip,
  Group,
  Input,
  Center,
  Text,
  Paper,
  Loader,
} from '@mantine/core';
import { Component } from 'react';
import { Helmet } from 'react-helmet';
import ITable from '../../../components/ITable';
import { getEveryFeeder } from '../../../apis/main';
import { matchSorter } from 'match-sorter';
import { header } from './headers';
import lodash from 'lodash';

class FlowFilters extends Component {
  state = {
    fullData: [],
    filteredData: [],
    loading: false,
    filterText: '',
  };

  /**
   * When the chips change it calls
   * @param {string} value
   */
  async ChipsOnChange(value) {
    this.setState({ loading: true });
    try {
      let response = await getEveryFeeder(`https://feed.tseshow.com/api/LongMoneFlow/${value}`);
      this.setState({
        fullData: response.data.data,
        filteredData: response.data.data,
        loading: false,
        filterText: '',
      });
    } catch (error) {
      this.setState({ loading: false });
    }
  }
  /**
   * that input filters the data
   * @param {string} value
   */
  filterData(value) {
    this.setState({ filterText: value });
    let filter = matchSorter(this.state.fullData, value, {
      keys: lodash.map(new Array(10), (el, i) => `n${i}`),
    });
    this.setState({ filteredData: filter });
  }

  async componentDidMount(){
    this.setState({ loading: true });
    try {
      let response = await getEveryFeeder("https://feed.tseshow.com/api/LongMoneFlow/1");
      this.setState({
        fullData: response.data.data,
        filteredData: response.data.data,
        loading: false,
        filterText: '',
      });
    } catch (error) {
      this.setState({ loading: false });
    }
  }
  render() {
    return (
      <>
        <Helmet>
          <title>فیلترهای جریانات نقدینگی بلند مدتی</title>
        </Helmet>
        <Text size="sm">فیلترهای جریانات نقدینگی بلند مدتی</Text>
        <Group position="apart" mt="md">
          <Input
          disabled={this.state.loading}
            placeholder="جستجو در جدول"
            value={this.state.filterText}
            onChange={(e) => this.filterData(e.target.value)}
          />
        </Group>
        <Chip.Group
          my="lg"
          defaultValue="1"
          radius="sm"
          onChange={(e) => this.ChipsOnChange(e)}
        >
          <Chip value="1" defaultChecked disabled={this.state.loading}>
            نسبت های خرید صعودی
          </Chip>
          <Chip value="2" disabled={this.state.loading}>نسبت های خرید نزولی</Chip>
          <Chip value="3" disabled={this.state.loading}>ورود پول بلند مدتی</Chip>
          <Chip value="4" disabled={this.state.loading}>خروج پول بلند مدتی</Chip>
          <Chip value="5" disabled={this.state.loading}>نسبت های خرید و پارابولیک صعودی</Chip>
          <Chip value="6" disabled={this.state.loading}>نسبت های خرید و پارابولیک نزولی</Chip>
          <Chip value="7" disabled={this.state.loading}>ورود پول بلند مدتی و پارابولیک صعودی</Chip>
          <Chip value="8" disabled={this.state.loading}>خروج پول بلند مدتی و پارابولیک نزولی</Chip>
        </Chip.Group>
        {this.state.loading ? (
          <Paper radius="md" shadow="xs" p="sm" mt="lg">
            <Center>
              <Loader variant="dots" />
            </Center>
          </Paper>
        ) : (
          <ITable
          column={header}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="70vh"
            data={this.state.filteredData}
          />
        )}
      </>
    );
  }
}

export default FlowFilters;
