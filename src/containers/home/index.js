import { History } from '../../helper/history';
import { Helmet } from 'react-helmet';
import {
  totalSummeryIndustrials,
  summaryTrans,
  totalSummerStockLOrN,
  totalSummeryGroupState,
  summary_config,
} from '../../helper/statics';
import ITable from '../../components/ITable';
import LoopChart from '../../components/LoopChart';
import { Component, useEffect, useState } from 'react';
import { Modal, Title } from '@mantine/core';
import { useSelector } from 'react-redux';
import { getModal } from '../../redux/reducers/main';
import TreeModal from './treemapModal';
import { useDispatch, connect } from 'react-redux';
import { setModal } from '../../redux/reducers/main';
import { tableWorker } from '../../helper';
import { getTable } from '../../apis/tables';
import _ from 'lodash'

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table1: {},
      table2: {},
      table3: {},
      table4: {},
      charts: []
    };
  }
  setTable1() {
    getTable('summaryTrans')
      .then((res) => {
        let newData = Object.assign({}, summaryTrans, { data: res.data.data });
        this.setState((prev) => ({
          ...prev,
          table1: newData,
        }));
      })
      .catch((err) => {});
  }
  setTable2() {
    getTable('totalSummeryGroupState')
      .then((res) => {
        let newData = Object.assign({}, totalSummeryGroupState, { data: res.data.data });
        this.setState((prev) => ({
          ...prev,
          table2: newData,
        }));
      })
      .catch((err) => {});
  }
  setTable3() {
    getTable('totalSummerStockLOrN')
      .then((res) => {
        let newData = Object.assign({}, totalSummerStockLOrN, { data: res.data.data });
        this.setState((prev) => ({
          ...prev,
          table3: newData,
        }));
      })
      .catch((err) => {});
  }
  setTable4() {
    getTable('totalSummeryIndustrials')
      .then((res) => {
        let newData = Object.assign({}, totalSummeryIndustrials, { data: res.data.data });
        this.setState((prev) => ({
          ...prev,
          table4: newData,
        }));
      })
      .catch((err) => {});
  }
  setCharts(){
    let config = this.props.config.needs.chartAndtables;
    let charts = config.filter(item => ! item.key.includes('tb') );
    charts = charts.filter(item => ! item.key.includes('treemap') );
    this.setState(prev => ({
      ...prev,
      charts
    }))
  }
  componentDidMount() {
    this.setTable1()
    let config = this.props.config.needs.chartAndtables;
    let table1 = config.filter((item) => {
      return item.key.includes('tb-summaryTrans');
    });
    this.setCharts();

    setInterval(()=>{
      this.setTable1();
    },table1[0].refresh_time * 1000);

    this.setTable2()
    let config2 = this.props.config.needs.chartAndtables;
    let table2 = config2.filter((item) => {
      return item.key.includes('tb-summaryTrans');
    });
    setInterval(()=>{
      this.setTable2();
    },table2[0].refresh_time * 1000);

    this.setTable3()
    let config3 = this.props.config.needs.chartAndtables;
    let table3 = config3.filter((item) => {
      return item.key.includes('tb-summaryTrans');
    });
    setInterval(()=>{
      this.setTable3();
    },table3[0].refresh_time * 1000);

    this.setTable4()
    let config4 = this.props.config.needs.chartAndtables;
    let table4 = config4.filter((item) => {
      return item.key.includes('tb-summaryTrans');
    });
    setInterval(()=>{
      this.setTable4();
    },table4[0].refresh_time * 1000);
  }


  // const modal = useSelector((state) => getModal(state));
  // const ModalContent = modal.content;
  // const dispatch = useDispatch();
  render() {
    return (
      <>
        <Helmet>
          <title></title>
        </Helmet>
        {/* <Modal
          opened={modal.show}
          onClose={() => dispatch(setModal({ show: false, content: 'tree' }))}
          centered
          size="70%"
          title="نقشه بازار"
        >
          {ModalContent === 'tree' && <TreeModal />}
        </Modal> */}
        <Title order={3}>صفحه خانه</Title>
        <ITable
          column={this.state.table1.header}
          data={this.state.table1.data}
          title="خلاصه معاملات خرد سهام و صندوق ها"
        />
        <ITable
          column={this.state.table2.header}
          data={this.state.table2.data}
          title="آمار تفکیک شده معاملات خرد"
        />
        <ITable column={this.state.table3.header}
          data={this.state.table3.data} title="حقیقی حقوقی" />
        <LoopChart charts={this.state.charts} />
        <ITable column={this.state.table4.header}
          data={this.state.table4.data} title="خلاصه معاملات صنایع بورس (جهت مشاهده دیده بان هر گروه روی نام آن گروه کلیک کنید.)" />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  config: state.config,
});

export default connect(mapStateToProps)(Index);
