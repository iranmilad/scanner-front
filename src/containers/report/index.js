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
        let response = await getEveryFeeder('/totalStockSearch');
        this.props.setReportList(response.data.data);
      } catch (error) {}
    }
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
                        <Text size='sm'>{company.label}</Text>
                      </div>
                      <div className='flex space-x-1'>
                        <Text size='sm' weight="bold">نام واقعی : </Text>
                        <Text size='sm'>{company.name}</Text>
                      </div>
                      <div className='flex space-x-1'>
                        <Text size='sm' weight="bold">ارزش : </Text>
                        <Text size='sm' dir='ltr'>{company.value}</Text>
                      </div>
                      <Link to={`/reports/chart/${company.id}`}>
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
});

const mapDispatchToProps = (dispatch) => ({
  setReportList: (reportList) => dispatch(setReportList(reportList)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Report);