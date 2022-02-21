import { Component} from "react";
import MainLayout from "../../layouts/mainLayout";
import {
  summaryOfRetailTable,
  Separated_statistics_micro_transactions,
  Real_Legal,
  Summary_exchanges,
} from '../../helper/statics';
import ITable from '../../components/ITable';
import LoopChart from '../../components/LoopChart';
import { firstChart ,twoChart , threeChart,fourchart , fiveChart , sixChart,sevenChart,eightChart,A9,A10,A11,A12,A13,A14,A15,A16,A17,A18} from "../../helper/fakeData";
import { Helmet } from "react-helmet";

class Home extends Component{
  state = {
    charts: [],
  }
  componentDidMount(){
    this.setState({
      charts: [firstChart,twoChart,threeChart,fourchart,fiveChart,sixChart,sevenChart,eightChart,A9,A10,A11,A12,A13,A14,A15,A16,A17,A18]
    }) 
  }
  render(){
    return (
      <>
      <Helmet>
        <title>صفحه خانه</title>
      </Helmet>
      <MainLayout title="صفحه خانه" >
        <ITable data={summaryOfRetailTable} title="خلاصه معاملات خرد سهام و صندوق ها" />
        <ITable data={Separated_statistics_micro_transactions} title="آمار تفکیک شده معاملات خرد" />
        <ITable data={Real_Legal} title="حقیقی حقوقی" />
        <LoopChart charts={this.state.charts} />
        <ITable data={Summary_exchanges} title="خلاصه معاملات صنایع بورس" />
      </MainLayout>
    </>
    )
  }
}


export default Home