import React, { Component } from 'react';
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
import Logo from '../../assets/images/logo.png';
import TextField from '../../components/FormsUI/TextField';
import CheckboxField from '../../components/FormsUI/Checkbox';
import schema from './schema';
import { TiChartLine } from 'react-icons/ti';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import {ImArrowLeft2} from 'react-icons/im';
import actionBG from '../../assets/images/action.png';

class Register extends React.PureComponent {
  handleRegister(values){
    console.log(values);
  }
  render() {
    const INITIAL_FORM_STATE = {
      username: '',
      phone: '',
      password: '',
      acceptTerms: false,
    };
    return (
      <Box className="overflow-hidden h-screen ">
        <SimpleGrid cols={2} spacing={0}
        breakpoints={[
          {maxWidth: "lg" ,cols:1}
        ]}
        sx={{ margin: 0 }}>
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
                <Text className='text-center' size="sm" mt={10} color={colors.slate[400]}>
                  به راحتی یک حساب کاربری ایجاد کنید و از تمام مزایای وبسایت
                  استفاده کنید
                </Text>
                <Formik
                  initialValues={INITIAL_FORM_STATE}
                  validationSchema={schema}
                  onSubmit={value => this.handleRegister(value)}
                >
                  <Form className="w-[90%] mt-7">
                    <TextField
                      label={<Text size="sm">نام کاربری</Text>}
                      name="username"
                    />
                    <Space h="lg" />
                    <TextField
                      label={<Text size="sm">شماره تلفن همراه</Text>}
                      name="phone"
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
                      name="acceptTerms"  />
                    <Space h="lg" />
                    <Button fullWidth radius="md" color="indigo" type="submit">
                      ثبت نام
                    </Button>
                    <Group position="center" className="flex items-end h-32">
                      <Text color={colors.slate[500]} size="sm">
                        حساب کاربری دارید ?{' '}
                        <Link to="#">
                          <Text
                            className="inline-block mr-3"
                            color="indigo"
                            weight="bold"
                          >
                            ورود
                          </Text>
                        </Link>
                      </Text>
                    </Group>
                  </Form>
                </Formik>
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
            <img className="w-full h-full z-20 opacity-70" src={actionBG} />
            <Box className="absolute top-0 left-0 w-full h-full z-30 bg-slate-800 bg-opacity-70" />
            <Box className="absolute top-0 lef-0 w-full h-full z-40 p-10">
              <Group position="apart">
                <img
                  className="filter grayscale brightness-200"
                  width={200}
                  src={Logo}
                />
                <Link to="/"><ActionIcon variant='light' color="indigo" size="lg"><ImArrowLeft2 size={20} /></ActionIcon></Link>
              </Group>
            </Box>
          </Box>
        </SimpleGrid >
      </Box>
    );
  }
}

export default Register;
