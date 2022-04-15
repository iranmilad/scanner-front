import { Center, Paper, Text, Select, Group } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { getIndustryData } from '../../apis/main/main';
import ITable from '../../components/ITable';
import {
  industries_table1,
  industries_table2,
  industries_table3,
} from '../../helper/statics';
import { firstChart } from '../../helper/fakeData';
import LoopChart from '../../components/LoopChart';
import { Helmet } from 'react-helmet';
import {randomNumber} from '../../helper'

function Index({ route }) {
  let { id } = route.match.params;
  let [loading, setLoading] = useState(true);
  let [industry, setIndustry] = useState(null);
  let [industrieLists, setIndustrieLists] = useState([]);
  useEffect(() => {
    // getIndustryData(`/industries/${id}`)
    //   .then((res) => {
    //     setLoading(false);
    //     setIndustry(res.data);
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //   });
    setLoading(false);
    setIndustrieLists([
      { value: 'react', label: 'React' },
      { value: 'ng', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'vue', label: 'Vue' },
    ]);
    let response = {
      groupName: 'استخراج کانه های فلزی',
      groupId: '1',
      general: [
        {
          n0: '183.4 M',
          n1: '173 B',
          n2: '0.25',
          n3: '0.25',
          n4: '0.25',
          n5: '0.25',
        },
      ],
      realLegal: [
        {
          n0: '6,042',
          n1: '640.5 B',
          n2: '42.21',
          n3: '19.6	',
          n4: '297.4 B',
          n5: '4,576',
          n6: 'حقیقی',
        },
        {
          n0: '6,042',
          n1: '640.5 B',
          n2: '42.21',
          n3: '19.6	',
          n4: '297.4 B',
          n5: '4,576',
          n6: 'حقوقی',
        },
      ],
      chart1: {
        special: 'IndustryChart1',
        series: [
          {
            name: 'تعداد نماد ها',
            data: [2, 49, 44, 118, 94, 88, 107, 53, 60, 9, 57, 3],
          },
        ],
      },
      chart2: {
        special: 'IndustryChart2',
        series: [
          {
            name: 'ارزش سفارشات',
            data: ['4', '27.2'],
          },
        ],
      },
      chart3: {
        special: 'IndustryChart3',
        series: [
          {
            name: 'مثبت',
            data: randomNumber(),
          },
          {
            name: 'منفی',
            data: randomNumber(),
          },
        ],
      },
      chart4: {
        special: 'IndustryChart4',
        series: [
          {
            name: 'ورود پول',
            data: randomNumber(),
          },
        ],
      },
      chart5: {
        special: 'IndustryChart5',
        series: [
          {
            name: 'فروش',
            data: randomNumber(),
          },
          {
            name: 'خرید',
            data: randomNumber(),
          },
        ],
      },
      allGroup: [
        {
          originalId: 212,
          originalName: 'بجهرم',
          n0: '15.7 M	',
          n1: '15.2 M	',
          n2: '0.2',
          n3: '0.2',
          n4: '0.2',
          n5: '0.2',
          n6: '0.2',
          n7: '0.2',
          n8: '0.2',
          n9: '0.2',
          n10: '0.2',
          n11: '0.2',
          n12: '0.2',
          n13: '0.2',
          n14: '0.2',
          n15: '0.2',
        },
      ],
    };
    industries_table1.data = response.general;
    industries_table2.data = response.realLegal;
    industries_table3.data = response.allGroup;

    setIndustry({
      groupName: response.groupName,
      groupId: response.groupId,
      general: industries_table1,
      realLegal: industries_table2,
      charts: [response.chart1, response.chart2, response.chart3, response.chart4, response.chart5],
      allGroup: industries_table3,
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>دیده بان گروه</title>
      </Helmet>
      {industry && loading === false ? (
        <>
          <Group position="apart">
            <Text size="sm" weight="bold">
              گروه {industry.groupName}
            </Text>
            <Select
              data={industrieLists}
              placeholder="انتخاب کنید"
              dropdownComponent="div"
            />
          </Group>
          <ITable data={industry.general} title="خلاصه معاملات" />
          <ITable data={industry.realLegal} title="جدول حقیقی حقوقی" />
          <LoopChart charts={industry.charts} />
          <ITable
            data={industry.allGroup}
            title={`دیده بان گروه ${industry?.groupName}`}
          />
        </>
      ) : (
        <Paper padding="xl" radius="md" shadow="xs" mt="xl">
          <Center>
            <Text size="sm">
              موردی یافت نشد ( از این لیست گروه صنایع مد نظر خود را انتخاب کنید)
            </Text>
          </Center>
          <Center mt="lg">
            <Select
              placeholder="انتخاب کنید"
              dropdownComponent="div"
              onChange={(e) => console.log(e)}
              data={[
                { value: 'react', label: 'React' },
                { value: 'ng', label: 'Angular' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'vue', label: 'Vue' },
              ]}
            />
          </Center>
        </Paper>
      )}
    </>
  );
}

export default Index;
