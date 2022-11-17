import { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Group, Text, Select, Grid } from '@mantine/core';
import { getEveryFeeder } from '../../../../apis/main';
import Chart from '../../../../components/Chart';
import { useParams, withRouter } from 'react-router-dom';
import RoutesContext from "../../../../contexts/routes";
import { findConfig, useData } from '../../../../helper';

// class SixChart extends Component {
//   static contextType = RoutesContext
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: '',
//       MoneyflowTotalEnterManyBuyerIHistoryData: [],
//       MoneyflowTotalChangeBuySellHeadsHistoryData: [],
//       symbolTradeLastDayHistoryData: [],
//       symbolTradeValueHistoryData: [],
//       symbolCounterBuyerSellerHistoryData: [],
//       symbolTradeTimeValueHistoryData: [],
//       id: this.props.route.match.params.id,
//       withDate: false,
//       DatePickerItems: [],
//       DatePickerDefaultValue: '',
//       SelectedDate: '',
//       loadingDatePicker: false,
//     };
//   }
//   getMoneyflowTotalEnterManyBuyerIHistoryData(date = this.state.SelectedDate) {
//     let thatItem = this.props.chartAndtables;
//     thatItem = thatItem.find(
//       (item) => item.key === 'symbolMoneyflowTotalEnterManyBuyerIHistory'
//     );
//     getEveryFeeder(`${thatItem.feeder_url}/${this.context.stockID}/${date}`).then(
//       (res) => {
//         this.setState({
//           MoneyflowTotalEnterManyBuyerIHistoryData: res.data.data.series,
//         });
//       }
//     );
//     this.MoneyflowTotalEnterManyBuyerIHistoryInterval = setInterval(() => {
//       getEveryFeeder(`${thatItem.feeder_url}/${this.context.stockID}/${date}`).then(
//         (res) => {
//           this.setState({
//             MoneyflowTotalEnterManyBuyerIHistoryData: res.data.data.series,
//           });
//         }
//       );
//     }, thatItem.refresh_time * 1000);
//   }

//   getMoneyflowTotalChangeBuySellHeadsHistoryData(
//     date = this.state.SelectedDate
//   ) {
//     let thatItem = this.props.chartAndtables;
//     thatItem = thatItem.find(
//       (item) => item.key === 'symbolMoneyflowTotalChangeBuySellHeadsHistory'
//     );
//     getEveryFeeder(`${thatItem.feeder_url}/${this.context.stockID}/${date}`).then(
//       (res) => {
//         this.setState({
//           MoneyflowTotalChangeBuySellHeadsHistoryData: res.data.data.series,
//         });
//       }
//     );
//     this.MoneyflowTotalChangeBuySellHeadsHistoryInterval = setInterval(() => {
//       getEveryFeeder(`${thatItem.feeder_url}/${this.context.stockID}/${date}`).then(
//         (res) => {
//           this.setState({
//             MoneyflowTotalChangeBuySellHeadsHistoryData: res.data.data.series,
//           });
//         }
//       );
//     }, thatItem.refresh_time * 1000);
//   }

//   getTradeLastDayHistoryData(date = this.state.SelectedDate) {
//     let thatItem = this.props.chartAndtables;
//     thatItem = thatItem.find(
//       (item) => item.key === 'symbolTradeLastDayHistory'
//     );
//     getEveryFeeder(`${thatItem.feeder_url}/${this.context.stockID}/${date}`).then(
//       (res) => {
//         this.setState({
//           symbolTradeLastDayHistoryData: res.data.data.series,
//         });
//       }
//     );
//     this.symbolTradeLastDayHistoryInterval = setInterval(() => {
//       getEveryFeeder(`${thatItem.feeder_url}/${this.context.stockID}/${date}`).then(
//         (res) => {
//           this.setState({
//             symbolTradeLastDayHistoryData: res.data.data.series,
//           });
//         }
//       );
//     }, thatItem.refresh_time * 1000);
//   }

