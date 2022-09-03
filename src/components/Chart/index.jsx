import React, { useEffect, useState } from 'react';
import { Group, Paper, Text, Loader, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import Chart from 'react-apexcharts';
import ChartData from './chartData';
import lodash from 'lodash';
import { useCookies } from 'react-cookie';
import Logo from '../../assets/images/logo.png';

const Index = ({ data, options, special, type, title, ...other }) => {
  const [cookies, setCookie] = useCookies(['token']);

  return (
    <Paper shadow="xs" p="lg" radius="md">
      <Group position="apart">
        <Text order={4} mb="lg">
          {title}
        </Text>
      </Group>
      {lodash.isEmpty(data) ? (
        <>
          {cookies.token && data === false && <NeedSubscription />}
          {!cookies.token && data === false && <NeedAuth />}
          {cookies.token && data !== false && (
            <Group position="center">
              <Loader variant="dots" />
            </Group>
          )}
        </>
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

const NeedAuth = () => {
  <div className="relative p-28">
    <img
      src={Logo}
      className="w-96 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    />
    <div className="bg-slate-700 bg-opacity-80 px-5 space-y-3 rounded-lg absolute left-0 top-0 w-full h-full flex items-center justify-center flex-col">
      <i className="fa-solid fa-lock-keyhole text-3xl text-white md:text-lg lg:text-3xl "></i>
      <Text color="white" size="sm">
        برای استفاده از این قابلیت به حساب کاربری خود وارد شوید
      </Text>
      <Link to="/login">
        <Button color="blue" sx={{ fontWeight: 'normal' }}>
          ورود
        </Button>
      </Link>
    </div>
  </div>;
};

const NeedSubscription = () => {
  <div className="relative p-28">
    <img
      src={Logo}
      className="w-96 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    />
    <div className="bg-slate-700 bg-opacity-80 px-5 space-y-3 rounded-lg absolute left-0 top-0 w-full h-full flex items-center justify-center flex-col">
      <i className="fa-solid fa-lock-keyhole text-3xl text-white md:text-lg lg:text-3xl "></i>
      <Text color="white" size="sm">
        این چارت در سطح اشتراک شما قابل مشاهده نیست
      </Text>
      <Link to="/subscription">
        <Button color="blue" sx={{ fontWeight: 'normal' }}>
          خرید اشتراک
        </Button>
      </Link>
    </div>
  </div>;
};

export default Index;
