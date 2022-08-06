import { Select } from '@mantine/core';
import { Group } from '@mantine/core';
import { Text } from '@mantine/core';
import { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { getEveryFeeder } from '../../../../apis/main/main';

class Chartx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectBox: [],
      selectBoxValue: '11',
      id: this.props.route.match.params.id,
    };
    this.technical = props.chartAndtables.find(
      (item) => item.key === 'symbolTechnicalChart'
    );
  }
  getOptions = () => {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'supportResistanceOption');
    getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then((res) =>
      this.setState({ selectBox: res.data.data })
    );
  };
  render() {
    return (
      <>
        <Helmet>
          <title>چارت</title>
        </Helmet>
        <Group position="apart">
          <Text size="sm">چارت</Text>
          <Select
          defaultValue={this.state.selectBoxValue}
            data={this.state.selectBox}
            onChange={(e) => this.setState({ selectBoxValue: e })}
            placeholder="انتخاب کنید"
          />
        </Group>
        <iframe width="100%" className='h-[80vh] mt-5' src={`${this.technical.feeder_url}/${this.state.id}/${this.state.selectBoxValue}`} seamless/>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
});

export default connect(mapStateToProps, null)(Chartx);