//   getTradeValueHistoryData(date = this.state.SelectedDate) {
//     let thatItem = this.props.chartAndtables;
//     thatItem = thatItem.find((item) => item.key === 'symbolTradeValueHistory');
//     getEveryFeeder(`${thatItem.feeder_url}/${this.context.stockID}/${date}`).then(
//       (res) => {
//         this.setState({
//           symbolTradeValueHistoryData: res.data.data.series,
//         });
//       }
//     );
//     this.symbolTradeValueHistoryInterval = setInterval(() => {
//       getEveryFeeder(`${thatItem.feeder_url}/${this.context.stockID}/${date}`).then(
//         (res) => {
//           this.setState({
//             symbolTradeValueHistoryData: res.data.data.series,
//           });
//         }
//       );
//     }, thatItem.refresh_time * 1000);
//   }

//   getCounterBuyerSellerHistoryData(date = this.state.SelectedDate) {
//     let thatItem = this.props.chartAndtables;
//     thatItem = thatItem.find(
//       (item) => item.key === 'symbolCounterBuyerSellerHistory'
//     );
//     getEveryFeeder(`${thatItem.feeder_url}/${this.context.stockID}/${date}`).then(
//       (res) => {
//         this.setState({
//           symbolCounterBuyerSellerHistoryData: res.data.data.series,
//         });
//       }
//     );
//     this.symbolCounterBuyerSellerHistoryInterval = setInterval(() => {
//       getEveryFeeder(`${thatItem.feeder_url}/${this.context.stockID}/${date}`).then(
//         (res) => {
//           this.setState({
//             symbolCounterBuyerSellerHistoryData: res.data.data.series,
//           });
//         }
//       );
//     }, thatItem.refresh_time * 1000);
//   }

//   getTradeTimeValueHistoryData(date = this.state.SelectedDate) {
//     let thatItem = this.props.chartAndtables;
//     thatItem = thatItem.find(
//       (item) => item.key === 'symbolTradeTimeValueHistory'
//     );
//     getEveryFeeder(`${thatItem.feeder_url}/${this.context.stockID}/${date}`).then(
//       (res) => {
//         this.setState({
//           symbolTradeTimeValueHistoryData: res.data.data.series,
//         });
//       }
//     );
//     this.symbolTradeTimeValueHistoryInterval = setInterval(() => {
//       getEveryFeeder(`${thatItem.feeder_url}/${this.context.stockID}/${date}`).then(
//         (res) => {
//           this.setState({
//             symbolTradeTimeValueHistoryData: res.data.data.series,
//           });
//         }
//       );
//     }, thatItem.refresh_time * 1000);
//   }

//   getInformation(id = this.state.id) {
//     return new Promise((resolve, reject) => {
//       let thatItem = this.props.chartAndtables;
//       thatItem = thatItem.find((item) => item.key === 'symbolInfo');
//       getEveryFeeder(`${thatItem.feeder_url}/${this.context.stockID}`).then((res) => {
//         this.setState({
//           title: res.data.data.name,
//         });
//         resolve(id);
//       }).catch(err => {
//         reject(err)
//       })
//     })
//   }

//   getDates(id = this.state.id) {
//     this.setState({ loadingDatePicker: true });
//     return new Promise((resolve, reject) => {
//       let thatItem = this.props.chartAndtables;
//       thatItem = thatItem.find((item) => item.key === 'symbolHistoryDate');
//       getEveryFeeder(`${thatItem.feeder_url}/${this.context.stockID}`)
//         .then((res) => {
//           this.setState({
//             DatePickerItems: res.data.data,
//             DatePickerDefaultValue: res.data.data[0].value,
//             SelectedDate: res.data.data[0].value,
//             loadingDatePicker: false,
//           });
//           resolve(res.data.data[0].value);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     });
//   }

//   dateChanger = (e) => {
//     this.setState({
//       SelectedDate: e,
//     });
//     this.getMoneyflowTotalEnterManyBuyerIHistoryData(e);
//     this.getMoneyflowTotalChangeBuySellHeadsHistoryData(e);
//     this.getTradeLastDayHistoryData(e);
//     this.getTradeValueHistoryData(e);
//     this.getCounterBuyerSellerHistoryData(e);
//     this.getTradeTimeValueHistoryData(e);
//   };

