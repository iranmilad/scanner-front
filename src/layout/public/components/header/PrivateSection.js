import React, { Component } from 'react';
import { getLocalStorage } from '../../../../helper/localStorage';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import { History } from '../../../../helper/history';
import { FiLogOut, FiUser, FiKey } from 'react-icons/fi';
import { Menu, Divider, Avatar } from '@mantine/core';
import { clearLocalStorage } from '../../../../helper/localStorage';
import Cookies from 'js-cookie';
import ProfilePic from '../../../../assets/images/pp.jpg';

class PrivateSection extends React.PureComponent {
  handleLogout = () => {
    Cookies.remove('token',{path:'/'});
    window.location.href = "/";
  };
  render() {
    if (localStorage.getItem('token')) {
      return (
        <div className="flex flex-row ">
          <Menu
          zIndex={999999}
            dir="rtl"
            control={
              <Avatar src={ProfilePic} radius="md" />
            }
          >
            <Menu.Item icon={<FiUser size={15} />}>
             <Link to='/dashboard'>تنظیمات حساب کاربری</Link>
            </Menu.Item>
            <Menu.Item icon={<FiKey size={15} />}>
              <Link to='/subscription'>اشتراک ویژه</Link>
            </Menu.Item>
            <Divider />
            <Menu.Item
              color="red"
              icon={<FiLogOut size={15} />}
              onClick={() => this.handleLogout()}
            >
              خروج
            </Menu.Item>
          </Menu>
        </div>
      );
    }
    return (
      <React.Fragment>
        <Link
         to='/login'
         >
          <Button
            sx={{ fontWeight: 'normal' }}
            color="blue"
          >
            ورود
          </Button>
        </Link>
      </React.Fragment>
    );
  }
}

export default PrivateSection;
