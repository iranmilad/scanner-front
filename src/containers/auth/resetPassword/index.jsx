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
import Logo from '../../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { TiChartLine } from 'react-icons/ti';
import { ImArrowLeft2 } from 'react-icons/im';
import loginImage from '../../../assets/images/login.jpg';
import {
  clearLocalStorage,
  getLocalStorage,
} from '../../../helper/localStorage';
import { History } from '../../../helper/history';
import ResetForm from './resetForm';

class ResetPassword extends React.PureComponent {
  componentDidMount() {
    let storage = getLocalStorage('userToken');
    if (!storage) {
      clearLocalStorage();
    } else {
      window.location.href = '/';
    }
  }

  render() {
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
            className="overflow-auto w-full"
            sx={{ height: '100vh', paddingTop: '25px' }}
          >
            <Group position="center" className="w-full">
              <Box className="flex flex-col items-center px-4 w-full">
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
                <Title order={3}>فراموشی رمز عبور</Title>
                <Text
                  className="text-center"
                  size="sm"
                  mt={10}
                  color={colors.slate[400]}
                >
                  به راحتی رمز عبور حساب کاربری خود تغییر دهید و از تمام مزایای
                  وبسایت استفاده کنید
                </Text>
                <ResetForm />
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

export default ResetPassword;