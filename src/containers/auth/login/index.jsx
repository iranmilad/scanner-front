import React from 'react';
import {
  ActionIcon,
  Box,
  Group,
  Space,
  Title,
  Text,
  SimpleGrid,
  Center,
} from '@mantine/core';
import colors from 'tailwindcss/colors';
import Logo from '../../../assets/images/header.svg';
import loginImage from '../../../assets/images/login.webp';
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
              className="relative"
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
                alt="logo"
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

export default withRouter(Login);
