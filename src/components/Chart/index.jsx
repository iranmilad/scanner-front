import React, { useEffect, useState } from 'react';
import { Group, Paper, Text, Loader } from '@mantine/core';
import Chart from 'react-apexcharts';
import ChartData from './chartData';
import lodash from 'lodash';

const Index = ({ data,options,special,type,title, ...other }) => {

  return (
      <Paper
        shadow="xs"
        p="lg"
        radius="md"
      >
        <Group position="apart">
          <Text order={4} mb="lg">
            {title}
          </Text>
        </Group>
        {lodash.isEmpty(data) ? (
          <Group position="center">
            <Loader variant="dots" />
          </Group>
        ) : (
              <Chart
              height={350}
              options={special ? ChartData[special].options : options.options}
              series={data.length > 0 ? data : []}
              type={type ? type : ChartData[special].type}
              {...other}
              />
        )}
      </Paper>
  );
};

export default Index;
