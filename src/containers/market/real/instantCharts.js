import { connect } from 'react-redux';
import { useParams } from 'react-router';
import Chart from '../../../components/Chart';
import { useConfig, useData } from '../../../helper';

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
      <div className="">
        <Chart
          className="h-[300px]"
          special={symbolMoneyflowTotalEnterManyBuyerIHistory.key}
          data={
            symbolMoneyflowTotalEnterManyBuyerIHistory_query.data?.data?.series
          }
          title={symbolMoneyflowTotalEnterManyBuyerIHistory.title}
          isLoading={symbolMoneyflowTotalEnterManyBuyerIHistory_query.isLoading}
          isFetching={
            symbolMoneyflowTotalEnterManyBuyerIHistory_query.isFetching
          }
          error={
            symbolMoneyflowTotalEnterManyBuyerIHistory_query.isError
              ? symbolMoneyflowTotalEnterManyBuyerIHistory_query.error
              : null
          }
          allow={symbolMoneyflowTotalEnterManyBuyerIHistory?.allow}
          type="area"
        />
      </div>
      <div>
        <Chart
          className="h-[300px]"
          special={symbolMoneyflowTotalChangeBuySellHeadsHistory.key}
          data={
            symbolMoneyflowTotalChangeBuySellHeadsHistory_query.data?.data
              ?.series
          }
          title={symbolMoneyflowTotalChangeBuySellHeadsHistory.title}
          isLoading={
            symbolMoneyflowTotalChangeBuySellHeadsHistory_query.isLoading
          }
          isFetching={
            symbolMoneyflowTotalChangeBuySellHeadsHistory_query.isFetching
          }
          error={
            symbolMoneyflowTotalChangeBuySellHeadsHistory_query.isError
              ? symbolMoneyflowTotalChangeBuySellHeadsHistory_query.error
              : null
          }
          allow={symbolMoneyflowTotalChangeBuySellHeadsHistory?.allow}
          type="line"
        />
      </div>
      <div>
        <Chart
          className="h-[300px]"
          special={symbolTradeLastDayHistory.key}
          data={symbolTradeLastDayHistory_query.data?.data?.series}
          title={symbolTradeLastDayHistory.title}
          isLoading={symbolTradeLastDayHistory_query.isLoading}
          isFetching={symbolTradeLastDayHistory_query.isFetching}
          error={
            symbolTradeLastDayHistory_query.isError
              ? symbolTradeLastDayHistory_query.error
              : null
          }
          allow={symbolTradeLastDayHistory?.allow}
          type="area"
        />
      </div>
      <div>
        <Chart
          className="h-[300px]"
          special={symbolTradeValueHistory.key}
          data={symbolTradeValueHistory_query.data?.data?.series}
          title={symbolTradeValueHistory.title}
          isLoading={symbolTradeValueHistory_query.isLoading}
          isFetching={symbolTradeValueHistory_query.isFetching}
          error={
            symbolTradeValueHistory_query.isError
              ? symbolTradeValueHistory_query.error
              : null
          }
          allow={symbolTradeValueHistory?.allow}
          type="area"
        />
      </div>
      <div>
        <Chart
          className="h-[300px]"
          special={symbolCounterBuyerSellerHistory.key}
          data={symbolCounterBuyerSellerHistory_query.data?.data?.series}
          title={symbolCounterBuyerSellerHistory.title}
          type="line"
          isLoading={symbolCounterBuyerSellerHistory_query.isLoading}
          isFetching={symbolCounterBuyerSellerHistory_query.isFetching}
          error={
            symbolCounterBuyerSellerHistory_query.isError
              ? symbolCounterBuyerSellerHistory_query.error
              : null
          }
          allow={symbolCounterBuyerSellerHistory?.allow}
        />
      </div>
      <div>
        <Chart
          className="h-[300px]"
          special={symbolTradeTimeValueHistory.key}
          data={symbolTradeTimeValueHistory_query.data?.data?.series}
          title={symbolTradeTimeValueHistory.title}
          isLoading={symbolTradeTimeValueHistory_query.isLoading}
          isFetching={symbolTradeTimeValueHistory_query.isFetching}
          error={
            symbolTradeTimeValueHistory_query.isError
              ? symbolTradeTimeValueHistory_query.error
              : null
          }
          allow={symbolTradeTimeValueHistory?.allow}
          type="bar"
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
});

export default connect(mapStateToProps, null)(InstantCharts);
