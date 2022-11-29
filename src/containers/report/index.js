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
import { getEveryFeeder } from '../../apis/main';
import { matchSorter } from 'match-sorter';
import { Link } from 'react-router-dom';
import lodash from 'lodash'
import { connect } from 'react-redux';
import {setReportList} from '../../redux/reducers/config'

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
  }

  searhCompany = (value) => {
    this.setState({ error: false, connectionError: false });
    if (value.length === 0) return this.setState({ companies_show: [] });
    if(value.length > 2){
      this.setState({ loading: true, error: false, connectionError: false });
      // getEveryFeeder(`/totalStockSearch/${value}`)
      // .then((res) => {
      //   if(lodash.isEmpty(res.data.data)) return this.setState({loading: false, error: true, connectionError: false});
      //   this.setState({ loading: false, companies: res.data.data });
      //   if (res.data.data.length <= 15 && res.data.data.length > 0) {
      //     this.setState({ companies_show: res.data.data });
      //   } else {
      //     this.setState({ companies_show: res.data.data.slice(0, 15) });
      //   }
      // })
      // .catch((err) => {
      //   this.setState({ loading: false, error: true, connectionError: true });
      // });
      let reportList = this.props.reportList;
      let companies = matchSorter(reportList, value, { keys: ['label'] });
      if(lodash.isEmpty(companies)) return this.setState({loading: false, error: true, connectionError: false});
      this.setState({ loading: false, companies });
      if (companies.length <= 15 && companies.length > 0) {
        this.setState({ companies_show: companies });
      } else {
        this.setState({ companies_show: companies.slice(0, 15) });
      }
    }
  };

  async setStocks(){
    if (this.props.reportList.length === 0) {
      try {
        let thatItem = this.props.chartAndtables;
        thatItem = thatItem.find(item => item.key === "stockSearch")
        let response = await getEveryFeeder(thatItem.feeder_url);
        this.props.setReportList(response.data.data);
      } catch (error) {}
    }
  };

  componentDidMount(){
    this.setStocks();
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
            onInput={(e) => this.searhCompany(e.target.value.trim())}
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
                  <svg className='w-3 h-3 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M496 48V192c0 17.69-14.31 32-32 32H320c-17.69 0-32-14.31-32-32s14.31-32 32-32h63.39c-29.97-39.7-77.25-63.78-127.6-63.78C167.7 96.22 96 167.9 96 256s71.69 159.8 159.8 159.8c34.88 0 68.03-11.03 95.88-31.94c14.22-10.53 34.22-7.75 44.81 6.375c10.59 14.16 7.75 34.22-6.375 44.81c-39.03 29.28-85.36 44.86-134.2 44.86C132.5 479.9 32 379.4 32 256s100.5-223.9 223.9-223.9c69.15 0 134 32.47 176.1 86.12V48c0-17.69 14.31-32 32-32S496 30.31 496 48z"/></svg>
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
                        <Text size='sm'>{company.label}</Text>
                      </div>
                      <div className='flex space-x-1'>
                        <Text size='sm' weight="bold">نام واقعی : </Text>
                        <Text size='sm'>{company.name}</Text>
                      </div>
                      <Link to={`/stock/monthly-chart/${company.id}`}>
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

const mapStateToProps = (state) => ({
  reportList: state.config.reportList,
  chartAndtables: state.config.needs.chartAndtables
});

const mapDispatchToProps = (dispatch) => ({
  setReportList: (reportList) => dispatch(setReportList(reportList)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Report);
