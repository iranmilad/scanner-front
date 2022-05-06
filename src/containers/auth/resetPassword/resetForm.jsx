import React from 'react';
import { Formik, Form } from 'formik';
import { Space, Button, Group, Text, Alert, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';
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
  };

  handleNewPassword(values) {
    this.setState((state) => ({
      ...state,
      loading: true,
    }));
    rememberPasswordAPI({ url: '/auth/resend-password', data: values })
      .then((result) => {
        this.setState({
          loading: false,
          success: true,
          mobile: values.mobile,
        });
        setTimeout(() => {
          History.push('/login');
        }, 4000);
      })
      .catch((error) => {
        this.setState({
          loading: false,
          success: false,
          mobile: values.mobile,
        });
      });
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
              به طور خودکار به صفحه ورود هدایت میشوید
            </Alert>
            <Space h="lg" />
          </>
        ) : (
          <Formik
            initialValues={INITIAL_FORM_STATE}
            validationSchema={verifyMobileShema}
            onSubmit={(values) => this.handleNewPassword(values)}
          >
            <Form className="w-[80%] sm:w-[50%] lg:w-[55%] mt-7">
              <TextField
                label={<Text size="sm">شماره تلفن همراه</Text>}
                name="mobile"
              />
              <Space h="lg" />
              {this.state.getCode && (
                <TextField
                  label={<Text size="sm">رمز عبور</Text>}
                  type="password"
                  dir="ltr"
                  name="password"
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
              <Group position="center" className="flex items-end h-32">
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
            </Form>
          </Formik>
        )}
      </>
    );
  }
}

export default ResetForm;
