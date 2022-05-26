import {
  ActionIcon,
  Alert,
  Button,
  Card,
  Center,
  Grid,
  Input,
  Loader,
  Text,
  Stack,
} from '@mantine/core';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { BsArrowClockwise } from 'react-icons/bs';
import { getEveryFeeder } from '../../apis/main/main';
import { matchSorter } from 'match-sorter';
import { Link } from 'react-router-dom';

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      connectionError: false,
      companies: [],
      companies_show: [],
      showMore: null,
    };
    this.companies = [
      {
        id: 'A01',
        shortName: 'شرکت تولید کننده سیم',
        realName: 'شرکت تولید کننده سیم کارت',
        value: '2124.123B',
      },
    ];
  }

  searhCompany = (value) => {
    if (value.length === 0) return this.setState({ companies_show: [] });
    if (value.length < 3) return;
    this.setState({ loading: true, error: false, connectionError: false });

    getEveryFeeder(`/reports/${value}`)
      .then((res) => {
        this.setState({ loading: false, companies: res.data.data });
        if (res.data.data.length <= 15 && res.data.data.length > 0) {
          this.setState({ companies_show: res.data.data });
        } else {
          this.setState({ companies_show: res.data.data.slice(0, 15) });
        }
      })
      .catch((err) => {
        this.setState({ loading: false, error: true, connectionError: true });
      });
  };

  showMore(){
    let slice = this.state.companies_show.length - 1;
    if(this.state.companies.length - slice > 3){
      let cut_15_more_companies = this.state.companies.slice(0, slice + 15);
      this.setState({ companies_show: cut_15_more_companies });
    }
    else{
      this.setState({companies_show: this.state.companies});
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>جستجوی نمودار های تولید و فروش</title>
        </Helmet>
        <Center>
          <Text>شرکت مورد نظر خود را جستجو و عملکرد آن را مشاهده کنید</Text>
        </Center>
        <Center mt="lg">
          <Input
            onInput={(e) => this.searhCompany(e.target.value)}
            sx={{ width: '300px' }}
            placeholder="شرکت مورد نظر خود را جستجو کنید"
          />
        </Center>
        {this.state.loading ? (
          <Center mt="xl">
            <Loader variant="dots" size="md" />
          </Center>
        ) : this.state.error ? (
          this.state.connectionError ? (
            <Center>
              <Alert title="خطا در برقراری ارتباط با سرور" color="orange">
                <Text>لطفا دوباره تلاش نمایید</Text>
                <ActionIcon size="lg" variant="filled" color="blue">
                  <BsArrowClockwise />
                </ActionIcon>
              </Alert>
            </Center>
          ) : (
            <Center mt="xl">
              <Alert border title="شرکتی با این عنوان یافت نشد" variant='filled' color="red"></Alert>
            </Center>
          )
        ) : (
          <>
            <Grid mt="lg">
              {this.state.companies_show.map((company, id) => (
                <Grid.Col key={id} sm={12} md={6} lg={4}>
                  <Card shadow="sm">
                    <Stack>
                      <div className='flex space-x-1'>
                        <Text size='sm' weight="bold">نماد : </Text>
                        <Text size='sm'>{company.shortName}</Text>
                      </div>
                      <div className='flex space-x-1'>
                        <Text size='sm' weight="bold">نام واقعی : </Text>
                        <Text size='sm'>{company.realName}</Text>
                      </div>
                      <div className='flex space-x-1'>
                        <Text size='sm' weight="bold">ارزش : </Text>
                        <Text size='sm' dir='ltr'>{company.value}</Text>
                      </div>
                      <Link to={`/reports/chart/${id}`}>
                        <Button fullWidth>مشاهده نمودار</Button>
                      </Link>
                    </Stack>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
            {this.state.companies_show.length > 15 && (
              <Center>
                <Button color="blue" size="sm">
                  بیشتر
                </Button>
              </Center>
            )}
          </>
        )}
      </div>
    );
  }
}

export default Report;
