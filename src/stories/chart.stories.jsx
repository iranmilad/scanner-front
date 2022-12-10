import { Paper, Text } from '@mantine/core';
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import { useEffect } from 'react';

const MyChart = ({options,series,type,width}) => {
  return (
    <Paper shadow="sm" p="md" sx={{ height: '500px' }}>
      <Text>Header</Text>
      <Chart height={"95%"} options={options} series={series} type={type} width={width}  />
    </Paper>
  );
};

export default {
  title: 'Chart',
  component: MyChart,
};

const Template = (args) => <MyChart {...args} />;

export const Line = Template.bind({});
Line.args = {
  options:  {
    chart: {
      type: 'line',
      parentHeightOffset: 0,
    },
    stroke: {
      curve: 'smooth',
      lineCap: 'round',
    },
    markers: {
      size: 5,
    },
    grid: {
      padding: {
        left: 0,
        right: 5,
      },
      xaxis: {
        lines: {
          show: true,
          
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      column: {
        colors: "#ff0000",
        opacity: 0.5
    },  
    },
    legend: {
      show: false,
    },
    colors: ['#10b981', '#ef4444'],

    xaxis: {

      type: 'datetime',
      labels: {
        datetimeUTC: false,
        format: 'HH:mm',
      }
    },
    tooltip: {
      x: {
        format: "HH:mm"
      }
    },
    yaxis: {
      labels: {
        offsetX: {
          left: 20,
        },
      },
    },
  },
  series: [
    {
      name: 'sales',
      data: [
        [1670563800000, 10],
        [1670564700000, 20],
        [1670565600000, 15],
        [1670566500000, 30],
        [1670567400000, 29],
        [1670568300000, 40],
        [1670569200000, 50],
        [1670570100000, 71],
        [1670571000000, 105],
      ],
    },
    {
      name: 'buys',
      data: [
        [1670563800000, 30],
        [1670564700000, 40],
        [1670565600000, 35],
        [1670566500000, 50],
        [1670567400000, 49],
        [1670568300000, 60],
        [1670569200000, 70],
        [1670570100000, 91],
        [1670571000000, 125],
      ],
    },
  ],
  type: 'line',
};


export const Bar = Template.bind({});
Bar.args = {
  options:  {
    plotOptions: {
      horizontal: false,
      bar: {
        distributed: true,
        borderRadius: 4,
      },
    },
    chart: {
      type: 'bar',
      parentHeightOffset: 0,
    },
    stroke: {
      curve: 'smooth',
      lineCap: 'round',
    },
    markers: {
      size: 5,
    },
    grid: {
      padding: {
        left: 0,
        right: 5,
      },
    },
    legend: {
      show: false,
    },
    colors: ['#ef4444','#ef4444','#ef4444','#ef4444','#10b981','#10b981','#10b981','#10b981','#10b981'],

    xaxis: {
      categories: [
        // put with unix timestamp and increase every 15 minutes
        "+5", "5 > 4", "4 > 3", "3 > 2",
        "0", "2 < 3", "3 < 3", "4 < 5",
        "5-",
      ],
      type: 'category',
      labels: {
        datetimeUTC: false,
        format: 'HH:mm',
        style:{
          fontWeights: 700,
        },
      }
    },
    tooltip: {
      x: {
        format: "HH:mm"
      }
    },
    yaxis: {
      labels: {
        offsetX: {
          left: 20,
        },
      },
    },
  },
  series: [
    {
      name: 'sales',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ],

  type: 'bar',
};
