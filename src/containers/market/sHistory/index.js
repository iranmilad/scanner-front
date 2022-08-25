import React, { Component } from 'react';
import ITable from '../../../components/ITable';
import {header} from "./header"
import {getEveryFeeder} from "../../../apis/main";
import {connect} from "react-redux"
import { Helmet } from 'react-helmet';
import { Group, Text } from '@mantine/core';
import { withRouter } from 'react-router-dom';
import {setMainHeader,setMarketId} from "../../../redux/reducers/main";
import RoutesContext from "../../../contexts/routes"

class SHistory extends Component {
  static contextType = RoutesContext
  state = {
    title: '',
    data: [],
    id: this.props.route.match.params.id
   }
  getFeed(id = this.state.id){
    let table = this.props.table;
    async function getData(){
      try {
        let response = await getEveryFeeder(`${table.feeder_url}/${id}`);
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

  getInformation(id = this.state.id) {
    return new Promise((resolve, reject) => {
      let thatItem = this.props.table;
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

  async componentDidMount(){
    try {
      let id = await this.getInformation(this.state.id)
      this.getFeed(id);
    } catch (error) {
      console.log(error)
    }

    this.props.history.listen(async location => {
      this.setState({ id: this.context.stockID});
      try {
        await this.getInformation(this.context.stockID)
        this.getFeed(this.context.stockID);
      } catch (error) {
        console.log(error)
      } 
    })
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }


  render() {
    return (
      <>
        <Helmet>
          <title>سوابق : {this.state.title}</title>
        </Helmet>
        {this.state.title && (
        <Group>
          <Text size='md'>سوابق : {this.state.title}</Text>
        </Group>
        )}
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

export default withRouter(connect(mapStateToProps)(SHistory))