import { Component } from 'react';
import DataTable from 'react-data-table-component';
import lodash from 'lodash';
import { Group, Loader, Paper, Text } from '@mantine/core';
import {TableDesign} from '../../helper/theme';

/**
 * ITable for handle the every table
 * @component
 * @example
 * return (
 * <ITable
 *  data={data}
 *  columns={columns}
 * />
 */
class ITable extends Component {
  state = {
    header: [],
    data: [],
  };
  componentDidMount() {
    this.setState({
      header: this.props.data.header,
      data: this.props.data.data,
    });
  }
  render() {
    return (
      <Paper padding="xl" radius="md" shadow="xs" mt="xl">
        <Group position='apart'>
          <Text mb={'lg'}>{this.props.title}</Text>
        </Group>
        {lodash.isEmpty(this.state.data) || lodash.isEmpty(this.state.header) ? (
          <Loader variant="bars" color="indigo" />
        ) : (
          <DataTable columns={this.state.header} data={this.state.data} customStyles={TableDesign}/>
        )}
      </Paper>
    );
  }
}

export default ITable;