//   async componentDidMount() {
//     try {
//       await this.getInformation(this.context.stockID);
//       let date = await this.getDates(this.context.stockID);
//       this.getMoneyflowTotalEnterManyBuyerIHistoryData(date);
//       this.getMoneyflowTotalChangeBuySellHeadsHistoryData(date);
//       this.getTradeLastDayHistoryData(date);
//       this.getTradeValueHistoryData(date);
//       this.getCounterBuyerSellerHistoryData(date);
//       this.getTradeTimeValueHistoryData(date);
//     } catch (error) {
//       console.log(error)
//     }

//     this.props.history.listen(async location => {
//       this.setState({id: this.context.stockID});
//       try {
//         await this.getInformation(this.context.stockID);
//         let date = await this.getDates(this.context.stockID);
//         this.getMoneyflowTotalEnterManyBuyerIHistoryData(date);
//         this.getMoneyflowTotalChangeBuySellHeadsHistoryData(date);
//         this.getTradeLastDayHistoryData(date);
//         this.getTradeValueHistoryData(date);
//         this.getCounterBuyerSellerHistoryData(date);
//         this.getTradeTimeValueHistoryData(date);
//       } catch (error) {
//         console.log(error)
//       }
//     })


//   }
//   componentWillUnmount() {
//     clearInterval(this.MoneyflowTotalEnterManyBuyerIHistoryInterval);
//     clearInterval(this.MoneyflowTotalChangeBuySellHeadsHistoryInterval);
//     clearInterval(this.symbolTradeLastDayHistoryInterval);
//     clearInterval(this.symbolTradeValueHistoryInterval);
//     clearInterval(this.symbolCounterBuyerSellerHistoryInterval);
//     clearInterval(this.symbolTradeTimeValueHistoryInterval);
//   }

//   render() {
//     return (
//       <>
//         <Group position="apart">
//           <Text>{this.state.title}</Text>
//           {this.state.DatePickerDefaultValue !== '' && (
//             <Select
//               zIndex={9999999999}
//               defaultValue={`${this.state.DatePickerDefaultValue}`}
//               data={this.state.DatePickerItems}
//               onChange={(e) => this.dateChanger(e)}
//               disabled={this.state.loadingDatePicker}
//             />
//           )}
//         </Group>
//         <Grid mt="md">
//           <Grid.Col sm={6} md={4}>
//             <Chart
//               special="FX1"
//               data={this.state.MoneyflowTotalEnterManyBuyerIHistoryData}
//               title="تغییرات ورود پول اشخاص حقیقی"
//               type="area"
//               height={300}
//             />
//           </Grid.Col>
//           <Grid.Col sm={6} md={4}>
//             <Chart
//               special="FX2"
//               data={this.state.MoneyflowTotalChangeBuySellHeadsHistoryData}
//               title="تغییرات سرانه های خرید و فروش"
//               type="line"

//               height={300}
//             />
//           </Grid.Col>
//           <Grid.Col sm={6} md={4}>
//             <Chart
//               special="FX3"
//               data={this.state.symbolTradeLastDayHistoryData}
//               title="نمودار تغییرات قیمت"
//               type="area"

//               height={300}
//             />
//           </Grid.Col>
//           <Grid.Col sm={6} md={4}>
//             <Chart
//               special="FX4"
//               data={this.state.symbolTradeValueHistoryData}
//               title="تغییرات ارزش معاملات"
//               type="area"

//               height={300}
//             />
//           </Grid.Col>
//           <Grid.Col sm={6} md={4}>
//             <Chart
//               special="FX5"
//               data={this.state.symbolCounterBuyerSellerHistoryData}
//               title="تغییرات تعداد کدهای خریدار و فروشنده"
//               type="line"

//               height={300}
//             />
//           </Grid.Col>
//           <Grid.Col sm={6} md={4}>
//             <Chart
//               special="FX6"
//               data={this.state.symbolTradeValueHistoryData}
//               title="ارزش لحظه ای معاملات"
//               type="bar"

//               height={300}
//             />
//           </Grid.Col>
//         </Grid>
//       </>
//     );
//   }
// }

