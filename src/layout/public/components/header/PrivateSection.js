import React, { Component } from 'react';
import { getLocalStorage } from '../../../../helper/localStorage';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import { History } from '../../../../helper/history';
import { FiLogOut, FiUser, FiKey } from 'react-icons/fi';
import { Menu, Divider, Avatar } from '@mantine/core';
import { clearLocalStorage } from '../../../../helper/localStorage';

class PrivateSection extends React.PureComponent {
  handleLogout = () => {
    clearLocalStorage();
    window.location.href = "/";
  };
  render() {
    if (getLocalStorage('userToken')) {
      return (
        <div className="flex flex-row ">
          <button className="hidden sm:flex py-2 px-3 bg-slate-700 text-slate-300 transition-all hover:bg-slate-600 rounded-md ml-3 items-center justify-center">
            <i className="fa-duotone fa-expand"></i>
          </button>
          <button className="hidden sm:flex py-2 px-3 bg-slate-700 text-slate-300 transition-all hover:bg-slate-600 rounded-md ml-3 lg:ml-8 items-center justify-center">
            <i className="fa-duotone fa-bell"></i>
          </button>
          <Menu
          zIndex={999999}
            dir="rtl"
            control={
              <Avatar src="https://randomuser.me/api/portraits/men/9.jpg" />
            }
          >
            <Menu.Item icon={<FiUser size={15} />}>
              تنظیمات حساب کاربری
            </Menu.Item>
            <Menu.Item icon={<FiKey size={15} />}>اشتراک ویژه</Menu.Item>
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
