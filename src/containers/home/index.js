import { Helmet } from 'react-helmet';
import {
  totalSummeryIndustrials,
  summaryTrans,
  totalSummerStockLOrN,
  totalSummeryGroupState,
} from '../../helper/statics';
import ITable from '../../components/ITable';
import LoopChart from '../../components/LoopChart';
import { Component } from 'react';
import { connect } from 'react-redux';

import { getTable } from '../../apis/tables';
import _ from 'lodash';
import NewsTable from './news';
import { Text } from '@mantine/core';
import ls from 'localstorage-slim'

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table1: {},
      table2: {},
      table3: {},
      table4: {},
      charts: [],
    };
    this.config = ls.get('config');
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
        let newData = Object.assign({}, totalSummeryGroupState, {
          data: res.data.data,
        });
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
        let newData = Object.assign({}, totalSummerStockLOrN, {
          data: res.data.data,
        });
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
        let newData = Object.assign({}, totalSummeryIndustrials, {
          data: res.data.data,
        });
        this.setState((prev) => ({
          ...prev,
          table4: newData,
        }));
      })
      .catch((err) => {});
  }
  setCharts() {
    /**
     * @type {Array}
     */
     let config = this.props.config.needs.chartAndtables;
     let charts = config.filter(item => item.key.match(/A[0-9]/g));
    this.setState({charts});
  }
  componentDidMount() {
    this.setCharts();
    this.setTable1();
    let config = this.props.config.needs.chartAndtables;
    let table1 = config.filter((item) => {
      return item.key.includes('tb-summaryTrans');
    });

    this.interval1 = setInterval(() => {
      this.setTable1();
    }, table1[0].refresh_time * 1000);

    this.setTable2();
    let table2 = config.filter((item) => {
      return item.key.includes('tb-summaryTrans');
    });
    this.interval2 = setInterval(() => {
      this.setTable2();
    }, table2[0].refresh_time * 1000);

    this.setTable3();
    let table3 = config.filter((item) => {
      return item.key.includes('tb-summaryTrans');
    });
    this.interval3 = setInterval(() => {
      this.setTable3();
    }, table3[0].refresh_time * 1000);

    this.setTable4();
    let table4 = config.filter((item) => {
      return item.key.includes('tb-summaryTrans');
    });
    this.interval4 = setInterval(() => {
      this.setTable4();
    }, table4[0].refresh_time * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval1);
    clearInterval(this.interval2);
    clearInterval(this.interval3);
    clearInterval(this.interval4);
  }

  // const modal = useSelector((state) => getModal(state));
  // const ModalContent = modal.content;
  // const dispatch = useDispatch();
  render() {
    return (
      <>
        <Helmet>
          <title>Tseshow</title>
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
        <Text size="lg">صفحه خانه</Text>
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
        <ITable
          column={this.state.table3.header}
          data={this.state.table3.data}
          title="حقیقی حقوقی"
        ></ITable>
        <NewsTable />

        <LoopChart charts={this.state.charts} />
        <ITable
          column={this.state.table4.header}
          data={this.state.table4.data}
          title="خلاصه معاملات صنایع بورس (جهت مشاهده دیده بان هر گروه روی نام آن گروه کلیک کنید.)"
          fixedHeader
          fixedHeaderScrollHeight="70vh"
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  config: state.config,
});

// const mapDispatchToProps = (dispatch) => ({
//   setIndustry: (data) => dispatch(setIndustries(data)),
// })

export default connect(mapStateToProps)(Index);
