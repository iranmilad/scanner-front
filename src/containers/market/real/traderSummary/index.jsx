import { Component } from 'react';
import ITable from '../../../../components/ITable';
import { header } from './header';
import { connect } from 'react-redux';
import { getEveryFeeder } from '../../../../apis/main';

class TraderSummary extends Component {
  state = {
    data: [],
  };
  async getDataFromServer() {
    try {
      let response = await getEveryFeeder(
        `${this.props.table.feeder_url}/${this.props.stockId}`
      );
      console.log(response.data.data);
      this.setState({
        data: response.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount() {
    this.getDataFromServer();
    // this.interval = setInterval(() => {
    //   this.getDataFromServer();
    // },this.props.table.refresh_time * 1000);
  }
  render() {
    return (
      <ITable title="خلاصه معاملات" data={this.state.data} column={header} />
    );
  }
}

const mapStateToProps = (state) => ({
  table: state.config.needs.chartAndtables.find(
    (item) => item.key === 'symbolTradeSummery'
  ),
});

export default connect(mapStateToProps)(TraderSummary);
