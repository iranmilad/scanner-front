import React from 'react';
import { Formik, Form } from 'formik';
import { Space, Button, Group, Text, Alert } from '@mantine/core';
import { History } from '../../../helper/history';
import { loginAPI } from '../../../apis/auth';
import { loginSchema } from './schema';
import TextField from '../../../components/FormsUI/TextField';
import colors from 'tailwindcss/colors';
import {setLocalStorageWithExpiry} from '../../../helper/localStorage'

class LoginForm extends React.PureComponent {
  state = {
    loading: false,
    loginSuccess:false,
    loginFaild: false,
  };
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
          loginSuccess: res.data.message
        }));
        setLocalStorageWithExpiry("userToken",res.data.data.access_token,( 15 * 24 * 60 * 60 ) * 1000);
        setTimeout(()=>{
          History.push('/home');
        },1000)
      })
      .catch((err) => {
        this.setState((prev) => ({
          ...prev,
          loading: false,
          loginFaild: err.response.data.message,
        }));
      });
  }
  render() {
    const INITIAL_FORM_STATE = {
      mobile: '',
      password: '',
    };
    return (
      <Formik
        initialValues={INITIAL_FORM_STATE}
        validationSchema={loginSchema}
        onSubmit={(values, actions) => this.handleLogin({ values, actions })}
      >
        <Form className="w-[90%] mt-7">
          {this.state.loginSuccess && (
            <>
              <Alert title={this.state.loginSuccess} color="green" />
              <Space h="lg" />
            </>
          )}
          {this.state.loginFaild && (
            <>
              <Alert title={this.state.loginFaild} color="red" />
              <Space h="lg" />
            </>
          )}
          <TextField
            label={<Text size="sm">شماره تلفن همراه</Text>}
            name="mobile"
          />
          <Space h="lg" />
          <TextField label={<Text size="sm">رمز عبور</Text>} type="password" dir="ltr" name="password" />
          <Space h="lg" />
          <Text color="indigo" size='sm'>فراموشی رمز عبور</Text>
          <Space h="lg" />
          <Button
            fullWidth
            radius="md"
            color="indigo"
            type="submit"
            loading={this.state.loading}
          >
            ورود
          </Button>
          <Group position="center" className="flex items-end h-32">
            <Text color={colors.slate[500]} size="sm">
              نیاز به حساب کاربری دارید ؟{' '}
              <Text
                className="inline-block mr-3"
                color="indigo"
                weight="bold"
                sx={{ cursor: 'pointer' }}
                onClick={() => History.push('/register')}
              >
                ثبت نام
              </Text>
            </Text>
          </Group>
        </Form>
      </Formik>
    );
  }
}

export default LoginForm;
