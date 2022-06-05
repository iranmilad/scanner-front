import { Select, Group, Text } from '@mantine/core';
import React from 'react';
import { Helmet } from 'react-helmet';
import ITable from '../../components/ITable';
import {
  industries_history_type_1,
  industries_history_type_2,
} from '../../helper/statics';
import { getTable } from '../../apis/tables';
import { connect } from 'react-redux';
import lodash from 'lodash'
import { getChart } from '../../apis/charts';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      type: null,
      data: [],
      industryLists: [],
    };
    /**
     * @type {String}
     */
    this.id = props.route.match.params.id;
    /**
     * @type {Array}
     */
    this.industries_lists = props.industry;
  }

  getIndustryList(){
    if(lodash.isEmpty(this.state.industryLists)){
      getChart('/totalIndustriesGroupHisory')
      .then((res) => {
        this.setState({ industryLists: res.data.data });
      })
    }
  }

  industry_history(id) {
    window.location.replace(`/industries/history/${id}`);
  }

  componentDidMount() {
    getTable(`/totalMarketHistory/${this.id}`).then((res) => {
      this.setState({
        title: res.data.title,
        data: res.data.data,
        type: res.data.type,
      });
    });
  }
  render() {
    return (
      <>
        <Helmet>
          <title>{this.state.title || 'Tseshow'}</title>
        </Helmet>
        <Group position="apart">
          <Text size="lg">{`سوابق ${this.state.title}` || ''}</Text>
          <Select
            searchable
            onChange={(value) => this.industry_history(value)}
            placeholder="انتخاب صنعت"
            onMouseOver={() => this.getIndustryList()}
            data={this.state.industryLists || []}
          />
        </Group>
        {this.state.type !== null ? (
          <ITable
            title=""
            data={this.state.data}
            column={
              this.state.type == 1
                ? industries_history_type_1.header
                : industries_history_type_2.header
            }
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  industry: state.config.industries,
});

export default connect(mapStateToProps)(History);
