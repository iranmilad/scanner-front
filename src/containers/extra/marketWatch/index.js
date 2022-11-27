import TechnoWatch from '../technoWatch';
import FilterModal from '../technoWatch/components/filterModal';
import { Text, Group, Input, Button, Select } from '@mantine/core';
import { Helmet } from 'react-helmet';
import ITable from '../../../components/ITable';
import { header } from './header';
import { getEveryFeeder } from '../../../apis/main';
import { connect } from 'react-redux';
import lodash from 'lodash';
import { Component, useState } from 'react';
import { matchSorter } from 'match-sorter';
import ModalFilter from '../../../components/modalFilter';
import { useConfig, useData } from '../../../helper';

// class MarketWatch extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       fullData: [],
//       filteredData: [],
//       openedModal: false,
//       header: header,
//       watchGroup: [],
//       watchFilter: [],
//       watchGroupSelected: 'M00',
//       watchFilterSelected: 0,
//       loading: false,
//       date: this.props.route.match.params.date,
//       splitedHeader: header,
//       filters: [],
//     };
//   }

//   ModalAction = (value) => {
//     this.setState({ openedModal: !this.state.openedModal });
//   };

//   async getFeedData() {
//     let thatItem = this.props.chartAndtables;
//     thatItem = thatItem.find((item) => item.key === 'MarketWatch');
//     this.setState({ loading: true, filteredData: [] });
//     try {
//       if (this.state.date) {
//         let response = await getEveryFeeder(
//           `${thatItem.feeder_url}/${this.state.watchGroupSelected}/${this.state.watchFilterSelected}/${this.state.date}`
//         );
//         response = lodash.isEmpty(response.data.data)
//           ? false
//           : response.data.data;
//         this.setState({
//           fullData: response,
//           filteredData: response,
//           loading: false,
//         });
//       } else {
//         let response = await getEveryFeeder(
//           `${thatItem.feeder_url}/${this.state.watchGroupSelected}/${this.state.watchFilterSelected}`
//         );
//         response = lodash.isEmpty(response.data.data)
//           ? false
//           : response.data.data;
//         this.setState({
//           fullData: response,
//           filteredData: response,
//           loading: false,
//         });
//       }
//     } catch (err) {
//       console.log(err);
//       this.setState({ loading: false });
//     }
//   }

//   /**
//    * Get Watch Groups from server
//    */
//   async getWatchGroup() {
//     let thatItem = this.props.chartAndtables;
//     thatItem = thatItem.find((item) => item.key === 'MarketWatchGroup');
//     try {
//       let response = await getEveryFeeder(
//         'https://feed.tseshow.com/api/MarketWatchGroup'
//       );
//       this.setState({
//         watchGroup: response.data.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   /**
//    * Get Watch Filter from server
//    */
//   async getFilters() {
//     try {
//       let thatItem = this.props.chartAndtables;
//       thatItem = thatItem.find((item) => item.key === 'MarketWatchFilter');
//       let response = await getEveryFeeder(
//         'https://feed.tseshow.com/api/MarketWatchFilter'
//       );
//       this.setState({
//         watchFilter: response.data.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   FilterDataByName(value) {
//     if (value.length === 0)
//       return this.setState({ filteredData: this.state.fullData });
//     let filter = matchSorter(this.state.fullData, value, { keys: ['n0'] });
//     this.setState({ filteredData: lodash.isEmpty(filter) ? false : filter });
//   }

//   changeHeader() {
//     /**
//      * @type {Array}
//      */
//     let splited = header.map((item, id) => ({ value: id, label: item.name }));
//     splited.shift();
//     splited.shift();
//     return splited;
//   }

//   onSubmit(filters) {
//     // this.setState({filters});
//     /**
//      * filter each row depends row
//      * @param {array} arr
//      * @param {number} min
//      * @param {number} max
//      * @param {string} row
//      * @returns
//      */
//     console.log(filters)
//     if(filters.length === 0){
//       this.setState(prev => ({
//         filteredData: {...prev.fullData},
//       }));
//       return this.ModalAction();
//     }
//     this.setState({filters})
//     function filter(arr, min, max, row) {
//       return arr.filter(
//         (x) =>
//           (min === null || convertNumber(x[row]) >= convertNumber(min)) && (max === null || convertNumber(x[row]) <= convertNumber(max))
//       );
//     }

//     function convertNumber(number) {
//       let convertedNumber = number;
//       if (/M/g.test(number))
//         convertedNumber = +number.replace(/[% a-zA-Z]/g, '') * 1000000;
//       else if (/B/g.test(number))
//         convertedNumber = +number.replace(/[% a-zA-Z]/g, '') * 1000000000;
//       else if (/K/g.test(number))
//         convertedNumber = +number.replace(/[% a-zA-Z]/g, '') * 1000;
//       return convertedNumber;
//     }

//     if (filters.length > 0) {
//       let data = this.state.fullData;
//       filters.map((item) => {
//         data = filter(
//           data,
//           item.min !== '' ? item.min : null,
//           item.max !== '' ? item.max : null,
//           `n${+item.name - 1}`
//         );
//       });
//       this.setState({filteredData:data})
//     }
//     this.ModalAction();
//   }

