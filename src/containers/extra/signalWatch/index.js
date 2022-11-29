import { Group, Input, Text } from '@mantine/core';
import { matchSorter } from 'match-sorter';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import ITable from '../../../components/ITable';
import { useConfig, useData } from '../../../helper';
import { header } from './headers';


const SignalWatch = (props) => {
  let [filteredData, setFilteredData] = useState([]);

  const SignalWatch = useConfig(props.chartAndtables, 'SignalWatch');
  const SignalWatch_query = useData(SignalWatch, undefined,{
    staleTime: false,
    refetchInterval:false
  });


  function FilterDataByName(value) {
    let newData = SignalWatch_query.data?.data;
    if (value.length === 0){
      return setFilteredData(newData);
    }

    let filter = matchSorter(newData, value, {
      keys: ['n0'],
    });
    setFilteredData(filter);
  }


  useEffect(() => {
    if (SignalWatch_query.data?.data) {
      setFilteredData(SignalWatch_query.data?.data);
    }
  }, [SignalWatch_query.data?.data]);

  return (
    <>
      <Helmet>
        <title>{SignalWatch.title}</title>
      </Helmet>
      <Text size="sm">{SignalWatch.title}</Text>
      <Group position="apart" mt="md">
        <>
          <Input
            type="text"
            placeholder="جستجو در نماد ها"
            onChange={(e) => FilterDataByName(e.target.value)}
            disabled={SignalWatch_query.isLoading || SignalWatch_query.isError}
          />
        </>
      </Group>
      <ITable
        pagination
        fixedHeader
        fixedHeaderScrollHeight="70vh"
        data={filteredData}
        allow={SignalWatch?.allow}
        error={SignalWatch_query.isError ? SignalWatch_query.error : null}
        isLoading={SignalWatch_query.isLoading}
        isFetching={SignalWatch_query.isFetching}
        column={header}
      />
    </>
  );
};

const mapStateToProps = state => ({
  chartAndtables: state.config.needs.chartAndtables
})

export default connect(mapStateToProps)(SignalWatch);
