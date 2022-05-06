import { Button, Group, Menu, Text } from '@mantine/core';
import React from 'react';
import { Helmet } from 'react-helmet';
import ITable from '../../components/ITable';
import {
  industries_history_type_1,
  industries_history_type_2,
} from '../../helper/statics';
import { getTable } from '../../apis/tables';
import { connect } from 'react-redux';

class History extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      title: null,
      type: null,
      data: [],
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

  industry_history(id) {
    window.open(`/industries/history/${id}`);
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
          <Menu
            transition="rotate-right"
            transitionDuration={100}
            transitionTimingFunction="ease"
            dir="rtl"
            title="گروه ها"
            control={<Button size="xs">انتخاب گروه</Button>}
            sx={(theme) => ({
              '& .mantine-Menu-body': {
                maxHeight: '300px !important',
                overflowY: 'auto',
              },
            })}
          >
            {this.industries_lists.map((item, id) => (
              <Menu.Item key={id} onClick={() => this.industry_history(item.value)}>
                {item.name}
              </Menu.Item>
            ))}
          </Menu>
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
