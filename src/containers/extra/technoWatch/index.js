import { Component } from 'react';
import { Modal, Text, Group, Input, Button } from '@mantine/core';
import { Helmet } from 'react-helmet';
import ITable from '../../../components/ITable';
import { matchSorter } from 'match-sorter';
import FilterModal from './components/filterModal';
import { header } from './headers';
import lodash from 'lodash';
import { getEveryFeeder } from '../../../apis/main';
import { connect } from 'react-redux';

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
      header: header,
      title: 'دیده بان تکنیکال',
      requestURL: 'https://feed.tseshow.com/api/getTechnicalStocks',
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
    /**
     * @type {Array}
     */
    let headers = value;
    if (lodash.isEmpty(headers))
      return this.setState({ filteredData: this.state.fullData });

    /**
     * @type {array}
     */
    let newData = this.state.fullData;
    for (let i = 0; i < headers.length; i++) {
      let thisHeader = headers[i];
      // check it has min option
      if (thisHeader.min !== '' && thisHeader.max !== '') {
        let minNumber = thisHeader['min'].replace(/[% a-zA-Z]/g, '');
        let maxNumber = thisHeader['max'].replace(/[% a-zA-Z]/g, '');
        let itemFinded = newData.filter((item) =>
          convertNumber(item[thisHeader.name], (number) => {
            return number >= minNumber && number <= maxNumber;
          })
        );
        newData = itemFinded;
      } else if (thisHeader.min !== '' && thisHeader.max === '') {
        let pureNumber = thisHeader['min'].replace(/[% a-zA-Z]/g, '');
        let itemFinded = newData.filter((item) =>
          convertNumber(item[thisHeader.name], (number) => {
            return number >= pureNumber;
          })
        );
        newData = itemFinded;
      } else if (thisHeader.min === '' && thisHeader.max !== '') {
        let pureNumber = thisHeader['max'].replace(/[% a-zA-Z]/g, '');
        let itemFinded = newData.filter((item) =>
          convertNumber(item[thisHeader.name], (number) => {
            return number <= pureNumber;
          })
        );
        newData = itemFinded;
      }
    }
    /**
     * @callback
     */
    function convertNumber(number, callBack) {
      let convertedNumber = number;
      if (/M/g.test(number))
        convertedNumber = +number.replace(/[% a-zA-Z]/g, '') * 1000000;
      else if (/B/g.test(number))
        convertedNumber = +number.replace(/[% a-zA-Z]/g, '') * 1000000000;
      else if (/K/g.test(number))
        convertedNumber = +number.replace(/[% a-zA-Z]/g, '') * 1000;
      return callBack(+convertedNumber);
    }
    this.setState({ filteredData: lodash.uniq(newData) });
  };

  /**
   * Modal Action Worker - Open or Close Modal
   */
  ModalAction = () => {
    this.setState({ openedModal: !this.state.openedModal });
  };

  /**
   * Get all industries from server
   */
  async getFeedData() {
    if (this.state.requestURL !== '') {
      try {
        let response = await getEveryFeeder(this.state.requestURL);
        this.setState({
          fullData: response.data.data,
          filteredData: response.data.data,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  /**
   * remove first index of array
   * export array to a select type of data
   * @returns {Array}
   */
  HeadersByName() {
    /**
     * All of headers without any filter
     * @type {Array}
     */
    let headers = this.state.header;
    headers = headers.filter((item, index) => index !== 0);

    /**
     * export all headers by their name
     * @type {Array}
     */
    let headersByName = [];
    headers.map((item, index) =>
      headersByName.push({ value: `n${index + 1}`, label: item.name })
    );
    return headersByName;
  }

  

  componentDidMount() {
    this.getFeedData();
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
          column={this.state.header}
        />
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

export default TechnoWatch;
