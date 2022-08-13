import React from 'react';
import { Formik, Form } from 'formik';
import { Space, Button, Group, Text, Alert, Anchor } from '@mantine/core';
import { History } from '../../../helper/history';
import { loginAPI } from '../../../apis/auth';
import { loginSchema } from './schema';
import TextField from '../../../components/FormsUI/TextField';
import colors from 'tailwindcss/colors';
import { Link, withRouter } from 'react-router-dom';
import {
  setLocalStorage,
  setLocalStorageWithExpiry,
} from '../../../helper/localStorage';
import Cookies from 'js-cookie';

class LoginForm extends React.PureComponent {
  state = {
    loading: false,
    loginSuccess: false,
    loginFaild: false,
    time: false,
  };

  convertSecondsToDay(seconds) {
    var days = Math.floor(seconds / (3600 * 24));
  }

  /**
   * Handle login request
   */
  handleLogin({ values, actions }) {
    this.setState({
      loading:true,
      loginFaild:false,
    });
    loginAPI({ url: '/auth/login', data: values })
      .then((res) => {
        this.setState({
          loading: false,
          loginSuccess: res.data.message,
          time: 4,
        });
        this.countDownTimer();
        // set local storage token
        localStorage.setItem('token', res.data.data.access_token);
        Cookies.set('token', res.data.data.access_token, {
          expires: Math.floor(res.data.data.expires_in / (3600 * 24)),
          path: '/',
          secure: true,
        });

        // redirect to home page
        setTimeout(() => {
          this.props.history.goBack();
        }, 4000);
      })
      .catch((err) => {
        this.setState({
          loading: false,
          loginFaild: err.response.data.message,
        });
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
              <Text size="sm">به طور خودکار هدایت میشوید</Text>
              <Text size="sm">{this.state.time}</Text>
            </Group>
          </Alert>
          <Space h="lg" />
        </>
      );
    } else {
      return (
        <>
          {this.state.loginFaild && (
            <div className="my-2">
              <Alert title={this.state.loginFaild} color="red" />
              <Space h="lg" />
            </div>
          )}
          <Formik
            initialValues={INITIAL_FORM_STATE}
            validationSchema={loginSchema}
            onSubmit={(values, actions) =>
              this.handleLogin({ values, actions })
            }
          >
            <Form className="w-[90%] mt-5" onChange={(e) => this.setState({loginFaild:false})}>
              <TextField
                label={<Text size="sm">شماره تلفن همراه</Text>}
                name="mobile"
                inputMode="numeric"
                variant="filled"
              />
              <Space h="lg" />
              <TextField
                label={<Text size="sm">رمز عبور</Text>}
                type="password"
                dir="ltr"
                name="password"
                inputMode="text"
                variant="filled"
              />
              <Space h="lg" />
              <Link to="/resetpassword">
                <Text
                  className="inline-block"
                  size="sm"
                  color="blue"
                  weight="normal"
                  sx={{ cursor: 'pointer' }}
                >
                  فراموشی رمز عبور
                </Text>
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
              </Group>
            </Form>
          </Formik>
        </>
      );
    }
  }
}

export default withRouter(LoginForm);
