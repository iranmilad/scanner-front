import { Select, Group, Text } from '@mantine/core';
import {Component} from 'react';
import { Helmet } from 'react-helmet';
import ITable from '../../components/ITable';
import {
  industries_history_type_1,
  industries_history_type_2,
} from '../../helper/statics';
import { getEveryFeeder } from '../../apis/main';
import { connect } from 'react-redux';
import lodash from 'lodash';
import { Paper } from '@mantine/core';
import { Center } from '@mantine/core';
import { Loader } from '@mantine/core';
import { withRouter } from 'react-router-dom';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      type: null,
      data: [],
      industryLists: [],
      loading: false,
      id: this.props.match.params.id,
    };
  }

  getIndustryList() {
    if (lodash.isEmpty(this.state.industryLists)) {
      this.setState({ loading: true });
      let thatItem = this.props.chartAndtables;
      thatItem = thatItem.find(
        (item) => item.key === 'totalIndustriesGroupHisory'
      );
      getEveryFeeder(thatItem.feeder_url).then((res) => {
        this.setState({ industryLists: res.data.data, loading: false });
      });
    }
  }

  getTableData(id = this.state.id) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'marketHistory');

    getEveryFeeder(`${thatItem.feeder_url}/${id}`)
      .then((res) => {
        this.setState({
          title: res.data.title,
          data: res.data.data,
          type: res.data.type,
          loading: false,
        });
      })
      .catch((res) => {
        this.setState({ loading: false });
      });

    this.interval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${id}`)
        .then((res) => {
          this.setState({
            title: res.data.title,
            data: res.data.data,
            type: res.data.type,
            loading: false,
          });
        })
        .catch((res) => {
          this.setState({ loading: false });
        });
    }, thatItem.refresh_time * 1000);
  }

  changeIndustry(value) {
    this.props.history.push(`/industries/history/${value}`);
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getTableData(this.state.id);
    this.props.history.listen((location, action) => {
      let { pathname } = location;
      let id = pathname.split('/')[3];
      this.setState({ id });
      this.getTableData(id);
    });
  }

  componentWillUnmount(){
    this.clearInterval();
  }
  render() {
    return (
      <>
        <Helmet>
          <title>{this.state.title || 'Tseshow'}</title>
        </Helmet>
        <Group position="apart">
          <Text size="md">{`سوابق ${this.state.title}` || ''}</Text>
          <Select
            searchable
            onChange={(value) => this.changeIndustry(value)}
            placeholder="انتخاب صنعت"
            onMouseOver={() => this.getIndustryList()}
            data={this.state.industryLists || []}
          />
        </Group>
        <>
          {this.state.loading ? (
            <Paper p="xl" radius="md" shadow="xs" mt="xl">
              <Center>
                <Loader variant="dots" />
              </Center>
            </Paper>
          ) : (
            <ITable
            className="narrow-md"
              title=""
              data={this.state.data}
              column={
                this.state.type == 1
                  ? industries_history_type_1.header
                  : industries_history_type_2.header
              }
              fixedHeader
              fixedHeaderScrollHeight="70vh"
              pagination
            />
          )}
        </>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  industry: state.config.industries,
  chartAndtables: state.config.needs.chartAndtables,
});

export default withRouter(connect(mapStateToProps)(History));
