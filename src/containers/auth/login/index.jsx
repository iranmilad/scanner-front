import React from 'react';
import {
  ActionIcon,
  Box,
  Group,
  Space,
  Title,
  Text,
  SimpleGrid,
} from '@mantine/core';
import colors from 'tailwindcss/colors';
import Logo from '../../../assets/images/logo-white.png';
import loginImage from '../../../assets/images/login.jpg';
import LoginForm from './loginForm';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    let storage = Cookies.get('token');
    if (!storage) {
      Cookies.remove('token', { path: '/' });
    } else {
      window.location.href = '/';
    }
  }

  render() {
    return (
      <>
        <Helmet>
          <title>ورود</title>
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
                  <Title order={3}>ورود</Title>
                  <Text
                    className="text-center"
                    size="sm"
                    mt={10}
                    color={colors.slate[400]}
                  >
                    به راحتی به حساب کاربری خود وارد شوید و از تمام مزایای
                    وبسایت استفاده کنید
                  </Text>
                  <LoginForm />
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
                src={loginImage}
              />
              <Box className="absolute top-0 left-0 w-full h-full z-30 bg-slate-800 bg-opacity-70" />
              <Box className="absolute top-0 lef-0 w-full h-full z-40 p-10">
                <Group position="apart">
                  <img
                    className="filter grayscale brightness-200"
                    width={200}
                    src={Logo}
                  />
                  <ActionIcon
                    onClick={() => this.props.history.goBack()}
                    variant="filled"
                    size="lg"
                    color="blue"
                  >
                    <svg
                      className="w-5 h-5 fill-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <defs>
                        <style>{`.fa-secondary{opacity:.4}`}</style>
                      </defs>
                      <path
                        className="fa-primary"
                        d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
                      />
                      <path
                        className="fa-secondary"
                        d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l-32-32l32-32H416C433.7 224 447.1 238.3 447.1 256z"
                      />
                    </svg>
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

export default withRouter(Login);
