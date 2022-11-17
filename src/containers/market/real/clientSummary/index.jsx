import { Component } from 'react';
import ITable from '../../../../components/ITable';
import { header } from './header';
import { getEveryFeeder } from '../../../../apis/main';
import { connect } from 'react-redux';

class ClientSummary extends Component {
  state = {
    data: {
      "n0": "526.0",
      "n1": "15.7 M",
      "n2": "60.5 B",
      "n3": "115.9 M",
      "n4": "1.0",
      "n5": "115.6 M",
      "n6": "60.4 B",
      "n7": "15.7 M",
      "n8": "527.0",
    },
  };
  async getData() {
    let thatItem = this.props.everyThing;
    thatItem = thatItem.find((item) => item.key === 'symbolClientSummery');

    getEveryFeeder(`${thatItem.feeder_url}/${this.props.stockId}`)
    .then(res => {
      this.setState({ data: res.data.data });
    })
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <ITable
        column={header}
        data={this.state.data}
        
      />
    );
  }
}

const mapStateToProps = (state) => ({
  everyThing: state.config.needs.chartAndtables,
});

export default connect(mapStateToProps, null)(ClientSummary);
