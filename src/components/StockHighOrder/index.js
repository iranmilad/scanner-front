import { Component } from "react";
import {connect} from "react-redux";
import axios from "axios";
import { useConfig } from "../../helper";


export function StockHighOrder(WrappedComponent,id){
  class Index extends Component{
    constructor(props){
      super(props);
      this.state = {
        symbol: this.props.symbol
      }
      this.worker();
    }
    async worker(){
      if(! this.state.symbol){
        try {
          let item = useConfig(this.props.chartAndtables,"symbolInfo")
          let response = await axios.get(`${item.feeder_url}/${id}`);
          return response.data.data
        } catch (error) {
          throw Error(error);
        }
      }
    }
    render(){
      return <WrappedComponent id={id} symbol={this.state.symbol} />
    }
  }
  const mapStateToProps = state => ({
    chartAndtables: state.config.needs.chartAndtables,
    symbol: state.main.symbols.filter(item => item.id === id)
  })
  return connect(mapStateToProps)(Index)
}