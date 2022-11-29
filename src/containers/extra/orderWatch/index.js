import { Group, Input, Text } from '@mantine/core';
import { matchSorter } from 'match-sorter';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import ITable from '../../../components/ITable';
import { useConfig, useData } from '../../../helper';
import { header } from './headers';


const OrderWatch = (props) => {
  let [filteredData, setFilteredData] = useState([]);

  const TotalOrders = useConfig(props.chartAndtables, 'getTotalOrders');
  const TotalOrders_query = useData(TotalOrders, undefined,{
    staleTime: false,
    refetchInterval:false
  });


  function FilterDataByName(value) {
    let newData = TotalOrders_query.data?.data;
    if (value.length === 0){
      return setFilteredData(newData);
    }

    let filter = matchSorter(newData, value, {
      keys: ['n0'],
    });
    setFilteredData(filter);
  }


  useEffect(() => {
    if (TotalOrders_query.data?.data) {
      setFilteredData(TotalOrders_query.data?.data);
    }
  }, [TotalOrders_query.data?.data]);

  return (
    <>
      <Helmet>
        <title>{TotalOrders.title}</title>
      </Helmet>
      <Text size="sm">{TotalOrders.title}</Text>
      <Group position="apart" mt="md">
        <>
          <Input
            type="text"
            placeholder="جستجو در نماد ها"
            onChange={(e) => FilterDataByName(e.target.value)}
            disabled={TotalOrders_query.isLoading || TotalOrders_query.isError}
          />
        </>
      </Group>
      <ITable
        pagination
        fixedHeader
        fixedHeaderScrollHeight="70vh"
        data={filteredData}
        allow={TotalOrders?.allow}
        error={TotalOrders_query.isError ? TotalOrders_query.error : null}
        isLoading={TotalOrders_query.isLoading}
        isFetching={TotalOrders_query.isFetching}
        column={header}
      />
    </>
  );
};

const mapStateToProps = state => ({
  chartAndtables: state.config.needs.chartAndtables
})

export default connect(mapStateToProps)(OrderWatch);
