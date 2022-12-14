import { Button, Center, Group, Loader, Box, Text, Paper } from '@mantine/core';
import React from 'react';
import { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/header.svg';
import { ShowErrors } from '../../helper';
import ChartData from './chartData';
import {setChart,setModal} from "../../redux/reducers/chartable/chart"
import { connect } from 'react-redux';

const Index = ({
  data,
  options,
  special,
  type,
  title,
  isLoading,
  isFetching,
  error,
  allow,
  className,
  setModal,
  setChart,
  ...other
}) => {
  function Worker() {
    if (isLoading === null || isLoading === undefined) return <></>;
    if (isLoading && isFetching)
      return (
        <Center sx={{height:"100%"}}>
          <Loader variant="dots" />
        </Center>
      );
    if (isLoading && isFetching === false) {
      if (allow === 'login') return <NeedAuth />;
      else return <NeedSubscription />;
    }
    if (error)
      return (
        <Center sx={{height:"100%"}}>
          <ShowErrors status={error} />
        </Center>
      );
    return (
      <Chart
        height={"95%"}
        width="100%"
        options={options ? {...options.options} : ChartData[special].options }
        series={data}
        type={type ? type : ChartData[special].type}
        {...other}
      />
    );
  }

  useEffect(() => {
    window['chartable'] = {
      setModal: setModal,
      setChart: setChart,
    };
  },[])

  return (
    <div className={`h-full ${className}`}>
      <Paper
        shadow="xs"
        p="lg"
        radius="md"
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Group position="apart">
          <Text order={4} mb="lg">
            {title}
          </Text>
        </Group>
        <Worker />
      </Paper>
    </div>
  );
};

const NeedAuth = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center flex-col">
      <img
        src={Logo}
        className="w-80 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        alt="logo"
      />
      <div className="bg-slate-700 bg-opacity-80 z-20 rounded-lg absolute left-0 top-0 w-full h-full" />
      <div className="space-y-3 flex flex-col z-20 text-center">
        <Text color="white" size="sm" className="z-20">
        برای مشاهده جدول به حساب کاربری خود وارد شوید
        </Text>
        <Link to="/login" className="z-20">
          <Button color="blue" sx={{ fontWeight: 'normal' }}>
            خرید
          </Button>
        </Link>
      </div>
    </div>
  );
};

const NeedSubscription = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center flex-col">
      <img
        src={Logo}
        className="w-80 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        alt="logo"
      />
      <div className="bg-slate-700 bg-opacity-80 z-20 rounded-lg absolute left-0 top-0 w-full h-full" />
      <div className="space-y-3 flex flex-col z-20 text-center">
        <Text color="white" size="sm" className="z-20">
          برای مشاهده این جدول باید اشتراک مناسب را تهیه کنید
        </Text>
        <Link to="/subscription" className="z-20">
          <Button color="blue" sx={{ fontWeight: 'normal' }}>
            خرید
          </Button>
        </Link>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setModal: (data) => dispatch(setModal(data)),
  setChart: (data) => dispatch(setChart(data)),
});

export { ChartData };
export default connect(null,mapDispatchToProps)(Index);
