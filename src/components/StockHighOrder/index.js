import { Component } from "react";
import {connect} from "react-redux";
import axios from "axios";
import {setSymbols} from '../../redux/reducers/main';
import UrlPattern  from 'url-pattern'


function StockHighOrder(WrappedComponent,id){
  class Index extends Component{
    constructor(props){
      super(props);
      this.state = {
        symbol: this.props.symbol
      }
    }
    async worker(){
      if(! this.state.symbol){
        try {
          let item = this.props.chartAndtables.find(item => item.key === "symbolInfo"); 
          let response = await axios.get(`${item.feeder_url}/${this.props.route.match.params.id}`);
          this.props.setSymbol({...response.data.data,id:this.props.route.match.params.id})
          return this.setState({symbol:response.data.data})
        } catch (error) {
          throw Error(error);
        }
      }
    }
    componentDidMount(){
      this.worker();
    }
    render(){
      return <WrappedComponent id={this.props.route.match.params.id} symbol={this.state.symbol} />
    }
  }
  const mapStateToProps = state => {
    let pattern = new UrlPattern('*/:id');
    let pageId = pattern.match(window.location.href);
    return {
      chartAndtables: state.config.needs.chartAndtables,
      symbol: state.main.symbols.find(item => item.id === pageId.id)
    }
  }

  const mapDispatchToProps = dispatch => ({
    setSymbol: data => dispatch(setSymbols(data))
  })
  return connect(mapStateToProps,mapDispatchToProps)(Index)
}

export default StockHighOrder