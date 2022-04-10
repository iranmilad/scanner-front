import React, { useEffect, useState } from 'react';
import { Group, Paper, Text, Title, Loader } from '@mantine/core';
import { Helmet } from 'react-helmet';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsTreeChart from 'highcharts/modules/treemap';
import HighchartsHeatmap from 'highcharts/modules/heatmap';
import colors from 'tailwindcss/colors';
import treeConfig from './config';

HighchartsHeatmap(Highcharts);
HighchartsTreeChart(Highcharts);

const Treemap = () => {
  let [chartData, setChartData] = useState([]);
  let [loading, setLoading] = useState(false);

  useEffect(()=>{
    let data = [
      {
        id: 'A',
        name: 'سبزیجات',
        farhad: 'ali',
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
    setChartData(data);
    
  },[])

  return (
    <>
      <Helmet>
        <title>نقشه بازار</title>
      </Helmet>
      <Title order={3} mb="lg">
        نقشه بازار
      </Title>
      <Paper shadow="xs" p="lg" sx={{ overflow: 'hidden' }}>
        <div className="my-4 mx-4">
          {loading === false ? (
            <React.Fragment>
              {chartData.length > 0 && <Heatmap treeData={chartData} setLoading={setLoading} />}
              <Group position="apart" mt="lg">
                <Text size="xs">آخرین معامله : DATE</Text>
                <div className="inline-flex items-center">
                  <span className="text-xs ml-3 ">بازدهی - </span>
                  <div className="flex items-center bg-gradient-to-r from-[#D62D4D] to-[#02AD65]">
                    <span
                      title="بیش از +4"
                      className="h-8 w-9 text-xs flex items-center justify-center text-white cursor-default select-none bg-transparent tracking-widest"
                      dir="ltr"
                    >
                      +4
                    </span>
                    <span
                      title="از +2 تا +4"
                      className="h-8 w-9 text-xs flex items-center justify-center text-white cursor-default select-none bg-transparent tracking-widest"
                      dir="ltr"
                    >
                      +2
                    </span>
                    <span
                      title="از +1 تا +2"
                      className="h-8 w-9 text-xs flex items-center justify-center text-white cursor-default select-none bg-transparent tracking-widest"
                      dir="ltr"
                    >
                      +1
                    </span>
                    <span
                      title="1(-/+)"
                      className="h-8 w-9 text-xs flex items-center justify-center text-white cursor-default select-none bg-transparent tracking-widest"
                      dir="ltr"
                    ></span>
                    <span
                      title="از -1 تا -2"
                      className="h-8 w-9 text-xs flex items-center justify-center text-white cursor-default select-none bg-transparent] tracking-widest"
                      dir="ltr"
                    >
                      -1
                    </span>
                    <span
                      title="از -2 تا -4"
                      className="h-8 w-9 text-xs flex items-center justify-center text-white cursor-default select-none bg-transparent tracking-widest"
                      dir="ltr"
                    >
                      -2
                    </span>
                    <span
                      title="بیش از -4"
                      className="h-8 w-9 text-xs flex items-center justify-center text-white cursor-default select-none bg-transparent tracking-widest"
                      dir="ltr"
                    >
                      -4
                    </span>
                  </div>
                  <span className="text-xs mr-3">بازدهی + </span>
                </div>
              </Group>
            </React.Fragment>
          ) : (
            <Group position="center">
              <Loader color="indigo" size="xl" variant="dots" />
            </Group>
          )}
        </div>
      </Paper>
    </>
  );
};

/**
 * Heatmap just renders a heatmap chart
 * @param {Object} heatParam 
 * @param {ArrayBuffer} heatParam.treeData - list of data to be used in heatmap
 * @param {Function} heatParam.setLoading - an hook to set loading state
 */
export const Heatmap = ({treeData,setLoading}) => {
  const [data, setData] = useState(treeConfig);

  /**
   * get data from Heatmap params
   * mix data and config
   */
  useEffect(async() => {
    setLoading(true);
    let primeConfig = Object.assign({}, data);
    primeConfig.series[0].data = treeData;
    primeConfig.colorAxis = Object.assign(
      {},
      primeConfig.colorAxis,
      setValueRange(treeData)
    );
    setData(primeConfig)
    setLoading(false);
  }, []);

  /**
   * Set maximum and minimum color value for treemap chart
   * @param {object} data
   * @returns {Object} min and max value of data
   */
  function setValueRange(data) {
    let numberOfData = 0;
    let maxValue = 0;
    let minValue = 0;
    data.map((item) => {
      if ('value' in item) numberOfData++;
    });

    // find maximum value
    for (let i = 0; i < data.length; i++) {
      if ('value' in data[i]) {
        if (data[i].value > maxValue) maxValue = data[i].value;
      }
    }

    // find minimum value
    let firstNumber = false;
    for (let j = 0; j < data.length; j++) {
      if ('value' in data[j]) {
        if (firstNumber === false) {
          firstNumber = true;
          minValue = data[j].value;
        } else {
          if (data[j].value < minValue) minValue = data[j].value;
        }
      }
    }

    return {
      min: minValue,
      max: maxValue,
    };
  }

  return (
    <HighchartsReact highcharts={Highcharts} options={data} />
  )
};

export default Treemap;
