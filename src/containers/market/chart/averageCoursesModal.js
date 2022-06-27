import { Component } from 'react';
import { Formik, Form } from 'formik';
import TextField from '../../../components/FormsUI/TextField';
import { Modal, Grid, InputWrapper, Group, Button } from '@mantine/core';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { setMarket } from '../../../redux/reducers/market';
import lodash from 'lodash';

class AverageCoursesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      averageSettings: {
        shortterm: '10',
        midterm: '20',
        longterm: '50',
        shortmovingterm: '10',
        midmovingterm: '20',
        longmovingterm: '50',
      },
    };
  }

  getAverageSettings(id = this.props.group) {
    let market = this.props.averageSettings;
    let find = market.find((item) => item.id === id);
    if (!find)
      return this.setState({
        averageSettings: {
          shortterm: 10,
          midterm: 20,
          longterm: 50,
          shortmovingterm: 10,
          midmovingterm: 20,
          longmovingterm: 50,
        },
      });
    this.setState({
      averageSettings: find.averageSettings,
    });
  }

  handleAverageSettings(values) {
    if(lodash.isEqual(this.state.averageSettings, values)) return;
    this.props.setAverageSettings({id:this.props.group, averageSettings:values});
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps === this.props){
      return false
    }
    else {
      this.getAverageSettings();
      return true
    }
  }


  render() {
    // this.getAverageSettings();
    return (
      <Modal
        dir="rtl"
        title="تنظیم دوره های میانگین"
        zIndex={9999999999}
        opened={this.props.modal}
        onClose={() => this.props.onClose()}
      >
        <Formik
          enableReinitialize
          initialValues={{
            shortterm: this.state.averageSettings.shortterm,
            midterm: this.state.averageSettings.midterm,
            longterm: this.state.averageSettings.longterm,
            shortmovingterm: this.state.averageSettings.shortmovingterm,
            midmovingterm: this.state.averageSettings.midmovingterm,
            longmovingterm: this.state.averageSettings.longmovingterm,
          }}
          validationSchema={FormSchema}
          onSubmit={(values) => this.handleAverageSettings(values)}
        >
          <Form>
            <Grid>
              <Grid.Col md={6} sm={12}>
                <InputWrapper label="دوره میانگین کوتاه مدت">
                  <TextField placeholder="1 تا 50" name="shortterm" />
                </InputWrapper>
              </Grid.Col>
              <Grid.Col md={6} sm={12}>
                <InputWrapper label="دوره میانگین میان مدت">
                  <TextField placeholder="1 تا 100" name="midterm" />
                </InputWrapper>
              </Grid.Col>
              <Grid.Col md={6} sm={12}>
                <InputWrapper label="دوره میانگین بلند مدت">
                  <TextField placeholder="1 تا 200" name="longterm" />
                </InputWrapper>
              </Grid.Col>
              <Grid.Col md={6} sm={12}>
                <InputWrapper label="دوره میانگین متحرک کوتاه مدت">
                  <TextField placeholder="1 تا 200" name="shortmovingterm" />
                </InputWrapper>
              </Grid.Col>
              <Grid.Col md={6} sm={12}>
                <InputWrapper label="دوره میانگین متحرک میان مدت">
                  <TextField placeholder="1 تا 200" name="midmovingterm" />
                </InputWrapper>
              </Grid.Col>
              <Grid.Col md={6} sm={12}>
                <InputWrapper label="دوره میانگین متحرک بلند مدت">
                  <TextField placeholder="1 تا 200" name="longmovingterm" />
                </InputWrapper>
              </Grid.Col>
            </Grid>
            <Group position="apart" mt="lg">
              <Button color="green" size="sm" type="submit">
                ثبت
              </Button>
              <Button
                color="red"
                size="sm"
                onClick={() =>
                  this.setState({
                    averageSettings: {
                      shortterm: 10,
                      midterm: 20,
                      longterm: 50,
                      shortmovingterm: 10,
                      midmovingterm: 20,
                      longmovingterm: 50,
                    },
                  })
                }
              >
                تنظیمات پیش فرض
              </Button>
            </Group>
          </Form>
        </Formik>
      </Modal>
    );
  }
}

const FormSchema = Yup.object().shape({
  shortterm: Yup.number()
    .min(1, 'دوره میانگین کوتاه مدت باید بیشتر از 1 باشد')
    .max(50, 'دوره میانگین کوتاه مدت باید کمتر از 50 باشد')
    .typeError('دوره میانگین کوتاه مدت باید عدد باشد')
    .required('دوره میانگین کوتاه مدت را وارد کنید'),
  midterm: Yup.number()
    .min(1, 'دوره میانگین میان مدت باید بیشتر از 1 باشد')
    .max(100, 'دوره میانگین میان مدت باید کمتر از 100 باشد')
    .typeError('دوره میانگین میان مدت باید عدد باشد')
    .required('دوره میانگین میان مدت را وارد کنید'),
  longterm: Yup.number()
    .min(1, 'دوره میانگین بلند مدت باید بیشتر از 1 باشد')
    .max(200, 'دوره میانگین بلند مدت باید کمتر از 200 باشد')
    .typeError('دوره میانگین بلند مدت باید عدد باشد')
    .required('دوره میانگین بلند مدت را وارد کنید'),
  shortmovingterm: Yup.number()
    .min(1, 'دوره میانگین متحرک کوتاه مدت باید بیشتر از 1 باشد')
    .max(200, 'دوره میانگین متحرک کوتاه مدت باید کمتر از 200 باشد')
    .typeError('دوره میانگین متحرک کوتاه مدت باید عدد باشد')
    .required('دوره میانگین متحرک کوتاه مدت را وارد کنید'),
  midmovingterm: Yup.number()
    .min(1, 'دوره میانگین متحرک میان مدت باید بیشتر از 1 باشد')
    .max(200, 'دوره میانگین متحرک میان مدت باید کمتر از 200 باشد')
    .typeError('دوره میانگین متحرک میان مدت باید عدد باشد')
    .required('دوره میانگین متحرک میان مدت را وارد کنید'),
  longmovingterm: Yup.number()
    .min(1, 'دوره میانگین متحرک بلند مدت باید بیشتر از 1 باشد')
    .max(200, 'دوره میانگین متحرک بلند مدت باید کمتر از 200 باشد')
    .typeError('دوره میانگین متحرک بلند مدت باید عدد باشد')
    .required('دوره میانگین متحرک بلند مدت را وارد کنید'),
});

const mapStateToProps = (state) => ({
  averageSettings: state.market,
});

const mapDispatchToProps = (dispatch) => ({
  setAverageSettings: (averageSettings) => dispatch(setMarket(averageSettings)),
})

export default connect(mapStateToProps,mapDispatchToProps)(AverageCoursesModal);
