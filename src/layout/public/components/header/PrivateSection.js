import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Divider, Avatar, Button, Indicator } from '@mantine/core';
import ProfilePic from '../../../../assets/images/pp.jpg';
import axios from 'axios';
import { withCookies } from 'react-cookie';
import { getEveryUser } from '../../../../apis/main';

class PrivateSection extends React.PureComponent {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      token: cookies.get('token') || '',
      notificationsCount: '',
    };
  }
  handleLogout() {
    const { cookies } = this.props;
    axios
      .get('https://user.tseshow.com/api/auth/logout', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.get('token')}`,
        },
      })
      .then((res) => {
        cookies.remove('token');
        window.location.href = '/';
      });
  }

  getNotifications() {
    const {
      cookies: {
        cookies: { token },
      },
    } = this.props;
    if (token) {
      setInterval(() => {
        getEveryUser('/notifications', { token: true })
          .then((res) => {
            let count = 0;
            res.data.data.map((item) => (item.seen_at === null ? count++ : null));
            this.setState({ notificationsCount: count === 0 ? '' : count });
          })
          .catch((err) => {
            console.log(err);
            this.setState({ notificationsCount: '' });
          });
      }, 60000);
    }
  }

  componentDidMount() {
    getEveryUser('/notifications', { token: true })
    .then((res) => {
      let count = 0;
      res.data.data.map((item) => (item.seen_at === null ? count++ : null));
      this.setState({ notificationsCount: count === 0 ? '' : count });
    })
    this.getNotifications();
  }

  render() {
    if (this.state.token !== '') {
      return (
        <div className="flex flex-row ">
          <Menu
            zIndex={999999}
            dir="rtl"
            control={
              <Indicator
                size={16}
                label={this.state.notificationsCount}
                inline
                color={this.state.notificationsCount === '' ? 'green' : 'red'}
                position="bottom-start"
                offset={5}
                withBorder
                sx={(theme) => ({
                  '.mantine-Indicator-indicator': {
                    paddingTop: '2px',
                    borderRadius: 9999,
                  },
                })}
              >
                <Avatar radius="xl" src={ProfilePic} />
              </Indicator>
            }
          >
            <Menu.Item
              icon={
                <svg
                  className="w-4 h-4 fill-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 288c79.53 0 144-64.47 144-144s-64.47-144-144-144c-79.52 0-144 64.47-144 144S176.5 288 256 288zM256 48c52.94 0 96 43.06 96 96c0 52.93-43.06 96-96 96c-52.93 0-96-43.07-96-96C160 91.06 203.1 48 256 48zM351.1 320H160c-88.36 0-160 71.63-160 160c0 17.67 14.33 32 31.1 32H480c17.67 0 31.1-14.33 31.1-32C512 391.6 440.4 320 351.1 320zM49.14 464c7.787-54.21 54.54-96 110.9-96h191.1c56.33 0 103.1 41.79 110.9 96H49.14z" />
                </svg>
              }
            >
              <Link to="/dashboard">تنظیمات حساب کاربری</Link>
            </Menu.Item>
            <Menu.Item
              icon={
                <svg
                  className="w-4 h-4 fill-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M220.6 261.4L121.9 360L168.1 407C178.3 416.4 178.3 431.6 168.1 440.1C159.6 450.3 144.4 450.3 135 440.1L88 393.9L57.94 424L104.1 471C114.3 480.4 114.3 495.6 104.1 504.1C95.6 514.3 80.4 514.3 71.03 504.1L7.029 440.1C-2.343 431.6-2.343 416.4 7.029 407L186.6 227.4C169.9 203.9 160 175.1 160 144C160 64.47 224.5 0 304 0C383.5 0 448 64.47 448 144C448 223.5 383.5 288 304 288C272.9 288 244.1 278.1 220.6 261.4zM304 240C357 240 400 197 400 144C400 90.98 357 48 304 48C250.1 48 208 90.98 208 144C208 197 250.1 240 304 240z" />
                </svg>
              }
            >
              <Link to="/subscription">اشتراک ویژه</Link>
            </Menu.Item>
            <Divider />
            <Menu.Item
              color="red"
              icon={
                <svg
                  className="w-4 h-4 fill-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M192 456C192 469.3 181.3 480 168 480H96c-53.02 0-96-42.98-96-96V128c0-53.02 42.98-96 96-96h72C181.3 32 192 42.74 192 56C192 69.25 181.3 80 168 80H96C69.6 80 48 101.6 48 128v256c0 26.4 21.6 48 48 48h72C181.3 432 192 442.7 192 456zM505.5 239.6l-127.1-136c-9.094-9.688-24.28-10.12-33.91-1.031c-9.656 9.062-10.12 24.25-1.031 33.91L432.4 232H183.1C170.7 232 160 242.8 160 256s10.75 24 23.1 24h248.4l-89.92 95.56c-9.094 9.656-8.625 24.84 1.031 33.91C348.2 413.8 354.1 416 359.1 416c6.375 0 12.75-2.531 17.47-7.562l127.1-136C514.2 263.2 514.2 248.8 505.5 239.6z" />
                </svg>
              }
              onClick={() => this.handleLogout()}
            >
              خروج
            </Menu.Item>
          </Menu>
        </div>
      );
    }
    return (
      <>
        <Link to="/login">
          <Button sx={{ fontWeight: 'normal' }} color="blue">
            ورود
          </Button>
        </Link>
      </>
    );
  }
}

export default withCookies(PrivateSection);
