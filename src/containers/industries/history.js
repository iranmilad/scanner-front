import { Select, Group, Text } from '@mantine/core';
import { Component } from 'react';
import { Helmet } from 'react-helmet';
import ITable from '../../components/ITable';
import {
  industries_history_type_1,
  industries_history_type_2,
} from '../../helper/statics';
import { getEveryFeeder } from '../../apis/main';
import { connect } from 'react-redux';
import lodash from 'lodash';
import { Paper } from '@mantine/core';
import { Center } from '@mantine/core';
import { Loader } from '@mantine/core';
import { withRouter, useParams } from 'react-router-dom';
import { useData, useConfig } from '../../helper';
import { useState } from 'react';
import { QueryCache } from '@tanstack/react-query';
import { useRef } from 'react';


const History = (props) => {
  let { id } = useParams();
  let [title,setTitle] = useState("");

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
  let marketHistory_query = useData(marketHistory, `/${param}`,{refetchInterval:false});

  const label = totalIndustriesGroupHisory_query.data?.data.find((item) => item.value === param)?.label

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
            error={marketHistory_query.error?.message}
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
