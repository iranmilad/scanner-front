import React, { Component } from 'react';
import axios from 'axios';
import {
  ActionIcon,
  Box,
  Grid,
  Group,
  Space,
  Title,
  Center,
  Text,
  Button,
  SimpleGrid,
} from '@mantine/core';
import colors from 'tailwindcss/colors';
import Logo from '../../../assets/images/header.svg';
import TextField from '../../../components/FormsUI/TextField';
import CheckboxField from '../../../components/FormsUI/Checkbox';
import { registerStepOne } from './schema';
import { Formik, Form } from 'formik';
import { Link, withRouter } from 'react-router-dom';
import actionBG from '../../../assets/images/login.webp';
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
          message: res.data.message
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
        let errors = {}
        const { response, data, config } = err;
        for (let item of Object.entries(response.data.errors)) {
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
                  <Link to="/">
                    <ActionIcon
                      color="blue"
                      size="xl"
                      radius="xl"
                      variant="filled"
                      sx={(theme) => ({ marginTop: theme.spacing.xl })}
                    >
                      <svg
                        className="w-5 h-5 fill-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <defs>
                          <style>{`.fa-secondary{opacity:.4}`}</style>
                        </defs>
                        <path
                          className="fa-primary"
                          d="M416 101.5V64C416 46.33 430.3 32 448 32H480C497.7 32 512 46.33 512 64V185.5L565.1 231.9C578.4 243.6 579.7 263.8 568.1 277.1C556.4 290.4 536.2 291.7 522.9 280.1L288 74.52L53.07 280.1C39.77 291.7 19.56 290.4 7.917 277.1C-3.72 263.8-2.372 243.6 10.93 231.9L266.9 7.918C278.1-2.639 297-2.639 309.1 7.918L416 101.5z"
                        />
                        <path
                          className="fa-secondary"
                          d="M288 74.52L512.1 270.6L512.5 471.9C512.6 494 494.7 512 472.5 512H392C369.9 512 352 494.1 352 472V383.7C352 366 337.7 351.7 320 351.7H256C238.3 351.7 224 366 224 383.7V472C224 494.1 206.1 512 184 512H104.1C81.99 512 64.09 494.1 64.08 472L64.02 270.5L288 74.52z"
                        />
                      </svg>
                    </ActionIcon>
                  </Link>
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
                      message={this.state.message}
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
                          className="flex items-end mt-10"
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
                  )}
                </Box>
              </Group>
            </Box>
            <Box
            className='relative'
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
                alt="bg"
              />
              <Box className="absolute top-0 left-0 w-full h-full z-30 bg-slate-800 bg-opacity-70">
                <Center style={{width: "100%",height: "100%"}}>
                  <img className="h-1/5" src={Logo} alt="logo" />
                </Center>
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