const SixChart = (props) => {
  let {id} = useParams();

  let symbolInfo = findConfig(props.chartAndtables,'symbolInfo');
  let symbolInfo_query = useData(symbolInfo,`/${id}`);

  let symbolHistoryDate = findConfig(props.chartAndtables,'symbolHistoryDate');
  let symbolHistoryDate_query = useData(symbolHistoryDate,`/${id}`);
  const [date,setDate] = useState(symbolHistoryDate_query.data?.data[0].value);

  let symbolMoneyflowTotalEnterManyBuyerIHistory = findConfig(props.chartAndtables,'symbolMoneyflowTotalEnterManyBuyerIHistory');
  let symbolMoneyflowTotalEnterManyBuyerIHistory_query = useData(symbolMoneyflowTotalEnterManyBuyerIHistory,`/${id}`);

  let symbolMoneyflowTotalChangeBuySellHeadsHistory = findConfig(props.chartAndtables,'symbolMoneyflowTotalChangeBuySellHeadsHistory');
  let symbolMoneyflowTotalChangeBuySellHeadsHistory_query = useData(symbolMoneyflowTotalChangeBuySellHeadsHistory,`/${id}`);

  let symbolTradeLastDayHistory = findConfig(props.chartAndtables,"symbolTradeLastDayHistory");
  let symbolTradeLastDayHistory_query = useData(symbolTradeLastDayHistory,`/${id}`)

  let symbolTradeValueHistory = findConfig(props.chartAndtables,"symbolTradeValueHistory");
  let symbolTradeValueHistory_query = useData(symbolTradeValueHistory,`/${id}`);

  let symbolCounterBuyerSellerHistory = findConfig(props.chartAndtables,"symbolCounterBuyerSellerHistory");
  let symbolCounterBuyerSellerHistory_query = useData(symbolCounterBuyerSellerHistory,`/${id}`);

  let symbolTradeTimeValueHistory = findConfig(props.chartAndtables,"symbolTradeTimeValueHistory");
  let symbolTradeTimeValueHistory_query = useData(symbolTradeTimeValueHistory,`/${id}`);

  return (
    <>
    <Group position="apart">
      <Text>{symbolInfo_query.data?.data?.name}</Text>
      <Select
          zIndex={9999999999}
          defaultValue={symbolHistoryDate_query.isFetched ? date : ""}
          data={symbolHistoryDate_query.isFetched ? symbolHistoryDate_query.data?.data : []}
          onChange={(e) => setDate(e)}
          disabled={symbolHistoryDate_query.isLoading}
        />
    </Group>
    <Grid mt="md">
      <Grid.Col sm={6} md={4}>
        <Chart
          special="FX1"
          data={symbolMoneyflowTotalEnterManyBuyerIHistory_query.data?.data?.series}
          title={symbolMoneyflowTotalEnterManyBuyerIHistory.title}
          type="area"
          height={300}
        />
      </Grid.Col>
      <Grid.Col sm={6} md={4}>
        <Chart
          special="FX2"
          data={symbolMoneyflowTotalChangeBuySellHeadsHistory_query.data?.data?.series}
          title={symbolMoneyflowTotalChangeBuySellHeadsHistory.title}
          type="line"
          height={300}
        />
      </Grid.Col>
      <Grid.Col sm={6} md={4}>
        <Chart
          special="FX3"
          data={symbolTradeLastDayHistory_query.data?.data?.series}
          title={symbolTradeLastDayHistory.title}
          type="area"
          height={300}
        />
      </Grid.Col>
      <Grid.Col sm={6} md={4}>
        <Chart
          special="FX4"
          data={symbolTradeValueHistory_query.data?.data?.series}
          title={symbolTradeValueHistory.title}
          type="area"
          height={300}
        />
      </Grid.Col>
      <Grid.Col sm={6} md={4}>
        <Chart
          special="FX5"
          data={symbolCounterBuyerSellerHistory_query.data?.data?.series}
          title={symbolCounterBuyerSellerHistory.title}
          type="line"

          height={300}
        />
      </Grid.Col>
      <Grid.Col sm={6} md={4}>
        <Chart
          special="FX6"
          data={symbolTradeTimeValueHistory_query.data?.data?.series}
          title={symbolTradeTimeValueHistory.title}
          type="bar"
          height={300}
        />
      </Grid.Col>
    </Grid>
  </>
  )
}

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
});


export default withRouter(connect(mapStateToProps)(SixChart));
