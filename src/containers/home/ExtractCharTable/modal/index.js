import React, { Component } from 'react';
import { Modal } from '@mantine/core';
import ITable from '../../../../components/ITable';
import { header } from './header';
import { connect } from 'react-redux';
import { setModal} from '../../../../redux/reducers/chartable/chart';
import {getEveryFeeder} from "../../../../apis/main"

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      title: ""
    };
  }
  async getData(){
    let thatItem = this.props.subTable;
    thatItem = thatItem.find(item => item.key === "subTableController")
    try {
      let response = await getEveryFeeder(`${thatItem.feeder_url}/${this.props.chartName}/${this.props.point}`)
      this.setState({data: response.data.data,title:response.data.title})
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <Modal
        zIndex={99999999999}
        size="100%"
        opened={this.props.modalStatus}
        title={this.state.title}
        dir="rtl"
        onClose={() => this.props.setModal()}
      >
        <ITable
          column={header}
          data={this.state.data}
          fixedHeader
          fixedHeaderScrollHeight="70vh"
        />
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  subTable: state.config.needs.chartAndtable,
  modalStatus: state.chartable_chart.modal,
  point: state.chartable_chart.point,
  chartName: state.chartable_chart.chart
});

const mapDispatchToProps = (dispatch) => ({
  setModal: (data) => dispatch(setModal(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
