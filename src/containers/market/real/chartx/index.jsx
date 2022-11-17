import { Select } from '@mantine/core';
import { Group } from '@mantine/core';
import { Text } from '@mantine/core';
import { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getEveryFeeder } from '../../../../apis/main';
import RoutesContext from "../../../../contexts/routes"

class Chartx extends Component {
  static contextType = RoutesContext
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
  getOptions = (id = this.state.id) => {
    return new Promise((resolve, reject) => {
      let thatItem = this.props.chartAndtables;
      thatItem = thatItem.find(
        (item) => item.key === 'supportResistanceOption'
      );
      getEveryFeeder(`${thatItem.feeder_url}/${id}`)
        .then((res) => {
          this.setState({ selectBox: res.data.data });
          console.log(res.data.data);
          resolve(id);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  async componentDidMount() {
    try {
      await this.getOptions(this.state.id);
    } catch (error) {
      console.log(error);
    }

    this.props.history.listen(async (location) => {
      try {
        await this.getOptions(this.context.stockID);
      } catch (error) {
        console.log(error);
      }
    });
  }

  render() {
    return (
      <>
        <Helmet>
          <title>چارت</title>
        </Helmet>
        <Group position="apart">
          <Text size="sm">چارت</Text>
          {this.state.selectBoxValue && (
            <Select
              defaultValue={this.state.selectBoxValue}
              data={this.state.selectBox}
              onChange={(e) => this.setState({ selectBoxValue: e })}
              placeholder="انتخاب کنید"
            />
          )}
        </Group>
        {this.state.selectBox.length > 0 && (
          <iframe
            width="100%"
            className="h-[80vh] mt-5"
            src={`${this.technical.feeder_url}/${this.context.stockID}/${this.state.selectBoxValue}`}
            seamless
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
});


export default withRouter(connect(mapStateToProps)(Chartx));
