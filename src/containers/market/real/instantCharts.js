import { Grid } from '@mantine/core';
import { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../../../components/Chart';
import { getEveryFeeder } from '../../../apis/main';
import { Text } from '@mantine/core';
import { Group } from '@mantine/core';
import { Select } from '@mantine/core';
import { useConfig, useData } from '../../../helper';
import { useParams } from 'react-router';


const InstantCharts = (props) => {
  let { id } = useParams();

  let symbolMoneyflowTotalEnterManyBuyerIHistory = useConfig(
    props.chartAndtables,
    'symbolMoneyflowTotalEnterManyBuyerIHistory'
  );
  let symbolMoneyflowTotalEnterManyBuyerIHistory_query = useData(
    symbolMoneyflowTotalEnterManyBuyerIHistory,
    `/${id}`
  );

  let symbolMoneyflowTotalChangeBuySellHeadsHistory = useConfig(
    props.chartAndtables,
    'symbolMoneyflowTotalChangeBuySellHeadsHistory'
  );
  let symbolMoneyflowTotalChangeBuySellHeadsHistory_query = useData(
    symbolMoneyflowTotalChangeBuySellHeadsHistory,
    `/${id}`
  );

  let symbolTradeLastDayHistory = useConfig(
    props.chartAndtables,
    'symbolTradeLastDayHistory'
  );
  let symbolTradeLastDayHistory_query = useData(
    symbolTradeLastDayHistory,
    `/${id}`
  );

  let symbolTradeValueHistory = useConfig(
    props.chartAndtables,
    'symbolTradeValueHistory'
  );
  let symbolTradeValueHistory_query = useData(
    symbolTradeValueHistory,
    `/${id}`
  );

  let symbolCounterBuyerSellerHistory = useConfig(
    props.chartAndtables,
    'symbolCounterBuyerSellerHistory'
  );
  let symbolCounterBuyerSellerHistory_query = useData(
    symbolCounterBuyerSellerHistory,
    `/${id}`
  );

  let symbolTradeTimeValueHistory = useConfig(
    props.chartAndtables,
    'symbolTradeTimeValueHistory'
  );
  let symbolTradeTimeValueHistory_query = useData(
    symbolTradeTimeValueHistory,
    `/${id}`
  );

  return (
    <Grid mt="md" grow>
      <Grid.Col sm={6} md={4}>
        <Chart
          className="min-h-[300px]"
          special={symbolMoneyflowTotalEnterManyBuyerIHistory.key}
          data={symbolMoneyflowTotalEnterManyBuyerIHistory_query.data?.data?.series}
          title={symbolMoneyflowTotalEnterManyBuyerIHistory.title}
          isLoading={symbolMoneyflowTotalEnterManyBuyerIHistory_query.isLoading}
          isFetching={symbolMoneyflowTotalEnterManyBuyerIHistory_query.isFetching}
          error={symbolMoneyflowTotalEnterManyBuyerIHistory_query.isError ? symbolMoneyflowTotalEnterManyBuyerIHistory_query.error : null}
          allow={symbolMoneyflowTotalEnterManyBuyerIHistory?.allow}
          type="area"
          height={300}
        />
      </Grid.Col>
      <Grid.Col sm={6} md={4}>
        <Chart
          className="min-h-[300px]"
          special={symbolMoneyflowTotalChangeBuySellHeadsHistory.key}
          data={symbolMoneyflowTotalChangeBuySellHeadsHistory_query.data?.data?.series}
          title={symbolMoneyflowTotalChangeBuySellHeadsHistory.title}
          isLoading={symbolMoneyflowTotalChangeBuySellHeadsHistory_query.isLoading}
          isFetching={symbolMoneyflowTotalChangeBuySellHeadsHistory_query.isFetching}
          error={symbolMoneyflowTotalChangeBuySellHeadsHistory_query.isError ? symbolMoneyflowTotalChangeBuySellHeadsHistory_query.error : null}
          allow={symbolMoneyflowTotalChangeBuySellHeadsHistory?.allow}
          type="line"
          height={300}
        />
      </Grid.Col>
      <Grid.Col sm={6} md={4}>
        <Chart
          className="min-h-[300px]"
          special={symbolTradeLastDayHistory.key}
          data={symbolTradeLastDayHistory_query.data?.data?.series}
          title={symbolTradeLastDayHistory.title}
          isLoading={symbolTradeLastDayHistory_query.isLoading}
          isFetching={symbolTradeLastDayHistory_query.isFetching}
          error={symbolTradeLastDayHistory_query.isError ? symbolTradeLastDayHistory_query.error : null}
          allow={symbolTradeLastDayHistory?.allow}
          type="area"
          height={300}
        />
      </Grid.Col>
      <Grid.Col sm={6} md={4}>
        <Chart
          className="min-h-[300px]"
          special={symbolTradeTimeValueHistory.key}
          data={symbolTradeValueHistory_query.data?.data?.series}
          title={symbolTradeValueHistory.title}
          isLoading={symbolTradeValueHistory_query.isLoading}
          isFetching={symbolTradeValueHistory_query.isFetching}
          error={symbolTradeValueHistory_query.isError ? symbolTradeValueHistory_query.error : null}
          allow={symbolTradeValueHistory?.allow}
          type="area"
          height={300}
        />
      </Grid.Col>
      <Grid.Col sm={6} md={4}>
        <Chart
          className="min-h-[300px]"
          special={symbolTradeTimeValueHistory.key}
          data={symbolCounterBuyerSellerHistory_query.data?.data?.series}
          title={symbolCounterBuyerSellerHistory.title}
          type="line"
          isLoading={symbolCounterBuyerSellerHistory_query.isLoading}
          isFetching={symbolCounterBuyerSellerHistory_query.isFetching}
          error={symbolCounterBuyerSellerHistory_query.isError ? symbolCounterBuyerSellerHistory_query.error : null}
          allow={symbolCounterBuyerSellerHistory?.allow}
          height={300}
        />
      </Grid.Col>
      <Grid.Col sm={6} md={4}>
        <Chart
          className="min-h-[300px]"
          special={symbolTradeTimeValueHistory.key}
          data={symbolTradeTimeValueHistory_query.data?.data?.series}
          title={symbolTradeTimeValueHistory.title}
          isLoading={symbolTradeTimeValueHistory_query.isLoading}
          isFetching={symbolTradeTimeValueHistory_query.isFetching}
          error={symbolTradeTimeValueHistory_query.isError ? symbolTradeTimeValueHistory_query.error : null}
          allow={symbolTradeTimeValueHistory?.allow}
          type="bar"
          height={300}
        />
      </Grid.Col>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
});

export default connect(mapStateToProps, null)(InstantCharts);