//   componentDidMount() {
//     this.getFeedData();
//     this.getWatchGroup();
//     this.getFilters();
//   }

//   render() {
//     return (
//       <>
//         <Helmet>
//           <title>{this.state.title}</title>
//         </Helmet>
//         <Text size="sm">{this.state.title}</Text>
//         <Group position="apart" mt="md">
//           <>
//             <Input
//               type="text"
//               placeholder="جستجو در نماد ها"
//               onChange={(e) => this.FilterDataByName(e.target.value)}
//               disabled={this.state.loading}
//             />
//             <Select
//               disabled={this.state.loading}
//               searchable
//               onChange={(value) => {
//                 this.getFeedData(value);
//                 this.setState({
//                   watchGroupSelected: value,
//                 });
//               }}
//               placeholder="نوع اوراق"
//               data={this.state.watchGroup || []}
//               defaultValue={this.state.watchGroup[0]?.value || ''}
//             />
//             <Select
//               disabled={this.state.loading}
//               searchable
//               onChange={(value) => {
//                 this.getFeedData(this.state.watchGroupSelected, value);
//                 this.setState({
//                   watchFilterSelected: value,
//                 });
//               }}
//               placeholder="فیلتر جدول"
//               data={this.state.watchFilter || []}
//               defaultValue={this.state.watchFilter[0]?.value || ''}
//             />
//             <Button
//               size="sm"
//               onClick={() => this.ModalAction()}
//               disabled={this.state.loading}
//             >
//               فیلتر ستون ها
//             </Button>
//           </>
//         </Group>
//         <ITable
//           className="narrow"
//           pagination
//           fixedHeader
//           fixedHeaderScrollHeight="70vh"
//           data={this.state.filteredData}
//           column={this.state.header}
//         />
//         <ModalFilter
//           opened={this.state.openedModal}
//           ModalAction={this.ModalAction}
//           onSubmit={(values) => this.onSubmit(values.filters)}
//           headers={this.changeHeader()}
//           filters={this.state.filters}
//         />
//       </>
//     );
//   }
// }

const MarketWatch = (props) => {
  
  let [search,setSearch] = useState("");
  let [oragh,setOragh] = useState("M00");
  let [filter,setFilter] = useState("0");
  let [modal,setModal] = useState(false);
  
  const marketWatch = useConfig(props.chartAndtables, 'MarketWatch');
  const marketWatch_query = useData(marketWatch,`/${oragh}/${filter}`);

  const marketWatchGroup = useConfig(props.chartAndtables, 'MarketWatchGroup');
  const marketWatchGroup_query = useData(marketWatchGroup);

  const marketWatchFilter = useConfig(props.chartAndtables, 'MarketWatchFilter');
  const marketWatchFilter_query = useData(marketWatchFilter);

  function FilterDataByName(value){
    if (value.length === 0)
    return this.setState({ filteredData: this.state.fullData });
    let filter = matchSorter(this.state.fullData, value, { keys: ['n0'] });
    this.setState({ filteredData: lodash.isEmpty(filter) ? false : filter });
  }
  return (
    <>
    <Helmet>
      <title>{marketWatch.title}</title>
    </Helmet>
    <Text size="sm">{marketWatch.title}</Text>
    <Group position="apart" mt="md">
      <>
        <Input
          type="text"
          value={search}
          placeholder="جستجو در نماد ها"
          // onChange={(e) => FilterDataByName(e.target.value)}
          disabled={marketWatch_query.loading}
        />
        <Select
          disabled={marketWatchGroup_query.loading}
          onChange={(value) => setOragh(value)}
          placeholder="نوع اوراق"
          data={marketWatchGroup_query.data?.data || []}
          defaultValue={marketWatchGroup_query.data?.data[0]?.value || ''}
        />
        <Select
          disabled={marketWatchFilter_query.loading}
          onChange={(value) => setFilter(value)}
          placeholder="فیلتر جدول"
          data={marketWatchFilter_query.data?.data || []}
          defaultValue={marketWatchFilter_query.data?.data[0]?.value || ''}
        />
        <Button
          size="sm"
          onClick={() => setModal(prev => !prev)}
          disabled={marketWatch_query.loading}
        >
          فیلتر ستون ها
        </Button>
      </>
    </Group>
    <ITable
      pagination
      fixedHeader
      fixedHeaderScrollHeight="70vh"
      data={marketWatch_query?.data?.data}
      allow={marketWatch?.allow}
      error={marketWatch_query.isError ? marketWatch_query.error : null}
      isLoading={marketWatch_query.isLoading}
      isFetching={marketWatch_query.isFetching}
      column={header}
    />
    {/* <ModalFilter
      opened={this.state.openedModal}
      ModalAction={this.ModalAction}
      onSubmit={(values) => this.onSubmit(values.filters)}
      headers={this.changeHeader()}
      filters={this.state.filters}
    /> */}
  </>
  )
}

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
});

export default connect(mapStateToProps)(MarketWatch);
