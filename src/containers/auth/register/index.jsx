import React, { Component } from 'react';
import axios from 'axios';
import {
  ActionIcon,
  Box,
  Grid,
  Group,
  Space,
  Title,
  Text,
  Button,
  SimpleGrid,
} from '@mantine/core';
import colors from 'tailwindcss/colors';
import Logo from '../../../assets/images/logo.png';
import TextField from '../../../components/FormsUI/TextField';
import CheckboxField from '../../../components/FormsUI/Checkbox';
import { registerStepOne } from './schema';
import { TiChartLine } from 'react-icons/ti';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import { ImArrowLeft2 } from 'react-icons/im';
import actionBG from '../../../assets/images/action.png';
import {
  clearLocalStorage,
  getLocalStorage,
} from '../../../helper/localStorage';
import { History } from '../../../helper/history';
import { registerAPI } from '../../../apis/auth';
import { connect } from 'react-redux';
import VerifyForm from './verifyForm';

class Register extends React.PureComponent {
  constructor() {
    super();
    let storage = getLocalStorage('userToken');
    console.log(storage);
    if (!storage) {
      clearLocalStorage();
    } else {
      window.location.href = '/';
    }
  }
  state = {
    loading: false,
    verify: false,
    datas: {},
  };

  handleRegister({ values, actions }) {
    delete values.acceptTerms;
    this.setState({ loading: true });
    registerAPI({ url: '/user/register', data: values })
      .then((res) => {
        this.setState({
          loading: false,
          verify: res.data.data,
          datas: values,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
        });
        let errors = {};
        for (let item of Object.entries(err.response.data.errors)) {
          errors[item[0]] = item[1][0];
        }
        actions.setErrors(errors);
      });
  }

  render() {
    const INITIAL_FORM_STATE = {
      last_name: '',
      mobile: '',
      password: '',
      acceptTerms: false,
    };
    return (
      <Box className="overflow-hidden h-screen ">
        <SimpleGrid
          cols={2}
          spacing={0}
          breakpoints={[{ maxWidth: 'md', cols: 1 }]}
          sx={{ margin: 0 }}
        >
          <Box
            span={6}
            className="overflow-auto"
            sx={{ height: '100vh', paddingTop: '25px' }}
          >
            <Group position="center">
              <Box className="flex flex-col items-center px-4">
                <ActionIcon
                  color="indigo"
                  size="xl"
                  radius="xl"
                  variant="filled"
                  sx={(theme) => ({ marginTop: theme.spacing.xl })}
                >
                  <TiChartLine size={22} />
                </ActionIcon>
                <Space h="xl" />
                <Title order={3}>ثبت نام</Title>
                <Text
                  className="text-center"
                  size="sm"
                  mt={10}
                  color={colors.slate[400]}
                >
                  به راحتی یک حساب کاربری ایجاد کنید و از تمام مزایای وبسایت
                  استفاده کنید
                </Text>
                {this.state.verify ? (
                  <VerifyForm
                    verify={this.state.verify}
                    userData={this.state.datas}
                    mobile={this.state.datas.mobile}
                  />
                ) : (
                  <Formik
                    initialValues={INITIAL_FORM_STATE}
                    validationSchema={registerStepOne}
                    onSubmit={(values, actions) =>
                      this.handleRegister({ values, actions })
                    }
                  >
                    <Form className="w-[90%] mt-7">
                      <TextField
                        label={<Text size="sm">نام خانوادگی</Text>}
                        name="last_name"
                      />
                      <Space h="lg" />
                      <TextField
                        label={<Text size="sm">شماره تلفن همراه</Text>}
                        name="mobile"
                      />

                      <Space h="lg" />
                      <TextField
                        type="password"
                        dir="ltr"
                        label={<Text size="sm">رمز عبور</Text>}
                        name="password"
                      />
                      <Space h="lg" />
                      <CheckboxField
                        label="کلیه قوانین سایت را مطالعه کرده و میپذیرم"
                        color="indigo"
                        name="acceptTerms"
                      />
                      <Space h="lg" />
                      <Button
                        fullWidth
                        radius="md"
                        color="indigo"
                        type="submit"
                        loading={this.state.loading}
                      >
                        ثبت نام
                      </Button>
                      <Group position="center" className="flex items-end h-32">
                        <Text color={colors.slate[500]} size="sm">
                          حساب کاربری دارید ?{' '}
                          <Link to="/login">
                            <Text
                              className="inline-block mr-3"
                              color="indigo"
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
              </Box>
            </Group>
          </Box>
          <Box
            span={6}
            sx={(theme) => ({
              height: '100vh',
              padding: 0,
              position: 'relative',
            })}
          >
            <img
              className="w-full h-full object-cover z-20 opacity-70"
              src={actionBG}
            />
            <Box className="absolute top-0 left-0 w-full h-full z-30 bg-slate-800 bg-opacity-70" />
            <Box className="absolute top-0 lef-0 w-full h-full z-40 p-10">
              <Group position="apart">
                <img
                  className="filter grayscale brightness-200"
                  width={200}
                  src={Logo}
                />
                <Link to="/">
                  <ActionIcon variant="light" color="indigo" size="lg">
                    <ImArrowLeft2 size={20} />
                  </ActionIcon>
                </Link>
              </Group>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.main.loading,
});

export default connect(mapStateToProps)(Register);
