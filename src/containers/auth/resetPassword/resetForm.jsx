import React from 'react';
import { Formik, Form } from 'formik';
import { Space, Button, Group, Text, Alert, Anchor } from '@mantine/core';
import { Link, withRouter } from 'react-router-dom';
import { History } from '../../../helper/history';
import { rememberPasswordAPI } from '../../../apis/auth';
import { verifyMobileShema } from './schema';
import TextField from '../../../components/FormsUI/TextField';
import colors from 'tailwindcss/colors';
import {
  setLocalStorage,
  setLocalStorageWithExpiry,
} from '../../../helper/localStorage';

class ResetForm extends React.PureComponent {
  state = {
    loading: false,
    sucess: false,
    mobile: null,
    error: false,
    time: 0,
  };

  handleNewPassword(values) {
    this.setState({ loading: true });
    rememberPasswordAPI({ url: '/auth/resend-password', data: values })
      .then((result) => {
        this.setState({
          loading: false,
          success: true,
          mobile: values.mobile,
          time: 5,
        });
        this.countDownTimer();
        setTimeout(() => {
          this.props.history.push('/login');
        }, 5000);
      })
      .catch((error) => {
        this.setState({
          loading: false,
          success: false,
          error: true,
          mobile: values.mobile,
        });
      });
  }

  countDownTimer() {
    let timer = setInterval(() => {
      this.setState((state) => ({
        ...state,
        time: state.time - 1,
      }));
      if (this.state.time < 0) {
        clearInterval(timer);
      }
    }, 1000);
  }


  render() {
    const INITIAL_FORM_STATE = {
      mobile: '',
    };
    return (
      <>
        {this.state.success ? (
          <>
            <Space h="lg" />
            <Alert
              title={`رمز عبور جدید به شماره همراه ${this.state.mobile} ارسال شده است`}
              color="green"
            >
            <Group position="apart">
              <Text size="sm">به طور خودکار هدایت میشوید</Text>
              <Text size="sm">{this.state.time > 0 ? this.state.time : ''}</Text>
            </Group>
            <Group position='apart' mt="md">
              <Text size='sm'>اگر به طور خودکار هدایت نشدید روی این <Text onClick={() => this.props.history.push('/login')} className='inline-block cursor-pointer' weight="bold" color="blue" size='sm'>لینک</Text> کلیک کنید</Text>
            </Group>
            </Alert>
            <Space h="lg" />
          </>
        ) : (
          <>
            {this.state.error && (
              <>
                <Space h="lg" />
                <Alert title="مشکلی پیش آمده است" color="red">
                  لطفا مجددا تلاش کنید
                </Alert>
              </>
            )}
            <Formik
              initialValues={INITIAL_FORM_STATE}
              validationSchema={verifyMobileShema}
              onSubmit={(values) => this.handleNewPassword(values)}
            >
              <Form className="w-[80%] sm:w-[60%] lg:w-[40%] mt-7">
                <TextField
                  label={<Text size="sm">شماره تلفن همراه</Text>}
                  name="mobile"
                  variant="filled"
                />
                <Space h="lg" />
                {this.state.getCode && (
                  <TextField
                    label={<Text size="sm">رمز عبور</Text>}
                    type="password"
                    dir="ltr"
                    name="mobile"
                    variant="filled"
                  />
                )}
                <Space h="lg" />
                <Button
                  fullWidth
                  radius="md"
                  color="blue"
                  type="submit"
                  loading={this.state.loading}
                >
                  ارسال
                </Button>
                <Group position="center" className="flex items-end mt-10">
                  <Text color={colors.slate[500]} size="sm">
                    رمز عبور خود را تغییر داده اید ؟{' '}
                    <Link to="/login">
                      <Text
                        className="inline-block mr-3"
                        color="blue"
                        weight="bold"
                        sx={{ cursor: 'pointer' }}
                      >
                        ورود
                      </Text>
                    </Link>
                  </Text>
                </Group>
                <Group position="center" className="flex mt-5">
                  رفتن به
                  <Link to="/">
                    <Text
                      className="inline-block mr-3"
                      color="blue"
                      weight="bold"
                      sx={{ cursor: 'pointer' }}
                    >
                      خانه
                    </Text>
                  </Link>
                </Group>
              </Form>
            </Formik>
          </>
        )}
      </>
    );
  }
}

export default withRouter(ResetForm);
