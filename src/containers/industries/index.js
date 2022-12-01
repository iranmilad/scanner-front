import {
  Center, Grid, Group, Loader, Paper, Select, Text
} from '@mantine/core';
import React,{useState} from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import Chart from '../../components/Chart';
import ITable from '../../components/ITable';
import { useConfig, useData } from '../../helper';
import {
  industries_table1,
  industries_table2,
  industries_table3_type1,
  industries_table3_type2
} from '../../helper/statics';


const Index = (props) => {
  let {id} = useParams();

  const [param, setParam] = useState(id);

  // TABLE
  let totalIndustriesActivity = useConfig(props.chartAndtables,'totalIndustriesActivity');
  let totalIndustriesActivity_query = useData(totalIndustriesActivity, `/${param}`);

  let totalIndustriesStockLOrN = useConfig(props.chartAndtables,'totalIndustriesStockLOrN');
  let totalIndustriesStockLOrN_query = useData(totalIndustriesStockLOrN, `/${param}`);

  let totalIndustrialsStocks = useConfig(props.chartAndtables,'totalIndustrialsStocks');
  let totalIndustrialsStocks_query = useData(totalIndustrialsStocks, `/${param}`);
  // TABLE

  // CHART
  let totalIndustriesStockPresent = useConfig(props.chartAndtables,'totalIndustriesStockPresent');
  let totalIndustriesStockPresent_query = useData(totalIndustriesStockPresent, `/${param}`);

  let totalIndustriesStockValueQueue = useConfig(props.chartAndtables,'totalIndustriesStockValueQueue');
  let totalIndustriesStockValueQueue_query = useData(totalIndustriesStockValueQueue, `/${param}`);

  let totalIndustriesChangeBuySellHeadsHistory = useConfig(props.chartAndtables,'totalIndustriesChangeBuySellHeadsHistory');
  let totalIndustriesChangeBuySellHeadsHistory_query = useData(totalIndustriesChangeBuySellHeadsHistory, `/${param}`);

  let totalIndustriesEnterManyBuyerIHistory = useConfig(props.chartAndtables,'totalIndustriesEnterManyBuyerIHistory');
  let totalIndustriesEnterManyBuyerIHistory_query = useData(totalIndustriesEnterManyBuyerIHistory, `/${param}`);

  let totalIndustriesMarketOrderValueHistory = useConfig(props.chartAndtables,'totalIndustriesMarketOrderValueHistory');
  let totalIndustriesMarketOrderValueHistory_query = useData(totalIndustriesMarketOrderValueHistory, `/${param}`);
  // CHART


  let totalIndustriesGroup = useConfig(props.chartAndtables,'totalIndustriesGroup');
  let totalIndustriesGroup_query = useData(totalIndustriesGroup);

  const label = totalIndustriesGroup_query.data?.data.find(
    (item) => item.value === param
  )?.label;

  return (
    <>
    <Helmet>
      <title>گروه {label || ''}</title>
    </Helmet>
    <Group position="apart" mt="my">
      <Text size="md">گروه {label || ''}</Text>
      <Select
        disabled={totalIndustriesGroup_query.isLoading}
        defaultValue={`${param}`}
        searchable
        onChange={setParam}
        placeholder="انتخاب صنعت"
        data={totalIndustriesGroup_query.isLoading ? [] : totalIndustriesGroup_query.data?.data}
      />
    </Group>
    <ITable
          title={totalIndustriesActivity.title}
          data={totalIndustriesActivity_query.data?.data}
          column={industries_table1.header}
          isLoading={totalIndustriesActivity_query.isLoading}
          isFetching={totalIndustriesActivity_query.isFetching}
          allow={totalIndustriesActivity?.allow}
          error={totalIndustriesActivity_query.isError ? totalIndustriesActivity_query.error : null}
        />
        <ITable
          title={totalIndustriesStockLOrN.title}
          data={totalIndustriesStockLOrN_query.data?.data}
          column={industries_table2.header}
          isLoading={totalIndustriesStockLOrN_query.isLoading}
          isFetching={totalIndustriesStockLOrN_query.isFetching}
          allow={totalIndustriesStockLOrN?.allow}
          error={totalIndustriesStockLOrN_query.isError ? totalIndustriesStockLOrN_query.error : null}
        />
        <Grid mt="md">
          <Grid.Col span={12} md={6}>
            <Chart
              data={totalIndustriesStockPresent_query.data?.data?.series}
              special={totalIndustriesStockPresent_query.data?.data?.special}
              title={totalIndustriesStockPresent.title}
              isLoading={totalIndustriesStockPresent_query.isLoading}
              isFetching={totalIndustriesStockPresent_query.isFetching}
              allow={totalIndustriesStockPresent?.allow}
              error={totalIndustriesStockPresent_query.isError ? totalIndustriesStockPresent_query.error : null}
            />
          </Grid.Col>
          <Grid.Col span={12} md={6}>
            <Chart
              data={totalIndustriesStockValueQueue_query.data?.data?.series}
              special={totalIndustriesStockValueQueue_query.data?.data?.special}
              title={totalIndustriesStockValueQueue.title}
              isLoading={totalIndustriesStockValueQueue_query.isLoading}
              isFetching={totalIndustriesStockValueQueue_query.isFetching}
              allow={totalIndustriesStockValueQueue?.allow}
              error={totalIndustriesStockValueQueue_query.isError ? totalIndustriesStockValueQueue_query.error : null}
            />
          </Grid.Col>
          <Grid.Col span={12} md={6}>
            <Chart
              data={totalIndustriesChangeBuySellHeadsHistory_query.data?.data?.series}
              special={totalIndustriesChangeBuySellHeadsHistory_query.data?.data?.special}
              title={totalIndustriesChangeBuySellHeadsHistory.title}
              isLoading={totalIndustriesChangeBuySellHeadsHistory_query.isLoading}
              isFetching={totalIndustriesChangeBuySellHeadsHistory_query.isFetching}
              allow={totalIndustriesChangeBuySellHeadsHistory?.allow}
              error={totalIndustriesChangeBuySellHeadsHistory_query.isError ? totalIndustriesChangeBuySellHeadsHistory_query.error : null}
            />
          </Grid.Col>
          <Grid.Col span={12} md={6}>
            <Chart
              data={totalIndustriesEnterManyBuyerIHistory_query.data?.data?.series}
              special={totalIndustriesEnterManyBuyerIHistory_query.data?.data?.special}
              title={totalIndustriesEnterManyBuyerIHistory.title}
              isLoading={totalIndustriesEnterManyBuyerIHistory_query.isLoading}
              isFetching={totalIndustriesEnterManyBuyerIHistory_query.isFetching}
              allow={totalIndustriesEnterManyBuyerIHistory?.allow}
              error={totalIndustriesEnterManyBuyerIHistory_query.isError ? totalIndustriesEnterManyBuyerIHistory_query.error : null}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Chart
              data={totalIndustriesMarketOrderValueHistory_query.data?.data?.series}
              special={totalIndustriesMarketOrderValueHistory_query.data?.data?.special}
              title={totalIndustriesMarketOrderValueHistory.title}
              isLoading={totalIndustriesMarketOrderValueHistory_query.isLoading}
              isFetching={totalIndustriesMarketOrderValueHistory_query.isFetching}
              allow={totalIndustriesMarketOrderValueHistory?.allow}
              error={totalIndustriesMarketOrderValueHistory_query.isError ? totalIndustriesMarketOrderValueHistory_query.error : null}
            />
          </Grid.Col>
        </Grid>
        <ITable
          title={totalIndustrialsStocks.title}
          data={totalIndustrialsStocks_query.data?.data}  
          column={totalIndustrialsStocks_query.data?.type == 1 ? industries_table3_type1.header : industries_table3_type2.header}
          isLoading={totalIndustrialsStocks_query.isLoading}
          isFetching={totalIndustrialsStocks_query.isFetching}
          allow={totalIndustrialsStocks?.allow}
          error={totalIndustrialsStocks_query.isError ? totalIndustrialsStocks_query.error : null}
        />
        
  </>

  )
}

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables
});

export default connect(mapStateToProps)(Index);
