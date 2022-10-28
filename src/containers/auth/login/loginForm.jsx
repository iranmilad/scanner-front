import React from 'react';
import { Formik, Form } from 'formik';
import { Space, Button, Group, Text, Alert, Anchor } from '@mantine/core';
import { loginAPI } from '../../../apis/auth';
import { loginSchema } from './schema';
import TextField from '../../../components/FormsUI/TextField';
import { Link, withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import { getEveryUser } from '../../../apis/main';
import { setConfig } from '../../../redux/reducers/config';
import { connect } from 'react-redux';

class LoginForm extends React.PureComponent {
  state = {
    loading: false,
    loginSuccess: false,
    loginFaild: false,
    time: false,
  };

  convertSecondsToDay(seconds) {
    var days = Math.floor(seconds / (3600 * 24));
  }

  redirect(action){
    if (action === 'PUSH') {
      this.props.history.goBack();
    } else {
      this.props.history.go('/');
    }
  }

  /**
   * Handle login request
   */
  handleLogin({ values, actions }) {
    this.setState({
      loading: true,
      loginFaild: false,
    });
    loginAPI({ url: '/auth/login', data: values })
      .then((res) => {
        this.setState({
          loading: false,
          loginSuccess: res.data.message,
          time: 3,
        });
        this.countDownTimer();
        const { cookies } = this.props;
        cookies.set('token', res.data.data.access_token, {
          path: '/',
          maxAge: res.data.data.expires_in,
        });

        getEveryUser('/home/data', { token: res.data.data.access_token })
          .then((res) => {
            this.props.setConfig(res.data);
          })
          .catch((err) => {
            console.log(err);
          });

        // redirect to home page
        setTimeout(() => {
          const {
            history: { action },
          } = this.props;
          this.redirect(action)
        }, 3000);
      })
      .catch((err) => {
        this.setState({
          loading: false,
          loginFaild: err.response.data.message,
        });
      });
  }

  /**
   * Count down timer uses to show login success message
   * and after that redirect to home page
   */
  countDownTimer() {
    let timer = setInterval(() => {
      this.setState((state) => ({
        ...state,
        time: state.time - 1,
      }));
      if (this.state.time <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  }

  componentDidMount() {
    const cookies = new Cookies();
    cookies.remove('token', { path: '/' });
  }

  render() {
    const INITIAL_FORM_STATE = {
      mobile: '',
      password: '',
    };

    if (this.state.loginSuccess) {
      return (
        <>
          <Alert mt="lg" title={this.state.loginSuccess} color="green">
            <Group position="apart">
              <Text size="sm">به طور خودکار هدایت میشوید</Text>
              <Text size="sm">{this.state.time > 0 ? this.state.time : ''}</Text>
            </Group>
            <Group position='apart' mt="md">
              <Text size='sm'>اگر به طور خودکار هدایت نشدید روی این <Text onClick={() => this.redirect(this.props.history.action)} className='inline-block cursor-pointer' weight="bold" color="blue" size='sm'>لینک</Text> کلیک کنید</Text>
            </Group>
          </Alert>
          <Space h="lg" />
        </>
      );
    } else {
      return (
        <>
          {this.state.loginFaild && (
            <div className="my-2">
              <Alert title={this.state.loginFaild} color="red" />
              <Space h="lg" />
            </div>
          )}
          <Formik
            initialValues={INITIAL_FORM_STATE}
            validationSchema={loginSchema}
            onSubmit={(values, actions) =>
              this.handleLogin({ values, actions })
            }
          >
            <Form
              className="w-[90%] mt-5"
              onChange={(e) => this.setState({ loginFaild: false })}
            >
              <TextField
                label={<Text size="sm">شماره تلفن همراه</Text>}
                name="mobile"
                inputMode="numeric"
                variant="filled"
              />
              <Space h="lg" />
              <TextField
                label={<Text size="sm">رمز عبور</Text>}
                type="password"
                dir="ltr"
                name="password"
                inputMode="text"
                variant="filled"
              />
              <Space h="lg" />
              <Link to="/resetpassword">
                <Text
                  className="inline-block"
                  size="sm"
                  color="blue"
                  weight="normal"
                  sx={{ cursor: 'pointer' }}
                >
                  فراموشی رمز عبور
                </Text>
              </Link>
              <Space h="lg" />
              <Button
                fullWidth
                radius="md"
                color="blue"
                type="submit"
                loading={this.state.loading}
              >
                ورود
              </Button>
              <Group position="center" className="flex items-end mt-10">
                نیاز به حساب کاربری دارید ؟{' '}
                <Link to="/register">
                  <Text
                    className="inline-block mr-3"
                    color="blue"
                    weight="bold"
                    sx={{ cursor: 'pointer' }}
                  >
                    ثبت نام
                  </Text>
                </Link>
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
        </>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  setConfig: (data) => dispatch(setConfig(data)),
});

export default withRouter(
  withCookies(connect(null, mapDispatchToProps)(LoginForm))
);
