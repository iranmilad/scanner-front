import { Group, Loader } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import Treemap from '../../treemap/index';

function Index() {
  let [chartData, setChartData] = useState([]);
  let [loading, setLoading] = useState(false);
  useEffect(()=>{
    let data = [
      {
        id: 'A',
        name: 'سبزیجات',
      },
      {
        id: 5122,
        name: 'کلم پیچ',
        parent: 'A',
        value: 6,
        level: 1,
        colorValue: 6,
        displayValue: '+۳٫۴۶ %',
        more: {
          realName: 'پیچ',
          endPrice: '123.456',
          lastDeal: '123.456',
          count: '12.345',
          volume: '123456758',
          value: '123.456',
          time: '12:34',
        },
        drillLvl: 1,
      },
      {
        id: 512,
        name: 'کلم سر',
        parent: 'A',
        value: 4,
        colorValue: 4,
        drillLvl: 1,
      },
      {
        id: 'B',
        name: 'میوه ها',
      },
      {
        id: 124,
        name: 'سیب',
        parent: 'B',
        value: 20,
        colorValue: 20,
        drillLvl: 1,
      },
    ];
    setChartData(data)
  },[]);
  return (
    <>
    {loading ? (
      <Group position='center'>
        <Loader color="indigo" size="xl" variant='dots' />
      </Group>
    ) : chartData.length > 0 && <Treemap treeData={chartData} setLoading={setLoading} />}

    </>
  );
}

export default Index;
