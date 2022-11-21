import React, { Component } from 'react';
import ITable from '../../../components/ITable';
import {header} from "./header"
import {getEveryFeeder} from "../../../apis/main";
import {connect} from "react-redux"
import { Helmet } from 'react-helmet';
import { Group, Text } from '@mantine/core';
import { useParams, withRouter } from 'react-router-dom';
import {setMainHeader,setMarketId} from "../../../redux/reducers/main";
import RoutesContext from "../../../contexts/routes";
import {useConfig, useData} from "../../../helper"


const SHistory = (props) => {
  let {id} = useParams();
  let symbolHistory = useConfig(props.chartAndtables,'symbolHistory');
  let symbolHistory_query = useData(symbolHistory,`/${id}`);
  let symbolInfo = useData(props.table,`/${id}`);

  return (
    <>
    <Helmet>
      <title>{symbolInfo.data?.name || ''}</title>
    </Helmet>
    <Group>
      <Text size='md'>{symbolHistory.title} : {symbolInfo.data?.name}</Text>
    </Group>
    <ITable
      data={symbolHistory_query.data?.data}
      isLoading={symbolHistory_query.isLoading}
      isFetching={symbolHistory_query.isFetching}
      error={symbolHistory_query.isError ? symbolHistory_query.error : null}
      allow={symbolHistory?.allow}
      column={header}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="70vh"
    />
  </>
  )
}

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
})

export default connect(mapStateToProps)(SHistory)