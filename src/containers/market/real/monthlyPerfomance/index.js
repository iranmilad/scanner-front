import { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getEveryFeeder } from "../../../../apis/main"
import {Group,Text,Paper,Center} from '@mantine/core';
import lodash from "lodash";
import Chart from "../../../../components/Chart";
import ChartData from "../../../../components/Chart/chartData";
import RoutesContext from "../../../../contexts/routes";

class Index extends Component{
  static contextType = RoutesContext
  state = {
    title: "",
    id: this.props.route.match.params.id,
    sellPerfomanceTitle: "",
    sellPerfomance: [],
    performanceValueTitle: "",
    performanceValue: []
  }

  getInformation(id = this.state.id) {
    return new Promise((resolve, reject) => {
      let thatItem = this.props.chartAndtables;
      thatItem = thatItem.find((item) => item.key === 'symbolInfo');
      getEveryFeeder(`${thatItem.feeder_url}/${id}`).then((res) => {
        this.setState({
          title: res.data.data.name,
        });
        resolve(id);
      }).catch(err => {
        reject(err)
      })
    })
  }


  getSellPerfomance(id = this.state.id){
    let thatItem = this.props.chartAndtables
    thatItem = thatItem.find(item => item.key === "stockSellPerfomanceValue")
    getEveryFeeder(`${thatItem.feeder_url}/${id}`).then(res => {
      if(res.data.show) {
        ChartData.sellPerfomance.options.labels = res.data.data.date;
        this.setState({
          sellPerfomanceTitle: res.data.title,
          sellPerfomance: res.data.data
        })
      }
      else{
        this.setState({
          sellPerfomance: []
        })
      }
    })

    this.sellPerfomanceInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${id}`).then(res => {
        if(res.data.show) {
          ChartData.sellPerfomance.options.labels = res.data.data.date;
          this.setState({
            sellPerfomanceTitle: res.data.title,
            sellPerfomance: res.data.data,
          })
        }
        else{
          this.setState({
            sellPerfomance: []
          })
        }
      })
    },thatItem.refresh_time * 1000)
  }

  getPerfomanceValue(id = this.state.id){
    let thatItem = this.props.chartAndtables
    thatItem = thatItem.find(item => item.key === "stockPerfomanceValue")
    getEveryFeeder(`${thatItem.feeder_url}/${id}`).then(res => {
      if(res.data.show) {
        ChartData.perfomanceValue.options.labels = res.data.data.date;
        this.setState({
          performanceValueTitle: res.data.title,
          performanceValue: res.data.data
        })
      }
      else{
        this.setState({
          performanceValue: []
        })
      }
    })

    this.perfomanceValueInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${id}`).then(res => {
        if(res.data.show) {
          ChartData.perfomanceValue.options.labels = res.data.data.date;
          this.setState({
            performanceValueTitle: res.data.title,
            performanceValue: res.data.data
          })
        }
        else{
          this.setState({
            performanceValue: []
          })
        }
      })
    },thatItem.refresh_time * 1000)
  }

  async componentDidMount(){

    try {
      await this.getInformation(this.context.stockID);
      this.getSellPerfomance(this.context.stockID);
      this.getPerfomanceValue(this.context.stockID);
    } catch (error) {
      console.log(error)
    }

    this.props.history.listen(async location => {
      try {
        await this.getInformation(this.context.stockID);
        this.getSellPerfomance(this.context.stockID);
        this.getPerfomanceValue(this.context.stockID);
      } catch (error) {
        console.log(error)
      }
    })
  }

  componentWillUnmount(){
    clearInterval(this.sellPerfomanceInterval)
    clearInterval(this.perfomanceValueInterval);
  }
  render(){
    return (
      <>
        <Helmet>
          <title>نمودار عملکرد ماهیانه : {this.state.title}</title>
        </Helmet>
        <Group position="apart" mb="md">
          <Text>نمودار عملکرد ماهیانه : {this.state.title}</Text>
        </Group>
        {lodash.isEmpty(this.state.sellPerfomance) && lodash.isEmpty(this.state.performanceValue) && (
          <Paper p="xl" radius="md" shadow="xs" mt="xl">
            <Center>
              <Text>داده ای وجود ندارد</Text>
            </Center>
          </Paper>
        )}
        {!lodash.isEmpty(this.state.sellPerfomance) && (
          <Chart 
            data={this.state.sellPerfomance.series}
            title={this.state.sellPerfomanceTitle}
            type="line"
            options={{ options: { ...ChartData.sellPerfomance.options } }}
          />
        )}
        {!lodash.isEmpty(this.state.performanceValue) && (
          <Chart
            data={this.state.performanceValue.series}
            title={this.state.performanceValueTitle}
            type="line"
            options={{options: {...ChartData.perfomanceValue.options}}}

            />
        )}
      </>
    )
  }
}

const mapStateToProps = state => ({
  chartAndtables: state.config.needs.chartAndtables
})


export default withRouter(connect(mapStateToProps)(Index));