import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Group, Select, Grid, Text } from '@mantine/core';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import TextField from '../../../components/FormsUI/TextField';
import ITable from '../../../components/ITable';
import { ColorizeTag } from '../../../helper';
import { getEveryFeeder } from '../../../apis/main/main';
import { Paper } from '@mantine/core';
import { Center } from '@mantine/core';
import { Loader } from '@mantine/core';
import { withRouter } from 'react-router-dom';
import {setMarketId,setMainHeader} from "../../../redux/reducers/main";
import ls from "localstorage-slim"

class Index extends Component {
  state = {
    data: [],
    loading: false,
    filters: {
      period1: 5,
      period2: 20,
      period3: 60,
      period4: 10,
    },
    title: '',
    selectRight: 0,
    selectLeft: 3,
    selectRightLabel: 'قدرت خرید',
    selectLeftLabel: 'ورود پول',
    selectBoxesValues: [
      { value: "0", label: 'قدرت خرید' },
      { value: "1", label: 'سرانه خرید' },
      { value: "2", label: 'سرانه فروش' },
      { value: "3", label: 'ورود پول' },
      { value: "4", label: 'ارزش معاملات' },
    ],
    modalIsOpen: false,
    id: this.props.route.match.params.id,
  };

  modalWorker = () => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  };

  setRightSelect = (value) => {
    const thatItem = this.state.selectBoxesValues.find(
      (item) => item.value === value
    );
    this.setState({ selectRight: value, selectRightLabel: thatItem.label });
    this.getDataFromServer();
  };

  setLeftSelect = (value) => {
    const thatItem = this.state.selectBoxesValues.find(
      (item) => item.value === value
    );
    this.setState({ selectLeft: value, selectLeftLabel: thatItem.label });
    this.getDataFromServer();
  };

  submitForm = (values) => {
    this.setState({ filters: values ,modalIsOpen: false});
    this.getDataFromServer();
  };

  getInformation(id = this.state.id) {
    return new Promise((resolve, reject) => {
      let thatItem = this.props.table;
      thatItem = thatItem.find((item) => item.key === 'symbolInfo');
      getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then((res) => {
        this.setState({
          title: res.data.data.name,
        });
        resolve(id);
      }).catch(err => {
        reject(err)
      })
    })
  }

  getDataFromServer = (id = this.state.id) => {
    let thatItem = this.props.table;
    this.setState({ loading: true });
    getEveryFeeder(
      `${thatItem.feeder_url}/${id}/${this.state.selectRight}/${this.state.selectLeft}/${this.state.filters.period4}/${this.state.filters.period1}/${this.state.filters.period2}/${this.state.filters.period3}`
    )
      .then((res) => {
        this.setState({ data: res.data.data, loading: false });
      })
      .catch((err) => this.setState({ loading: false }));

    this.moneyFlowAnalyserInterval = setInterval(() => {
      getEveryFeeder(
        `${thatItem.feeder_url}/${id}/${this.state.selectRight}/${this.state.selectLeft}/${this.state.filters.period4}/${this.state.filters.period1}/${this.state.filters.period2}/${this.state.filters.period3}`
      )
        .then((res) => {
          this.setState({ data: res.data.data, loading: false });
        })
        .catch((err) => this.setState({ loading: false }));
    }
    , thatItem.refresh_time * 1000);
  };

  async componentDidMount() {
    this.props.setMarketId(this.state.id);
    this.props.setMainHeader(1);
    try {
      let id = await this.getInformation(this.state.id); 
      this.getDataFromServer(id);
    } catch (error) {
      console.log(error);
    }
      
    this.props.history.listen(async location => {
      let { pathname } = location;
      let URL_ID = pathname.split('/')[3];
      this.setState({ id: URL_ID });
      this.props.setMarketId(URL_ID);
      this.props.setMainHeader(1);
      try {
        let id = await this.getInformation(URL_ID); 
        this.getDataFromServer(id);
      } catch (error) {
        console.log(error);
      }
    })
    
  }
  componentWillUnmount(){
    clearInterval(this.moneyFlowAnalyserInterval);
    this.props.setMainHeader(0);
  }

  render() {
    return (
      <>
        <Helmet>
          <title>تحلیل جریانات نقدینگی {this.state.title}</title>
        </Helmet>
        <Group position="apart">
          <Text size="md">تحلیل جریانات نقدینگی {this.state.title}</Text>
          <Button onClick={() => this.setState({ modalIsOpen: true })}>
            فیلتر
          </Button>
        </Group>
        <Group my="md" position='apart'>
          <Select
            onChange={(e) => this.setRightSelect(e)}
            defaultValue="0"
            placeholder="انتخاب کنید"
            data={this.state.selectBoxesValues}
          />
          <Select
            onChange={(e) => this.setLeftSelect(e)}
            defaultValue="3"
            placeholder="انتخاب کنید"
            data={this.state.selectBoxesValues}
          />
        </Group>
        {this.state.loading ? (
          <Paper p="xl" radius="md" shadow="xs" mt="xl">
            <Center>
              <Loader variant='dots' />
            </Center>
          </Paper>
        ) : (
          <ITable
            pagination
            fixedHeader
            fixedHeaderScrollHeight="70vh"
            data={this.state.data}
            column={[
              {
                name: 'ردیف',
                selector: (row) => row.n0,
                sortable: true,
              },
              {
                name: 'تاریخ',
                selector: (row) => row.n1,
                sortable: true,
                cell: (row) => <span style={{width: "300px"}}>{row.n1}</span>
              },
              {
                name: 'حجم',
                selector: (row) => row.n2,
                sortable: true,
              },
              {
                name: 'ارزش معاملات',
                selector: (row) => row.n3,
                sortable: true,
              },
              {
                name: 'پایانی',
                selector: (row) => row.n4,
                sortable: true,
              },
              {
                name: 'درصد',
                selector: (row) => row.n5,
                sortable: true,
                cell: (row) => <ColorizeTag row={row.n5} />,
              },
              {
                name: 'آخرین',
                selector: (row) => row.n6,
                sortable: true,
              },
              {
                name: 'درصد',
                selector: (row) => row.n7,
                sortable: true,
                cell: (row) => <ColorizeTag row={row.n7} />,
              },
              {
                name: `${this.state.selectRightLabel} - میانگین ${this.state.filters.period1} روزه به میانگین ${this.state.filters.period2} روزه`,
                selector: (row) => row.n8,
                sortable: true,
              },
              {
                name: `${this.state.selectRightLabel} - میانگین ${this.state.filters.period1} روزه به میانگین ${this.state.filters.period3} روزه`,
                selector: (row) => row.n9,
                sortable: true,
              },
              {
                name: `${this.state.selectRightLabel} - میانگین ${this.state.filters.period2} روزه به میانگین ${this.state.filters.period3} روزه`,
                selector: (row) => row.n10,
                sortable: true,
              },
              {
                name: `${this.state.selectLeftLabel} - میانگین ${this.state.filters.period1} روزه به میانگین ${this.state.filters.period2} روزه`,
                selector: (row) => row.n11,
                sortable: true,
              },
              {
                name: `${this.state.selectLeftLabel} - میانگین ${this.state.filters.period1} روزه به میانگین ${this.state.filters.period3} روزه`,
                selector: (row) => row.n12,
                sortable: true,
              },
              {
                name: `${this.state.selectLeftLabel} - میانگین ${this.state.filters.period2} روزه به میانگین ${this.state.filters.period3} روزه`,
                selector: (row) => row.n13,
                sortable: true,
              },
              {
                name: 'حجم روز به میانگین میان مدت',
                selector: (row) => row.n14,
                sortable: true,
              },
              {
                name: 'بازدهی 5 روزه',
                selector: (row) => row.n15,
                sortable: true,
              },
              {
                name: 'بازدهی 10 روزه',
                selector: (row) => row.n16,
                sortable: true,
              },
              {
                name: 'بازدهی 20 روزه',
                selector: (row) => row.n17,
                sortable: true,
              },
            ]}
          />
        )}
        <Modal
          zIndex={9999999999}
          title="فیلتر"
          opened={this.state.modalIsOpen}
          onClose={() => this.modalWorker()}
          dir="rtl"
        >
          <Formik
          enableReinitialize
            validationSchema={schema}
            initialValues={{
              period1: this.state.filters.period1,
              period2: this.state.filters.period2,
              period3: this.state.filters.period3,
              period4: this.state.filters.period4,
            }}
            onSubmit={(values) => this.submitForm(values)}
          >
            <Form>
              <Grid>
                <Grid.Col sm={12} md={6}>
                  <TextField
                  label={<Text size='sm'>دوره مبنا</Text>}
                  placeholder="دوره مبنا" name="period4" />
                </Grid.Col>
                <Grid.Col sm={12} md={6}>
                  <TextField
                  label={<Text size='sm'>کوتاه مدت</Text>}
                  placeholder="کوتاه مدت" name="period1" />
                </Grid.Col>
                <Grid.Col sm={12} md={6}>
                  <TextField 
                  label={<Text size='sm'>میان مدت</Text>}
                  placeholder="میان مدت" name="period2" />
                </Grid.Col>
                <Grid.Col sm={12} md={6}>
                  <TextField
                  label={<Text size='sm'>بلند مدت</Text>}
                  placeholder="بلند مدت" name="period3" />
                </Grid.Col>
              </Grid>
              <Button mt="md" color="green" type='submit'>
                ذخیره
              </Button>
            </Form>
          </Formik>
        </Modal>
      </>
    );
  }
}

const schema = Yup.object().shape({
  period1: Yup.number()
    .required('دوره مبنا را وارد کنید')
    .typeError('فقط عدد قابل قبول است'),
  period2: Yup.number()
    .required('کوتاه مدت را وارد کنید')
    .typeError('فقط عدد قابل قبول است'),
  period3: Yup.number()
    .required('میان مدت را وارد کنید')
    .typeError('فقط عدد قابل قبول است'),
  period4: Yup.number()
    .required('بلند مدت را وارد کنید')
    .typeError('فقط عدد قابل قبول است'),
});

const mapStateToProps = (state) => ({
  table: state.config.needs.chartAndtables.find(
    (item) => item.key === 'symbolStockSignalWatch'
  ),
});

const mapDispatchToProps = (dispatch) => ({
  setMarketId: (marketId) => dispatch(setMarketId(marketId)),
  setMainHeader: (id) => dispatch(setMainHeader(id)),
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Index));
