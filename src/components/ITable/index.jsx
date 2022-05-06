import React from 'react';
import { Component } from 'react';
import DataTable from 'react-data-table-component';
import lodash from 'lodash';
import {
  Card,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Text,
  Badge,
  Button,
} from '@mantine/core';
import { TableDesign } from '../../helper/theme';

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

const ITable = ({ title, column, data, children, customStyles, ...other }) => {
  return (
    <Paper padding="xl" radius="md" shadow="xs" mt="xl">
      <Group position="apart">
        <Text mb={'lg'}>{title}</Text>
      </Group>
        <DataTable
          columns={column}
          data={data}
          progressPending={data ? false : true}
          progressComponent={<Loader variant='dots' color='blue' />}
          customStyles={customStyles ? customStyles : TableDesign}
          {...other}
        />
        {children}
    </Paper>
  );
};

export default ITable;
