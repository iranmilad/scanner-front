import React, { useEffect, useState } from 'react';
import { Group, Paper, Text, Loader } from '@mantine/core';
import Chart from 'react-apexcharts';
import ChartData from './chartData';
import _ from 'lodash';

const Index = ({ data,title, ...other }) => {
  return (
    <>
      <Paper
        shadow="xs"
        padding="lg"
        radius="md"
      >
        <Group position="apart">
          <Text order={4} mb="lg">
            {title}
          </Text>
        </Group>
        {_.isEmpty(data) ? (
          <Group position="center">
            <Loader variant="dots" />
          </Group>
        ) : (
          <Chart
            width="100%"
            height={350}
            options={ChartData[data.special].options}
            series={data.series}
            type={ChartData[data.special].type}
            {...other}
          />
        )}
      </Paper>
    </>
  );
};

export default Index;
