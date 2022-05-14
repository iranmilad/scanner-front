import React from 'react';
import { Formik, Form } from 'formik';
import { Space, Button, Group, Text, Alert, Anchor } from '@mantine/core';
import { History } from '../../../helper/history';
import { loginAPI } from '../../../apis/auth';
import { loginSchema } from './schema';
import TextField from '../../../components/FormsUI/TextField';
import colors from 'tailwindcss/colors';
import { Link } from 'react-router-dom';
import {
  setLocalStorage,
  setLocalStorageWithExpiry,
} from '../../../helper/localStorage';

class LoginForm extends React.PureComponent {
  state = {
    loading: false,
    loginSuccess: false,
    loginFaild: false,
    time: false,
  };

  /**
   * Handle login request
   */
  handleLogin({ values, actions }) {
    this.setState((prev) => ({
      ...prev,
      loading: true,
    }));
    loginAPI({ url: '/auth/login', data: values })
      .then((res) => {
        this.setState((prev) => ({
          ...prev,
          loading: false,
          loginSuccess: res.data.message,
          time: 4,
        }));
        this.countDownTimer();
        // set local storage token
        setLocalStorage('userToken', res.data.data.access_token);

        // redirect to home page
        setTimeout(() => {
          window.location.href = '/';
        }, 4000);
      })
      .catch((err) => {
        this.setState((prev) => ({
          ...prev,
          loading: false,
          loginFaild: err.response.data.message,
        }));
      });
  }

  /**
   * Count down timer uses to show login success message
   * and after that redirect to home page
   */
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
      password: '',
    };

    if (this.state.loginSuccess) {
      return (
        <>
          <Alert mt="lg" title={this.state.loginSuccess} color="green">
            <Group position="apart">
              <Text size="sm">به طور خودکار به صفحه اصلی هدایت میشوید</Text>
              <Text size="sm">{this.state.time}</Text>
            </Group>
          </Alert>
          <Space h="lg" />
        </>
      );
    } else if (this.state.loginFaild) {
      return (
        <>
          <Alert title={this.state.loginFaild} color="red" />
          <Space h="lg" />
        </>
      );
    } else {
      return (
        <Formik
          initialValues={INITIAL_FORM_STATE}
          validationSchema={loginSchema}
          onSubmit={(values, actions) => this.handleLogin({ values, actions })}
        >
          <Form className="w-[90%] mt-7">
            <TextField
              label={<Text size="sm">شماره تلفن همراه</Text>}
              name="mobile"
            />
            <Space h="lg" />
            <TextField
              label={<Text size="sm">رمز عبور</Text>}
              type="password"
              dir="ltr"
              name="password"
            />
            <Space h="lg" />
            <Link to="/resetpassword">
              <Anchor
                className="inline-block"
                size="sm"
                color="blue"
                weight="normal"
                sx={{ cursor: 'pointer' }}
              >
                فراموشی رمز عبور
              </Anchor>
            </Link>
            <Space h="lg" />
            <Button
              fullWidth
              radius="md"
              color="blue"
              type="submit"
              loading={this.state.loading}
            >
              ورود
            </Button>
            <Group position="center" className="flex items-end h-32">
              <Text color={colors.slate[500]} size="sm">
                نیاز به حساب کاربری دارید ؟{' '}
                <Link to="/register">
                  <Text
                    className="inline-block mr-3"
                    color="blue"
                    weight="bold"
                    sx={{ cursor: 'pointer' }}
                  >
                    ثبت نام
                  </Text>
                </Link>
              </Text>
            </Group>
          </Form>
        </Formik>
      );
    }
  }
}

export default LoginForm;
