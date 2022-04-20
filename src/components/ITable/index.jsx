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

  render() {
    return (
      <Paper padding="xl" radius="md" shadow="xs" mt="xl">
        <Group position='apart'>
          <Text mb={'lg'}>{this.props.title}</Text>
        </Group>
        {this.props.column && this.props.data ? (

          <DataTable columns={this.props.column} data={this.props.data} customStyles={TableDesign} />
        ) : (
          <Group position='center'>
            <Loader color="indigo" size="md" variant='dots' />
          </Group>
        )}
      </Paper>
    );
  }
}

export default ITable;