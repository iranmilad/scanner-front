import { Group, Input, Text } from '@mantine/core';
import { matchSorter } from 'match-sorter';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import ITable from '../../components/ITable';
import { useEffect,useState } from 'react';
import { header } from './headers';
import { useData,useConfig } from '../../helper';

const Tops = (props) => {
  let [filteredData, setFilteredData] = useState([]);

  const tops = useConfig(props.chartAndtables, 'tops');
  const tops_query = useData(tops);


  function FilterDataByName(value) {
    let newData = tops_query.data?.data;
    if (value.length === 0){
      return setFilteredData(newData);
    }

    let filter = matchSorter(newData, value, {
      keys: ['n0'],
    });
    setFilteredData(filter);
  }


  useEffect(() => {
    if (tops_query.data?.data) {
      setFilteredData(tops_query.data?.data);
    }
  }, [tops_query.data?.data]);

  return (
    <>
      <Helmet>
        <title>{tops.title}</title>
      </Helmet>
      <Text size="sm">{tops.title}</Text>
      <Group position="apart" mt="md">
      <Input
            type="text"
            placeholder="جستجو در نماد ها"
            onChange={(e) => FilterDataByName(e.target.value)}
            disabled={tops_query.isLoading || tops_query.isError}
          />
      </Group>
      <ITable
        pagination
        fixedHeader
        fixedHeaderScrollHeight="70vh"
        data={filteredData}
        allow={tops?.allow}
        error={tops_query.isError ? tops_query.error : null}
        isLoading={tops_query.isLoading}
        isFetching={tops_query.isFetching}
        column={header}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
});

export default connect(mapStateToProps)(Tops);
