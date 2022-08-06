import TechnoWatch from '../technoWatch';
import FilterModal from '../technoWatch/components/filterModal';
import {
  Text,
  Group,
  Input,
  Button,
  Select,
  Paper,
  Center,
  Loader,
} from '@mantine/core';
import { Helmet } from 'react-helmet';
import ITable from '../../../components/ITable';
import { header } from './header';
import { getEveryFeeder } from '../../../apis/main/main';

class MarketWatch extends TechnoWatch {
  constructor(props) {
    super(props);
    this.state = {
      fullData: [],
      filteredData: [],
      openedModal: false,
      header: header,
      title: 'دیده بان بازار',
      requestURL: '/MarketWatch',
      watchGroup: [],
      watchFilter: [],
      watchGroupSelected: 'M00',
      watchFilterSelected: 0,
      loading: false,
      id: this.props.route.match.params.id
    };
  }

  /**
   * Get all industries from server
   * @param {string} selectDefault
   */
  async getFeedData(
    watchGroup = this.state.watchGroupSelected,
    watchFilter = this.state.watchFilterSelected
  ) {
    this.setState({
      loading: true,
    });
    try {
      let response = await getEveryFeeder(
        `${this.state.requestURL}/${watchGroup}/${watchFilter}${this.state.id ? `/${this.state.id}` : ''}`
      );
      this.setState({
        fullData: response.data.data,
        filteredData: response.data.data,
        loading: false,
      });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
    }
  }

  /**
   * Get Watch Groups from server
   */
  async getWatchGroup() {
    try {
      let response = await getEveryFeeder('/MarketWatchGroup');
      this.setState({
        watchGroup: response.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Get Watch Filter from server
   */
  async getFilters() {
    try {
      let response = await getEveryFeeder('/MarketWatchFilter');
      this.setState({
        watchFilter: response.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getFeedData();
    this.getWatchGroup();
    this.getFilters();
  }

  render() {
    return (
      <>
        <Helmet>
          <title>{this.state.title}</title>
        </Helmet>
        <Text size="sm">{this.state.title}</Text>
        <Group position="apart" mt="lg">
          {this.state.fullData.length > 0 && (
            <>
              <Input
                type="text"
                placeholder="جستجو در نماد ها"
                onChange={(e) => this.FilterDataByName(e.target.value)}
              />
              <Select
                searchable
                onChange={(value) => {
                  this.getFeedData(value);
                  this.setState({
                    watchGroupSelected: value,
                  });
                }}
                placeholder="نوع اوراق"
                data={this.state.watchGroup || []}
                defaultValue={this.state.watchGroupSelected}
              />
              <Select
                searchable
                onChange={(value) => {
                  this.getFeedData(this.state.watchGroupSelected, value);
                  this.setState({
                    watchFilterSelected: value,
                  });
                }}
                placeholder="فیلتر جدول"
                data={this.state.watchFilter || []}
                defaultValue={this.state.watchFilterSelected}
              />
              <Button size="sm" onClick={() => this.ModalAction()}>
                فیلتر ستون ها
              </Button>
            </>
          )}
        </Group>
        {this.state.loading ? (
          <Paper radius="md" shadow="xs" p="sm" mt="lg">
            <Center>
              <Loader variant="dots" />
            </Center>
          </Paper>
        ) : (
          <ITable
            pagination
            fixedHeader
            fixedHeaderScrollHeight="70vh"
            data={this.state.filteredData}
            column={this.state.header}
          />
        )}
        <FilterModal
          headers={this.HeadersByName()}
          filter={this.filterByAllHeaders}
          opened={this.state.openedModal}
          ModalAction={this.ModalAction}
        />
      </>
    );
  }
}

export default MarketWatch;
