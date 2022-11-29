import { Button, Group, Input, Text } from '@mantine/core';
import { matchSorter } from 'match-sorter';
import { Helmet } from 'react-helmet';
import ITable from '../../../components/ITable';
import { header } from './headers';
import { connect, useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import { useConfig,modalOnSubmit,useData ,mainFilterOfModal} from '../../../helper';
import {registerModal} from "../../../redux/reducers/filterModal";
import ModalFilter from '../../../components/modalFilter';


const TechnoWatch = (props) => {
  // get MW with findModal and useSelector redux
  let TW = useSelector((state) => state.filterModal['TW'] || []);
  let [modal, setModal] = useState(false);
  let [filteredData, setFilteredData] = useState([]);
  let [filters, setFilters] = useState(TW);

  const TechnicalStocks = useConfig(props.chartAndtables, 'getTechnicalStocks');
  const TechnicalStocks_query = useData(TechnicalStocks, undefined,{
    staleTime: false,
    refetchInterval:false
  });


  function FilterDataByName(value) {
    if (value.length === 0){
      let newData = TechnicalStocks_query.data?.data;
      newData = mainFilterOfModal({array:filters, data:newData})
      return setFilteredData(newData);
    }
    let newData = TechnicalStocks_query.data?.data
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
    if (TechnicalStocks_query.data?.data) {
      setFilteredData(TechnicalStocks_query.data?.data);
    }
  }, [TechnicalStocks_query.data?.data]);

  return (
    <>
      <Helmet>
        <title>{TechnicalStocks.title}</title>
      </Helmet>
      <Text size="sm">{TechnicalStocks.title}</Text>
      <Group position="apart" mt="md">
        <>
          <Input
            type="text"
            placeholder="جستجو در نماد ها"
            onChange={(e) => FilterDataByName(e.target.value)}
            disabled={TechnicalStocks_query.isLoading || TechnicalStocks_query.isError}
          />
          <Button
            size="sm"
            onClick={() => setModal((prev) => !prev)}
            disabled={TechnicalStocks_query.loading}
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
        allow={TechnicalStocks?.allow}
        error={TechnicalStocks_query.isError ? TechnicalStocks_query.error : null}
        isLoading={TechnicalStocks_query.isLoading}
        isFetching={TechnicalStocks_query.isFetching}
        column={header}
      />
      <ModalFilter
        opened={modal}
        ModalAction={() => setModal((prev) => !prev)}
        onSubmit={(values) => modalOnSubmit({filters:values.filters,setModal,setFilters,setFilteredData,id:'mw',setModalFilter:registerModal,fullData:TechnicalStocks_query.data?.data})}
        headers={changeHeader()}
        filters={filters}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
});

export default connect(mapStateToProps)(TechnoWatch);
