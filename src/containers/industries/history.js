import { Group, Select, Text } from '@mantine/core';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import ITable from '../../components/ITable';
import { useConfig, useData } from '../../helper';
import {
  industries_history_type_1,
  industries_history_type_2,
} from '../../helper/statics';

const History = (props) => {
  let { id } = useParams();

  const [param, setParam] = useState(id);

  let totalIndustriesGroupHisory = useConfig(
    props.chartAndtables,
    'totalIndustriesGroupHisory'
  );
  let totalIndustriesGroupHisory_query = useData(
    totalIndustriesGroupHisory,
    undefined,
    { refetchInterval: false }
  );

  let marketHistory = useConfig(props.chartAndtables, 'marketHistory');
  let marketHistory_query = useData(marketHistory, `/${param}`, {
    refetchInterval: false,
  });

  const label = totalIndustriesGroupHisory_query.data?.data.find(
    (item) => item.value === param
  )?.label;

  return (
    <>
      <Helmet>
        <title>{'' || 'Tseshow'}</title>
      </Helmet>
      <Group position="apart">
        <Text size="md">{`سوابق ${label || ''}`}</Text>
        <Select
          disabled={marketHistory_query.isLoading ? true : false}
          onChange={setParam}
          placeholder="انتخاب صنعت"
          defaultValue={param}
          data={
            totalIndustriesGroupHisory_query.isLoading
              ? []
              : totalIndustriesGroupHisory_query.data?.data
          }
        />
      </Group>
      <ITable
        className="narrow-md"
        title=""
        data={marketHistory_query.data?.data}
        isLoading={marketHistory_query.isLoading}
        isFetching={marketHistory_query.isFetching}
        allow={marketHistory?.allow}
        error={marketHistory_query.error}
        column={
          marketHistory_query.data?.type == 1
            ? industries_history_type_1.header
            : industries_history_type_2.header
        }
        fixedHeader
        fixedHeaderScrollHeight="70vh"
        pagination
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  industry: state.config.industries,
  chartAndtables: state.config.needs.chartAndtables,
});

export default withRouter(connect(mapStateToProps)(History));
