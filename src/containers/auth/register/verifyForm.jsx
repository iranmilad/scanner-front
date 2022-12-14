import { Alert, Group, Text, Button, Space } from '@mantine/core';
import { Formik, Form } from 'formik';
import React from 'react';
import TextField from '../../../components/FormsUI/TextField';
import { registerAPI } from '../../../apis/auth';
import { verirySchema } from './schema';
import { History } from '../../../helper/history';
import { withRouter } from 'react-router-dom';

class VerifyForm extends React.PureComponent {
  state = {
    loading: false,
    success: false,
    error: false,
    // timer for count down
    userData: this.props.userData,
    successCode: false,
    time: 60,
    title: this.props.title,
  };
  handleVerify({ values, actions }) {
    /**
     * Handle verify code in fron end
     */
    if (values.verifyCode == this.state.successCode) {
      this.setState((prev) => ({
        ...prev,
        loading: true,
      }));
      registerAPI({ url: '/user/confirm-register', data: this.props.verify })
        .then((res) => {
          this.setState({
            loading: false,
            success: true,
            time: 3,
          });
          setTimeout(() => {
            this.props.history.push('/login');
          }, 3000);
        })
        .catch((err) => {
          this.setState((prev) => ({
            ...prev,
            error: true,
            loading: false,
          }));
        });
    } else {
      actions.setErrors({ verifyCode: 'کد تایید صحیح نمی باشد' });
    }
  }

  componentDidMount() {
    this.setState((state) => ({
      ...state,
      successCode: this.props.verify.code,
    }));
    this.countDownTimer();
  }

  countDownTimer() {
    let timer = setInterval(() => {
      this.setState((state) => ({
        ...state,
        time: state.time - 1,
      }));
      if (this.state.time < 0) {
        clearInterval(timer);
      }
    }, 1000);
  }

  sendAgainCode() {
    this.setState({
      successCode: false,
    });
    registerAPI({ url: '/user/register', data: this.props.userData })
      .then((result) => {
        this.setState({
          successCode: result.data.data.code,
          time: 60,
          title: result.data.message,
        });
        this.countDownTimer();
      })
      .catch((error) => {
        this.setState({
          error: true,
        });
      });
  }

  render() {
    const INITIAL_VALUES = {
      verifyCode: '',
    };
    return (
      <>
        {this.state.success ? (
          <>
            <Space h="lg" />
            <Alert mt="lg" title={this.state.loginSuccess} color="green">
            <Group position="apart">
              <Text size="sm">به طور خودکار هدایت میشوید</Text>
              <Text size="sm">{this.state.time > 0 ? this.state.time : ''}</Text>
            </Group>
            <Group position='apart' mt="md">
              <Text size='sm'>اگر به طور خودکار هدایت نشدید روی این <Text onClick={() => this.props.history.push('/login')} className='inline-block cursor-pointer' weight="bold" color="blue" size='sm'>لینک</Text> کلیک کنید</Text>
            </Group>
          </Alert>
          </>
        ) : (
          <>
            {this.state.error && (
              <>
                <Space h="lg" />
                <Alert title="مشکلی پیش آمده است" color="red">
                  لطفا مجددا تلاش کنید
                </Alert>
              </>
            )}
            <Formik
              initialValues={INITIAL_VALUES}
              validationSchema={verirySchema}
              onSubmit={(values, actions) =>
                this.handleVerify({ values, actions })
              }
            >
              <Form className="w-[90%] mt-7">
                {this.props.message && (
                  <Alert
                    title={
                      <div
                        dangerouslySetInnerHTML={{
                          __html: String(this.props.message).replace(
                            /\d+/g,
                            (num) => `<i>${num}</i>`
                          ),
                        }}
                      />
                    }
                    color="green"
                  />
                )}
                <Space h="sm" />
                <TextField
                  name="verifyCode"
                  label={<Text size="sm">کد تایید</Text>}
                />
                <Space h="sm" />
                <Group position="apart">
                  <Text
                    size="sm"
                    onClick={() =>
                      this.state.time < 0 ? this.sendAgainCode() : null
                    }
                    sx={{
                      cursor: this.state.time < 0 ? 'pointer' : 'not-allowed',
                    }}
                    color={this.state.time < 0 ? 'blue' : '#ccc'}
                  >
                    ارسال مجدد
                  </Text>
                  {this.state.time > 0 && (
                    <Text color="blue" size="sm">
                      {this.state.time === 60
                        ? '1:00'
                        : this.state.time < 10
                        ? `0:0${this.state.time}`
                        : `0:${this.state.time}`}
                    </Text>
                  )}
                </Group>
                <Space h="sm" />
                <Space h="sm" />
                <Button
                  fullWidth
                  radius="md"
                  color="blue"
                  type="submit"
                  loading={this.state.loading}
                >
                  تایید
                </Button>
              </Form>
            </Formik>
          </>
        )}
      </>
    );
  }
}

export default withRouter(VerifyForm);
