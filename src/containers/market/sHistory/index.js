import React, { Component } from 'react';
import ITable from '../../../components/ITable';
import {header} from "./header"
import {getEveryFeeder} from "../../../apis/main/main";
import {connect} from "react-redux"
import { Helmet } from 'react-helmet';
import { Group, Text } from '@mantine/core';
import { withRouter } from 'react-router-dom';
import {setMainHeader,setMarketId} from "../../../redux/reducers/main";
import ls from "localstorage-slim"

class SHistory extends Component {
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
      getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then((res) => {
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
    this.props.setMarketId(this.state.id);
    this.props.setMainHeader(1);
    try {
      let id = await this.getInformation(this.state.id)
      this.getFeed(id);
    } catch (error) {
      console.log(error)
    }

    this.props.history.listen(async location => {
      let { pathname } = location;
      let URL_ID = pathname.split('/')[2];
      this.setState({ id: URL_ID });
      this.props.setMarketId(URL_ID);
      this.props.setMainHeader(1);
      try {
        let id = await this.getInformation(URL_ID)
        this.getFeed(id);
      } catch (error) {
        console.log(error)
      }
    
    })
  }

  componentWillUnmount(){
    this.props.setMainHeader(0);
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

const mapDispatchToProps = (dispatch) => ({
  setMarketId: (marketId) => dispatch(setMarketId(marketId)),
  setMainHeader: (id) => dispatch(setMainHeader(id)),
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SHistory))