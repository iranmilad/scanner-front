import { Group, Text } from '@mantine/core';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from "react-redux";
import { useParams } from 'react-router-dom';
import ITable from '../../../components/ITable';
import { useConfig, useData } from "../../../helper";
import { header } from "./header";
import StockHighOrder from '../../../components/StockHighOrder';


const SHistory = (props) => {
  let {id} = useParams();
  let symbolHistory = useConfig(props.chartAndtables,'symbolHistory');
  console.log()
  let symbolHistory_query = useData(symbolHistory,`/${id}`);
  // let symbolInfo = useData(props.chartAndtables,`/${id}`);

  return (
    <>
    <Helmet>
      <title>{props?.symbol?.name || ''}</title>
    </Helmet>
    <Group>
      <Text size='md'>{symbolHistory.title} : {props?.symbol?.name}</Text>
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

// const SHistory = (props) => {
//   let { id } = useParams();


//   let symbolHistory = useConfig(
//     props.chartAndtables,
//     'symbolHistory'
//   );
//   let symbolHistory_query = useData(
//     symbolHistory,
//     `${id}`,
//   );


//   return (
//     <>
//       <Helmet>
//         <title>{'' || 'Tseshow'}</title>
//       </Helmet>
//       <Group position="apart">
//         <Text size="md">{`سوابق ${label || ''}`}</Text>
//       </Group>
//       <ITable
//         className="narrow-md"
//         title=""
//         data={symbolHistory_query.data?.data}
//         isLoading={symbolHistory_query.isLoading}
//         isFetching={symbolHistory_query.isFetching}
//         allow={symbolHistory?.allow}
//         error={symbolHistory_query.error?.message}
//         column={header}
//         fixedHeader
//         fixedHeaderScrollHeight="70vh"
//         pagination
//       />
//     </>
//   );
// };

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
})

export default StockHighOrder(connect(mapStateToProps)(SHistory));