import { Helmet } from 'react-helmet';
import {
  totalSummeryIndustrials,
  summaryTrans,
  totalSummerStockLOrN,
  totalSummeryGroupState,
} from '../../helper/statics';
import ITable from '../../components/ITable';
import LoopChart from '../../components/LoopChart';
import { connect } from 'react-redux';
import NewsTable from './news';
import { Text } from '@mantine/core';
import ExtractCharTable from './ExtractCharTable';
import { useConfig, useData } from '../../helper';


const Index = (props) => {
  let config = props.config.needs.chartAndtables;

  let tb_summaryTrans = useConfig(config, 'tb-summaryTrans');
  let tb_summaryTrans_query = useData(tb_summaryTrans);


  let tb_GroupState = useConfig(config, 'tb-GroupState');
  let tb_GroupState_query = useData(tb_GroupState);

  let tb_StockLOrN = useConfig(config, 'tb-StockLOrN');
  let tb_StockLOrN_query = useData(tb_StockLOrN);

  let tb_Industrials = useConfig(config, 'tb-Industrials');
  let tb_Industrials_query = useData(tb_Industrials);

  let charts = config.filter((item) => item.key.match(/A[0-9]/g));

  return (
    <>
    <Text mb="md">خانه</Text>
      <ITable
        column={summaryTrans.header}
        isLoading={tb_summaryTrans_query.isLoading}
        isFetching={tb_summaryTrans_query.isFetching}
        allow={tb_summaryTrans?.allow}
        error={tb_summaryTrans_query.isError ? tb_summaryTrans_query.error : null}
        data={tb_summaryTrans_query.data?.data}
        title={tb_summaryTrans.title}
      /> 
      <ITable
        column={totalSummeryGroupState.header}
        isLoading={tb_GroupState_query.isLoading}
        isFetching={tb_GroupState_query.isFetching}
        allow={tb_GroupState?.allow}
        error={tb_GroupState_query.isError ? tb_GroupState_query.error : null}
        data={tb_GroupState_query.data?.data}
        title={tb_GroupState.title}
      />
      <ITable
        column={totalSummerStockLOrN.header}
        isLoading={tb_StockLOrN_query.isLoading}
        isFetching={tb_StockLOrN_query.isFetching}
        allow={tb_StockLOrN?.allow}
        error={tb_StockLOrN_query.isLoading ? tb_StockLOrN_query.error : null}
        data={tb_StockLOrN_query.data?.data}
        title={tb_StockLOrN.title}
      />
      <NewsTable />
      <LoopChart charts={charts} />
      <ITable
        column={totalSummeryIndustrials.header}
        isLoading={tb_Industrials_query.isLoading}
        isFetching={tb_Industrials_query.isFetching}
        allow={tb_Industrials?.allow}
        error={tb_Industrials_query.isError ? tb_Industrials_query.error : null}
        data={tb_Industrials_query.data?.data}
        title={tb_Industrials.title}
        fixedHeader
        fixedHeaderScrollHeight="80vh"
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  config: state.config,
});

export default connect(mapStateToProps)(Index);
