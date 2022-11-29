import { connect ,useSelector} from "react-redux";
import {header} from './header';
import { useState,useEffect } from 'react';
import { useConfig,modalOnSubmit,useData ,mainFilterOfModal} from '../../../helper';
import {registerModal} from "../../../redux/reducers/filterModal";
import ModalFilter from '../../../components/modalFilter';
import { Button, Group, Input, Text } from '@mantine/core';
import { matchSorter } from 'match-sorter';
import { Helmet } from 'react-helmet';
import ITable from '../../../components/ITable';



// class IndustrialWatch extends TechnoWatch{
//   constructor(props){
//     super(props);
//     this.state = {
//       fullData: [],
//       filteredData: [],
//       openedModal: false,
//       header: header,
//       title: 'دیده بان گروه های صنعت',
//       requestURL: 'https://feed.tseshow.com/api/IndustriesWatch',
//     }
//   }

//     /**
//    * remove first index of array
//    * export array to a select type of data
//    * @returns {Array}
//    */
//      HeadersByName() {
//       /**
//        * All of headers without any filter
//        * @type {Array}
//        */
//       let headers = this.state.header;
//       headers = headers.filter((item, index) => index !== 0 && index !== 1);
  
//       /**
//        * export all headers by their name
//        * @type {Array}
//        */
//       let headersByName = [];
//       headers.map((item, index) =>
//         headersByName.push({ value: `n${index + 1}`, label: item.name })
//       );
//       return headersByName;
//     }
// }

const IndustrialWatch = (props) => {
  // get MW with findModal and useSelector redux
  let IW = useSelector((state) => state.filterModal['IW'] || []);
  let [modal, setModal] = useState(false);
  let [filteredData, setFilteredData] = useState([]);
  let [filters, setFilters] = useState(IW);

  const IndustriesWatch = useConfig(props.chartAndtables, 'IndustriesWatch');
  const IndustriesWatch_query = useData(IndustriesWatch, undefined,{
    staleTime: false,
    refetchInterval:false
  });


  function FilterDataByName(value) {
    if (value.length === 0){
      let newData = IndustriesWatch_query.data?.data;
      newData = mainFilterOfModal({array:filters, data:newData})
      return setFilteredData(newData);
    }
    let newData = IndustriesWatch_query.data?.data
    newData = mainFilterOfModal({array:filters,data:newData})
    
    
    let filter = matchSorter(newData, value, {
      keys: ['n0'],
    });
    setFilteredData(filter);
  }

  function changeHeader() {
    let splited = header.map((item, id) => ({ value: id, label: item.name }));
    splited.shift();
    splited.shift();
    return splited;
  }

  useEffect(() => {
    if (IndustriesWatch_query.data?.data) {
      setFilteredData(IndustriesWatch_query.data?.data);
    }
  }, [IndustriesWatch_query.data?.data]);

  return (
    <>
      <Helmet>
        <title>{IndustriesWatch.title}</title>
      </Helmet>
      <Text size="sm">{IndustriesWatch.title}</Text>
      <Group position="apart" mt="md">
        <>
          <Input
            type="text"
            placeholder="جستجو در نماد ها"
            onChange={(e) => FilterDataByName(e.target.value)}
            disabled={IndustriesWatch_query.isLoading || IndustriesWatch_query.isError}
          />
          <Button
            size="sm"
            onClick={() => setModal((prev) => !prev)}
            disabled={IndustriesWatch_query.loading}
          >
            فیلتر ستون ها
          </Button>
        </>
      </Group>
      <ITable
        pagination
        fixedHeader
        fixedHeaderScrollHeight="70vh"
        data={filteredData}
        allow={IndustriesWatch?.allow}
        error={IndustriesWatch_query.isError ? IndustriesWatch_query.error : null}
        isLoading={IndustriesWatch_query.isLoading}
        isFetching={IndustriesWatch_query.isFetching}
        column={header}
      />
      <ModalFilter
        opened={modal}
        ModalAction={() => setModal((prev) => !prev)}
        onSubmit={(values) => modalOnSubmit({filters:values.filters,setModal,setFilters,setFilteredData,id:'mw',setModalFilter:registerModal,fullData:IndustriesWatch_query.data?.data})}
        headers={changeHeader()}
        filters={filters}
      />
    </>
  );
};

const mapStateToProps = state => ({
  chartAndtables: state.config.needs.chartAndtables
})

export default connect(mapStateToProps)(IndustrialWatch);