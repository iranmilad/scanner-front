import { Text, Group, MediaQuery, Tabs } from '@mantine/core';
import {} from "@mantine/hooks"
import { useState } from 'react';
import { connect } from 'react-redux';
import Chart, { ChartData } from '../../components/Chart';
import ITable from '../../components/ITable';
import { useConfig, useData } from '../../helper';
import {
  summaryTrans,
  totalSummerStockLOrN,
  totalSummeryGroupState,
  totalSummeryIndustrials,
} from '../../helper/statics';
import NewsTable from './news';
import ExtractCharTable from './ExtractCharTable';

const Index = (props) => {
  let [gridSystem, setGridSystem] = useState(
    localStorage.getItem('grids') ? +localStorage.getItem('grids') : 0
  );
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
  let newChart = [];
  let conf = useConfig;
  for (let i = 0; i < charts.length; i++) {
    let item = conf(config, charts[i].key);
    if (item) newChart.push(item);
  }

  function onChangeTab(tabIndex) {
    setGridSystem(+tabIndex);
    localStorage.setItem('grids', +tabIndex);
  }

  function GridCom() {
    return (
      <div className="hidden lg:block">
        <Group position="right">
          <MediaQuery query="(min-width: 576px)">
            <Tabs
              className="sm:hidden"
              active={gridSystem}
              mt="lg"
              variant="unstyled"
              onTabChange={(id) => onChangeTab(id)}
              styles={(theme) => ({
                tabControl: {
                  borderRadius: theme.radius.sm,
                },
                tabActive: {
                  backgroundColor: theme.colors.blue[7],
                  borderColor: theme.colors.blue[7],
                  color: theme.white,
                },
              })}
            >
              <Tabs.Tab
                key="2"
                icon={
                  <svg
                    className={`w-5 h-5 ${
                      +gridSystem === 0 ? 'fill-white' : 'fill-blue-500'
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <defs>
                      <style>{`.fa-secondary{opacity:.4}`}</style>
                    </defs>
                    <path
                      className="fa-primary"
                      d="M192 176C192 202.5 170.5 224 144 224H48C21.49 224 0 202.5 0 176V80C0 53.49 21.49 32 48 32H144C170.5 32 192 53.49 192 80V176zM448 432C448 458.5 426.5 480 400 480H304C277.5 480 256 458.5 256 432V336C256 309.5 277.5 288 304 288H400C426.5 288 448 309.5 448 336V432z"
                    />
                    <path
                      className="fa-secondary"
                      d="M448 184C448 206.1 430.1 224 408 224H296C273.9 224 256 206.1 256 184V72C256 49.91 273.9 32 296 32H408C430.1 32 448 49.91 448 72V184zM192 440C192 462.1 174.1 480 152 480H40C17.91 480 0 462.1 0 440V328C0 305.9 17.91 288 40 288H152C174.1 288 192 305.9 192 328V440z"
                    />
                  </svg>
                }
              ></Tabs.Tab>
              <Tabs.Tab
                key="3"
                icon={
                  <svg
                    className={`w-5 h-5 ${
                      +gridSystem === 1 ? 'fill-white' : 'fill-blue-500'
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <defs>
                      <style>{`.fa-secondary{opacity:.4}`}</style>
                    </defs>
                    <path
                      className="fa-primary"
                      d="M0 72C0 49.91 17.91 32 40 32H88C110.1 32 128 49.91 128 72V120C128 142.1 110.1 160 88 160H40C17.91 160 0 142.1 0 120V72zM0 392C0 369.9 17.91 352 40 352H88C110.1 352 128 369.9 128 392V440C128 462.1 110.1 480 88 480H40C17.91 480 0 462.1 0 440V392zM288 280C288 302.1 270.1 320 248 320H200C177.9 320 160 302.1 160 280V232C160 209.9 177.9 192 200 192H248C270.1 192 288 209.9 288 232V280zM320 72C320 49.91 337.9 32 360 32H408C430.1 32 448 49.91 448 72V120C448 142.1 430.1 160 408 160H360C337.9 160 320 142.1 320 120V72zM448 440C448 462.1 430.1 480 408 480H360C337.9 480 320 462.1 320 440V392C320 369.9 337.9 352 360 352H408C430.1 352 448 369.9 448 392V440z"
                    />
                    <path
                      className="fa-secondary"
                      d="M248 32C270.1 32 288 49.91 288 72V120C288 142.1 270.1 160 248 160H200C177.9 160 160 142.1 160 120V72C160 49.91 177.9 32 200 32H248zM88 192C110.1 192 128 209.9 128 232V280C128 302.1 110.1 320 88 320H40C17.91 320 0 302.1 0 280V232C0 209.9 17.91 192 40 192H88zM160 392C160 369.9 177.9 352 200 352H248C270.1 352 288 369.9 288 392V440C288 462.1 270.1 480 248 480H200C177.9 480 160 462.1 160 440V392zM408 192C430.1 192 448 209.9 448 232V280C448 302.1 430.1 320 408 320H360C337.9 320 320 302.1 320 280V232C320 209.9 337.9 192 360 192H408z"
                    />
                  </svg>
                }
              ></Tabs.Tab>
            </Tabs>
          </MediaQuery>
        </Group>
      </div>
    );
  }

  return (
    <>
      <Text mb="md">خانه</Text>
      <ITable
        column={summaryTrans.header}
        isLoading={tb_summaryTrans_query.isLoading}
        isFetching={tb_summaryTrans_query.isFetching}
        allow={tb_summaryTrans?.allow}
        error={
          tb_summaryTrans_query.isError ? tb_summaryTrans_query.error : null
        }
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
      <GridCom />
      <div
        className={`grid gap-4 mt-4 auto-cols-auto grid-cols-1 items-stretch ${
          gridSystem === 0 ? 'md:grid-cols-2' : 'md:grid-cols-3'
        }`}
      >
        {newChart.map((item, index) => (
          <div
            className={`${ index === newChart.length - 1
              ? gridSystem === 0
                ? 'md:col-span-1'
                : 'md:col-span-3'
              : ''} h-full relative`}
          >
            <XChart className="h-[450px]" item={item} key={item.key} />
          </div>
        ))}
      </div>
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
      <ExtractCharTable />
    </>
  );
};

export const XChart = ({ item,className,...other }) => {
  let query = useData(item);
  return (
    <Chart
      allow={item?.allow}
      data={query.data?.data?.series}
      isLoading={query.isLoading}
      isFetching={query.isFetching}
      error={query.isError ? query.error : null}
      type={ChartData[item.key].type}
      special={item.key}
      title={item.title}
      className={className}
      {...other}
    />
  );
};

const mapStateToProps = (state) => ({
  config: state.config,
});

export default connect(mapStateToProps)(Index);
