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
import Logo from '../../../assets/images/logo-white.png';
import TextField from '../../../components/FormsUI/TextField';
import CheckboxField from '../../../components/FormsUI/Checkbox';
import { registerStepOne } from './schema';
import { Formik, Form } from 'formik';
import { Link, withRouter } from 'react-router-dom';
import actionBG from '../../../assets/images/action.png';
import { registerAPI } from '../../../apis/auth';
import { connect } from 'react-redux';
import VerifyForm from './verifyForm';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie';

class Register extends React.PureComponent {
  constructor() {
    super();
    let storage = Cookies.get('token');
    if (!storage) {
      Cookies.remove('token', { path: '/' });
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
      <>
        <Helmet>
          <title>ثبت نام</title>
        </Helmet>
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
                    color="blue"
                    size="xl"
                    radius="xl"
                    variant="filled"
                    sx={(theme) => ({ marginTop: theme.spacing.xl })}
                  >
                    <svg className='w-5 h-5 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>{`.fa-secondary{opacity:.4}`}</style></defs><path class="fa-primary" d="M470.6 105.4C483.1 117.9 483.1 138.1 470.6 150.6L342.6 278.6C330.1 291.1 309.9 291.1 297.4 278.6L239.1 221.3L150.6 310.6C138.1 323.1 117.9 323.1 105.4 310.6C92.88 298.1 92.88 277.9 105.4 265.4L217.4 153.4C229.9 140.9 250.1 140.9 262.6 153.4L320 210.7L425.4 105.4C437.9 92.88 458.1 92.88 470.6 105.4z"/><path class="fa-secondary" d="M32 32C49.67 32 64 46.33 64 64V400C64 408.8 71.16 416 80 416H480C497.7 416 512 430.3 512 448C512 465.7 497.7 480 480 480H80C35.82 480 0 444.2 0 400V64C0 46.33 14.33 32 32 32z"/></svg>
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
                          variant="filled"
                        />
                        <Space h="lg" />
                        <TextField
                          label={<Text size="sm">شماره تلفن همراه</Text>}
                          name="mobile"
                          variant="filled"
                        />

                        <Space h="lg" />
                        <TextField
                          type="password"
                          dir="ltr"
                          label={<Text size="sm">رمز عبور</Text>}
                          name="password"
                          variant="filled"
                        />
                        <Space h="lg" />
                        <CheckboxField
                          label="کلیه قوانین سایت را مطالعه کرده و میپذیرم"
                          color="blue"
                          name="acceptTerms"
                        />
                        <Space h="lg" />
                        <Button
                          fullWidth
                          radius="md"
                          color="blue"
                          type="submit"
                          loading={this.state.loading}
                        >
                          ثبت نام
                        </Button>
                        <Group
                          position="center"
                          className="flex items-end h-32"
                        >
                          <Text color={colors.slate[500]} size="sm">
                            حساب کاربری دارید ?{' '}
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
                  <ActionIcon onClick={() => this.props.history.goBack()} variant="filled" color="blue" size="lg">
                  <svg className='w-5 h-5 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><defs><style>{`.fa-secondary{opacity:.4}`}</style></defs><path class="fa-primary" d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"/><path class="fa-secondary" d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l-32-32l32-32H416C433.7 224 447.1 238.3 447.1 256z"/></svg>
                  </ActionIcon>
                </Group>
              </Box>
            </Box>
          </SimpleGrid>
        </Box>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.main.loading,
});

export default withRouter(connect(mapStateToProps)(Register));
