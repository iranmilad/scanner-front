import React, { Component ,useState} from 'react';
import Chart from '../../../components/Chart';
import { getEveryUser } from '../../../apis/main';
import { Group, Text, Select, Stack } from '@mantine/core';
import ChartData from '../../../components/Chart/chartData';
import { connect } from 'react-redux';
import { setDailyList } from '../../../redux/reducers/config';
import { useParams, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useData,useConfig } from '../../../helper';
import { useEffect } from 'react';

// class Daily extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: '',
//       dailyLists: [],
//       chart1: {},
//       chart2: {},
//       chart3: {},
//     };

//     this.history = props.history;
//     this.id = props.route.match.params.id;
//   }

//   chart1(id = this.id) {
//     let thatItem = this.props.chartAndtables;
//     thatItem = thatItem.find(item => item.key === "dailyTradeValue")
//     getEveryUser(`${thatItem.feeder_url}/${id}`).then((res) => {
//       ChartData.dailyChart1.options.labels = res.data.data.date;
//       this.setState({ chart1: res.data.data, title: res.data.title });
//     });
//   }

//   chart2(id = this.id) {
//     let thatItem = this.props.chartAndtables;
//     thatItem = thatItem.find(item => item.key === "dailyEntryMany")
//     getEveryUser(`${thatItem.feeder_url}/${id}`).then((res) => {
//       this.setState({ chart2: res.data.data, title: res.data.title });
//       ChartData.dailyChart2.options.labels = res.data.data.date;
//     });
//   }

//   chart3(id = this.id) {
//     let thatItem = this.props.chartAndtables;
//     thatItem = thatItem.find(item => item.key === "dailyPowerBuyer")
//     getEveryUser(`${thatItem.feeder_url}/${id}`).then((res) => {
//       this.setState({ chart3: res.data.data, title: res.data.title });
//       ChartData.dailyChart3.options.labels = res.data.data.date;
//     });
//   }

//   daily_history(value) {
//     this.history.push(`/chart/daily/${value}`);
//   }

//   get_daily_history() {
//     if (!this.props.dailyList.length > 0) {
//       let thatItem = this.props.chartAndtables;
//       thatItem = thatItem.find(item => item.key === "dailyCashFlowIndustriesGroup")
//       getEveryUser(thatItem.feeder_url).then(
//         (res) => {
//           this.setState({ dailyLists: res.data.data });
//           this.props.setDailyList(res.data.data);
//         }
//       );
//     }
//   }

//   history_updater() {
//     this.history.listen((location) => {
//       let { pathname } = location;
//       let id = pathname.split('/')[3];
//       this.chart1(id);
//       this.chart2(id);
//       this.chart3(id);
//     });
//   }

//   componentDidMount() {
//     if (this.props.dailyList.length > 0) {
//       this.setState({ dailyLists: this.props.dailyList });
//     } else {
//       this.get_daily_history();
//     }
//     this.history_updater();
//     this.chart1();
//     this.chart2();
//     this.chart3();
//   }

//   render() {
//     return (
//       <>
//         <Helmet>
//           <title>نمودار های جریانات نقدیندگی</title>
//         </Helmet>
//         <Stack spacing="lg">
//           <Group position="apart">
//             <Text size="md">{this.state.title}</Text>
//             <Select
//               searchable
//               onChange={(value) => this.daily_history(value)}
//               placeholder="انتخاب صنعت"
//               data={this.state.dailyLists || []}
//             />
//           </Group>
//           <Chart
//             data={this.state.chart1.series}
//             options={{ options: { ...ChartData.dailyChart1.options } }}
//             type="line"
//             width="100%"
//             height={300}
//             title="ارزش معاملات به میلیارد تومان"
//           />
//           <Chart
//             data={this.state.chart2.series}
//             options={{ options: { ...ChartData.dailyChart2.options } }}
//             type="bar"
//             width="100%"
//             height={350}
//             title="ورود پول اشخاص حقیقی به میلیارد تومان"
//           />
//           <Chart
//             data={this.state.chart3.series}
//             options={{ options: { ...ChartData.dailyChart3.options } }}
//             type="bar"
//             width="100%"
//             height={350}
//             title="قدرت نسبتی خریدار به فروشنده"
//           />
//         </Stack>
//       </>
//     );
//   }
// }

const Daily = (props) => {
  let {id} = useParams();
  const [param, setParam] = useState(id);

  let dailyCashFlowIndustriesGroup = useConfig(props.chartAndtables, "dailyCashFlowIndustriesGroup");
  let dailyCashFlowIndustriesGroup_query = useData(dailyCashFlowIndustriesGroup);

  let dailyTradeValue = useConfig(props.chartAndtables, "dailyTradeValue");
  let dailyTradeValue_query = useData(dailyTradeValue,`/${param}`);

  let dailyEntryMany = useConfig(props.chartAndtables, "dailyEntryMany");
  let dailyEntryMany_query = useData(dailyEntryMany,`/${param}`);

  let dailyPowerBuyer = useConfig(props.chartAndtables, "dailyPowerBuyer");
  let dailyPowerBuyer_query = useData(dailyPowerBuyer,`/${param}`);

  const label = dailyCashFlowIndustriesGroup_query.data?.data.find(
    (item) => item.value === param
  )?.label;

  useEffect(()=>{
    ChartData.dailyTradeValue.options.labels = dailyTradeValue_query.data?.data.date;
    ChartData.dailyEntryMany.options.labels = dailyEntryMany_query.data?.data.date;
    ChartData.dailyPowerBuyer.options.labels = dailyPowerBuyer_query.data?.data.date;
  } , [dailyTradeValue_query.data?.data, dailyEntryMany_query.data?.data, dailyPowerBuyer_query.data?.data])

  return (
    <>
    <Helmet>
      <title>نمودار های جریانات نقدیندگی</title>
    </Helmet>
    <Stack spacing="lg">
      <Group position="apart">
        <Text size="md">{label}</Text>
        <Select
        disabled={dailyCashFlowIndustriesGroup_query.isLoading || dailyCashFlowIndustriesGroup_query.isError}
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
        type={ChartData[dailyTradeValue.key].type}
        width="100%"
        height={300}
        title={dailyTradeValue.title}
      />

      <Chart
        data={dailyEntryMany_query.data?.data?.series}
        isLoading={dailyEntryMany_query.isLoading}
        isFetching={dailyEntryMany_query.isFetching}
        error={dailyEntryMany_query.isError ? dailyEntryMany_query.error : null}
        allow={dailyEntryMany?.allow}
        special={dailyEntryMany?.key}
        type={ChartData[dailyEntryMany.key].type}
        width="100%"
        height={300}
        title={dailyEntryMany.title}
      />

      <Chart
        data={dailyPowerBuyer_query.data?.data?.series}
        isLoading={dailyPowerBuyer_query.isLoading}
        isFetching={dailyPowerBuyer_query.isFetching}
        error={dailyPowerBuyer_query.isError ? dailyPowerBuyer_query.error : null}
        allow={dailyPowerBuyer?.allow}
        special={dailyPowerBuyer?.key}
        type={ChartData[dailyPowerBuyer.key].type}
        width="100%"
        height={300}
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
