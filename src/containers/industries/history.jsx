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
import { useData, findConfig } from '../../helper';
import { useState } from 'react';
import { QueryCache } from '@tanstack/react-query';


const History = (props) => {
  let { id } = useParams();

  const [param, setParam] = useState(id);

  let totalIndustriesGroupHisory = findConfig(
    props.chartAndtables,
    'totalIndustriesGroupHisory'
  );
  let totalIndustriesGroupHisory_query = useData(
    totalIndustriesGroupHisory,
    undefined,
    { refetchInterval: false }
  );

  let marketHistory = findConfig(props.chartAndtables, 'marketHistory');
  let marketHistory_query = useData(marketHistory, `/${param}`,{refetchInterval:false});

  return (
    <>
      <Helmet>
        <title>{'' || 'Tseshow'}</title>
      </Helmet>
      <Group position="apart">
        <Text size="md">{`سوابق ${marketHistory_query?.data?.title || ''}`}</Text>
        <Select
          searchable
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
      {!marketHistory_query.isLoading ? (
        marketHistory_query.isError ? (
          <Center mt="xl">
            <h2>دیتایی برای نمایش یافت نشد</h2>
          </Center>
        ) : (
          <ITable
            className="narrow-md"
            title=""
            data={marketHistory_query.data?.data}
            column={
              marketHistory_query.data?.type == 1
                ? industries_history_type_1.header
                : industries_history_type_2.header
            }
            fixedHeader
            fixedHeaderScrollHeight="70vh"
            pagination
          />
        )
      ) : (
        <Paper p="xl" radius="md" shadow="xs" mt="xl">
          <Center>
            <Loader variant="dots" />
          </Center>
        </Paper>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  industry: state.config.industries,
  chartAndtables: state.config.needs.chartAndtables,
});

export default withRouter(connect(mapStateToProps)(History));
