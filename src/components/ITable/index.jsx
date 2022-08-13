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
  Center,
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
  let paginationComponentOptions = {
    rowsPerPageText: 'تعداد نمایش',
    rangeSeparatorText: 'از',
  };
  return (
    <Paper p="xl" radius="md" shadow="xs" mt="xl">
      <Group position="apart">
        <Text size="sm" mb={'lg'}>
          {title}
        </Text>
      </Group>
      {!lodash.isEmpty(data) ? (
        <>
          <DataTable
            columns={column}
            data={data}
            noDataComponent="چیزی برای نمایش وجود ندارد"
            customStyles={customStyles ? customStyles : TableDesign}
            paginationComponentOptions={paginationComponentOptions}
            {...other}
          />
          {children}
        </>
      ) : (
        <Center>
          <Loader variant="dots" color="blue" />
        </Center>
      )}
    </Paper>
  );
};

export default ITable;
