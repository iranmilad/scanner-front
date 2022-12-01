import { Group, Input, Select, Text } from '@mantine/core';
import { matchSorter } from 'match-sorter';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import ITable from '../../../components/ITable';
import { useConfig, useData } from '../../../helper';
import { header } from './headers';

const FlowFilters = (props) => {
  let [filterData, setFilteredData] = useState([]);
  let [select, setSelect] = useState(1);
  let LongMoneFlow = useConfig(props.chartAndtables, 'LongMoneFlow');
  let LongMoneFlow_query = useData(LongMoneFlow, `/${select}`);

  function FilterDataByName(value) {
    let newData = LongMoneFlow_query.data?.data;
    if (value.length === 0) {
      return setFilteredData(newData);
    }

    let filter = matchSorter(newData, value, {
      keys: ['n0'],
    });
    setFilteredData(filter);
  }

  useEffect(() => {
    if (LongMoneFlow_query.data?.data) {
      setFilteredData(LongMoneFlow_query.data.data);
    }
  }, [LongMoneFlow_query.data?.data]);

  return (
    <>
      <Helmet>
        <title>{LongMoneFlow.title}</title>
      </Helmet>
      <Text size="sm">{LongMoneFlow.title}</Text>
      <Group position="apart" mt="md">
        <Input
          type="text"
          disabled={LongMoneFlow_query.isLoading || LongMoneFlow_query.isError}
          placeholder="جستجو در جدول"
          onChange={(e) => FilterDataByName(e.target.value)}
        />
        <Select
          defaultValue={`${select}`}
          onChange={setSelect}
          data={[
            { value: '1', label: 'نسبت های خرید صعودی' },
            { value: '2', label: 'نسبت های خرید نزولی' },
            { value: '3', label: 'ورود پول بلند مدتی' },
            { value: '4', label: 'خروج پول بلند مدتی' },
            { value: '5', label: 'نسبت های خرید و پارابولیک صعودی' },
            { value: '6', label: 'نسبت های خرید و پارابولیک نزولی' },
            { value: '7', label: 'ورود پول بلند مدتی و پارابولیک صعودی' },
            { value: '8', label: 'خروج پول بلند مدتی و پارابولیک نزولی' },
          ]}
        />
      </Group>
      <ITable
        column={header}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="70vh"
        data={filterData}
        isLoading={LongMoneFlow_query.isLoading}
        isFetching={LongMoneFlow_query.isFetching}
        error={LongMoneFlow_query.isError ? LongMoneFlow_query.error : null}
        allow={LongMoneFlow?.allow}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
});

export default connect(mapStateToProps)(FlowFilters);
