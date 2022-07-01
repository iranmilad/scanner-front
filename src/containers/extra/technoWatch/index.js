import { Component } from 'react';
import { Modal, Text, Group, Input, Button } from '@mantine/core';
import { Helmet } from 'react-helmet';
import ITable from '../../../components/ITable';
import { matchSorter } from 'match-sorter';
import FilterModal from './components/filterModal';
import { header } from './headers';
import lodash from 'lodash';
import { getEveryFeeder } from '../../../apis/main/main';

/**
 * All industries in Table with filter them
 * @extends Component
 */
class TechnoWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullData: [],
      filteredData: [],
      openedModal: false,
    };
  }

  /**
   * Filter Table by name
   * @param {string} value
   */
  FilterDataByName = (value) => {
    if (value.length === 0)
      return this.setState({ filteredData: this.state.fullData });
    let filter = matchSorter(this.state.fullData, value, { keys: ['n0'] });
    this.setState({ filteredData: filter });
  };

  /**
   * set filtered data to state
   * @param {*} value
   */
  filterByAllHeaders = (value) => {
    let headers = value;
    if (lodash.isEmpty(headers))
      return this.setState({ filteredData: this.state.fullData });

    let newData = this.state.fullData;
    // find min values and it is sorted
    for (let i = 0; i < headers.length; i++) {
      let thisHeader = headers[i];
      if (newData.length > 0) {
        if (+thisHeader.min !== 0) {
          let filterData = matchSorter(newData, thisHeader.min, {
            keys: [thisHeader.name],
          });
          newData = filterData;
        }
      }
    }

    // find max values and it is sorted
    for (let i = 0; i < headers.length; i++) {
      let thisHeader = headers[i];
      if (newData.length > 0) {
        if (+thisHeader.max !== 0) {
          let filterData = matchSorter(newData, thisHeader.max, {
            keys: [thisHeader.name],
          });
          newData = filterData;
        }
      }
    }

    this.setState({ filteredData: newData });
  };

  /**
   * Modal Action Worker - Open or Close Modal
   */
  ModalAction = () => {
    this.setState({ openedModal: !this.state.openedModal });
  };

  async getFeedData() {
    try {
      let response = await getEveryFeeder('/getTechnicalStocks');
      this.setState({ fullData: response.data.data, filteredData: response.data.data });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getFeedData();
  }

  render() {
    return (
      <>
        <Helmet>
          <title>دیده بان تکنیکال</title>
        </Helmet>
        <Text size="sm">دیده بان تکنیکال</Text>
        <Group position="apart" mt="lg">
          {this.state.fullData.length > 0 && (
            <>
              <Input
                type="text"
                placeholder="جستجو در نماد ها"
                onChange={(e) => this.FilterDataByName(e.target.value)}
              />
              <Button size="sm" onClick={() => this.ModalAction()}>
                فیلتر
              </Button>
            </>
          )}
        </Group>
        <ITable
          pagination
          fixedHeader
          fixedHeaderScrollHeight="70vh"
          data={this.state.filteredData}
          column={header}
        />
        <FilterModal
          headers={header}
          filter={this.filterByAllHeaders}
          opened={this.state.openedModal}
          ModalAction={this.ModalAction}
        />
      </>
    );
  }
}

export default TechnoWatch;
