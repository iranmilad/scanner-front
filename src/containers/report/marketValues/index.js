import { Group, Input, Text } from '@mantine/core';
import { matchSorter } from 'match-sorter';
import { connect } from 'react-redux';
import ITable from '../../../components/ITable';
import { useState ,useEffect} from 'react';
import { useConfig,useData } from '../../../helper';
import { Helmet } from 'react-helmet';
import { header } from './headers';





const MarketValues = (props) => {
  let [filteredData, setFilteredData] = useState([]);

  const marketValues = useConfig(props.chartAndtables, 'marketValues');
  const marketValues_query = useData(marketValues);


  function FilterDataByName(value) {
    let newData = marketValues_query.data?.data;
    if (value.length === 0){
      return setFilteredData(newData);
    }

    let filter = matchSorter(newData, value, {
      keys: ['n0'],
    });
    setFilteredData(filter);
  }


  useEffect(() => {
    if (marketValues_query.data?.data) {
      setFilteredData(marketValues_query.data?.data);
    }
  }, [marketValues_query.data?.data]);

  return (
    <>
      <Helmet>
        <title>{marketValues.title}</title>
      </Helmet>
      <Text size="sm">{marketValues.title}</Text>
      <Group position="apart" mt="md">
      <Input
            type="text"
            placeholder="جستجو در نماد ها"
            onChange={(e) => FilterDataByName(e.target.value)}
            disabled={marketValues_query.isLoading || marketValues_query.isError}
          />
      </Group>
      <ITable
        pagination
        fixedHeader
        fixedHeaderScrollHeight="70vh"
        data={filteredData}
        allow={marketValues?.allow}
        error={marketValues_query.isError ? marketValues_query.error : null}
        isLoading={marketValues_query.isLoading}
        isFetching={marketValues_query.isFetching}
        column={header}
      />
    </>
  );
};

const mapStateToProps = state => ({
  chartAndtables: state.config.needs.chartAndtables
})

export default connect(mapStateToProps)(MarketValues);