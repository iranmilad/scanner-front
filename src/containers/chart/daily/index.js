import { Group, Select, Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';
import Chart from '../../../components/Chart';
import ChartData from '../../../components/Chart/chartData';
import { useConfig, useData } from '../../../helper';
import { setDailyList } from '../../../redux/reducers/config';

const Daily = (props) => {
  let {id} = useParams();
  const [param, setParam] = useState(id);

  let dailyCashFlowIndustriesGroup = useConfig(props.chartAndtables, "dailyCashFlowIndustriesGroup");
  let dailyCashFlowIndustriesGroup_query = useData(dailyCashFlowIndustriesGroup);

  let dailyTradeValue = useConfig(props.chartAndtables, "dailyTradeValue");
  let dailyTradeValue_query = useData(dailyTradeValue,`/${param}`);
  let [dailyTradeValue_labels, setDailyTradeValue_label] = useState(ChartData.dailyTradeValue.options?.labels || []);

  let dailyEntryMany = useConfig(props.chartAndtables, "dailyEntryMany");
  let dailyEntryMany_query = useData(dailyEntryMany,`/${param}`);
  let [dailyEntryMany_labels, setDailyEntryMany_label] = useState(ChartData.dailyEntryMany.options?.labels || []);

  let dailyPowerBuyer = useConfig(props.chartAndtables, "dailyPowerBuyer");
  let dailyPowerBuyer_query = useData(dailyPowerBuyer,`/${param}`);
  let [dailyPowerBuyer_labels, setDailyPowerBuyer_label] = useState(ChartData.dailyPowerBuyer.options?.labels || []);


  const label = dailyCashFlowIndustriesGroup_query.data?.data.find(
    (item) => item.value === param
  )?.label;

    useEffect(()=>{
      setDailyTradeValue_label(dailyTradeValue_query.data?.data?.date || []);
      setDailyEntryMany_label(dailyEntryMany_query.data?.data?.date || []);
      setDailyPowerBuyer_label(dailyPowerBuyer_query.data?.data?.date || []);
    },[dailyTradeValue_query.data, dailyEntryMany_query.data, dailyPowerBuyer_query.data])


  return (
    <>
    <Helmet>
      <title>نمودار های جریانات نقدیندگی</title>
    </Helmet>
    <Stack spacing="lg">
      <Group position="apart">
        <Text size="md">{label}</Text>
        <Select
        disabled={dailyCashFlowIndustriesGroup_query.isLoading || dailyTradeValue_query.isLoading || dailyEntryMany_query.isLoading || dailyPowerBuyer_query.isLoading}
          searchable
          onChange={setParam}
          placeholder="انتخاب صنعت"
          defaultValue={`${dailyCashFlowIndustriesGroup_query.data?.data[0]?.value}`}
          data={dailyCashFlowIndustriesGroup_query.isLoading ? [] : dailyCashFlowIndustriesGroup_query.data?.data}
        />
      </Group>
      <Chart
        data={dailyTradeValue_query.data?.data?.series}
        isLoading={dailyTradeValue_query.isLoading}
        isFetching={dailyTradeValue_query.isFetching}
        error={dailyTradeValue_query.isError ? dailyTradeValue_query.error : null}
        allow={dailyTradeValue?.allow}
        special={dailyTradeValue?.key}
        options={{ options: { ...ChartData.dailyTradeValue.options, labels: dailyTradeValue_labels } }}
        type={ChartData[dailyTradeValue.key].type}
        width="100%"
        className="h-[500px]"
        title={dailyTradeValue.title}
      />

      <Chart
        data={dailyEntryMany_query.data?.data?.series}
        isLoading={dailyEntryMany_query.isLoading}
        isFetching={dailyEntryMany_query.isFetching}
        error={dailyEntryMany_query.isError ? dailyEntryMany_query.error : null}
        allow={dailyEntryMany?.allow}
        special={dailyEntryMany?.key}
        options={{ options: { ...ChartData.dailyEntryMany.options, labels: dailyEntryMany_labels } }}
        type={ChartData[dailyEntryMany.key].type}
        width="100%"
        className="h-[500px]"
      
        title={dailyEntryMany.title}
      />

      <Chart
        data={dailyPowerBuyer_query.data?.data?.series}
        isLoading={dailyPowerBuyer_query.isLoading}
        isFetching={dailyPowerBuyer_query.isFetching}
        error={dailyPowerBuyer_query.isError ? dailyPowerBuyer_query.error : null}
        allow={dailyPowerBuyer?.allow}
        special={dailyPowerBuyer?.key}
        options={{ options: { ...ChartData.dailyPowerBuyer.options, labels: dailyPowerBuyer_labels } }}
        type={ChartData[dailyPowerBuyer.key].type}
        width="100%"
        className="h-[500px]"
      
        title={dailyPowerBuyer.title}
      />

    </Stack>
  </>
  )
}

const mapStateToProps = (state) => ({
  dailyList: state.config.dailyList,
  chartAndtables: state.config.needs.chartAndtables
});

const mapDispatchToProps = (dispatch) => ({
  setDailyList: (data) => dispatch(setDailyList(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Daily));
