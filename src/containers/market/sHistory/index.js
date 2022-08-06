import React, { Component } from 'react';
import ITable from '../../../components/ITable';
import {header} from "./header"
import {getEveryFeeder} from "../../../apis/main/main";
import {connect} from "react-redux"
import { Helmet } from 'react-helmet';
import { Group } from '@mantine/core';

class SHistory extends Component {
  state = {
    title: '',
    data: [],
    id: this.props.route.match.params.id
   }
  getFeed(){
    let table = this.props.table;
    async function getData(){
      try {
        let response = await getEveryFeeder(`${table.feeder_url}/${this.state.id}`);
        this.setState({
          data: response.data.data
        })
      } catch (error) {
        console.log(error)
      };
    }
    getData.bind(this)();

    this.interval = setInterval(()=>{
      getData.bind(this)();
    },table.refresh_time * 1000);
  }
  componentDidMount(){
    this.getFeed();
  }

  render() {
    return (
      <>
        <Helmet>
          <title>سوابق : {this.state.title}</title>
        </Helmet>
        <Group>
          <title>{this.state.title}</title>
        </Group>
        <ITable
          data={this.state.data}
          column={header}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="70vh"
        />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  table: state.config.needs.chartAndtables.find(item => item.key === "symbolHistory")
})

export default connect(mapStateToProps)(SHistory)