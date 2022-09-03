import React, { Component } from 'react';
import { Center, Loader, Modal } from '@mantine/core';
import ITable from '../../../../components/ITable';
import { header ,tableHeader} from './header';
import { connect } from 'react-redux';
import chart, { setModal } from '../../../../redux/reducers/chartable/chart';
import { getEveryFeeder } from '../../../../apis/main';
import lodash from 'lodash';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
    };
  }
  async getData(chartId = this.props.chart.id,chartPointIndex = this.props.chart.pointIndex) {
    let thatItem = this.props.subTable;
    this.setState({ loading: true });
    thatItem = thatItem.find((item) => item.key === 'subTableController');
    try {
      let response = await getEveryFeeder(
        `${thatItem.feeder_url}/${chartId}/${chartPointIndex}`
      );
      this.setState({ data: response.data.data, loading: false });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.modalStatus !== this.props.modalStatus) {
      if (nextProps.modalStatus) {
        this.getData(nextProps.chart.id,nextProps.chart.pointIndex);
      }
      return true;
    } else if (nextState.data !== this.state.data) {
      return true;
    } else {
      return false;
    }
  }

  onClose() {
    this.setState({ data: [] ,loading:false});
    this.props.setModal();
  }

  render() {
    return (
      <Modal
        zIndex={99999999999}
        size="90%"
        overflow="outside"
        opened={this.props.modalStatus}
        title={this.props.chart.label}
        dir="rtl"
        onClose={() => this.onClose()}
      >
        {this.state.loading ? (
          <Center>
            <Loader variant="dots" />
          </Center>
        ) : (
          <ITable
            column={this.props.chart.id === 'tb-GroupState' ? tableHeader : header}
            data={this.state.data}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="70vh"
          />
        )}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  subTable: state.config.needs.chartAndtables,
  modalStatus: state.chartable_chart.modal,
  chart: state.chartable_chart.chart,
});

const mapDispatchToProps = (dispatch) => ({
  setModal: (data) => dispatch(setModal(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
