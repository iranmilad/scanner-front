import { Alert, Group, Text, Button, Space } from '@mantine/core';
import { Formik, Form } from 'formik';
import React from 'react';
import TextField from '../../../components/FormsUI/TextField';
import { registerAPI } from '../../../apis/auth';
import { verirySchema } from './schema';
import { History } from '../../../helper/history';

class VerifyForm extends React.PureComponent {
  state = {
    loading: false,
    success: false,
    // timer for count down
    userData: this.props.userData,
    successCode: false,
    time: 60,
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
            success: 'success',
          });
          setTimeout(() => {
            History.push('/login');
          }, 4000);
        })
        .catch((err) => {
          this.setState((prev) => ({
            ...prev,
            success: 'faild',
            loading: false,
          }));
        });
    } else {
      actions.setErrors({ verifyCode: 'کد تایید صحیح نمی باشد' });
    }
  }

  componentDidMount() {
    this.setState(state => ({
      ...state,
      successCode: this.props.verify.code
    }))
    this.countDownTimer();
  }

  countDownTimer(){
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
    this.setState(state => ({
      ...state,
      successCode:false
    }))
    registerAPI({ url: '/user/register', data: this.props.userData })
      .then((result) => {
        this.setState((prev) => ({
          ...prev,
          successCode:result.data.data.code,
          time: 60,
        }));
        this.countDownTimer();
      })
      .catch((error) => {
        this.setState((state) => ({
          ...state,
          success: 'faild',
        }));
      });
  }

  render() {
    const INITIAL_VALUES = {
      verifyCode: '',
    };
    let title = `کد تایید به شماره تلفن ${this.props.mobile} ارسال شد`;
    return (
      <>
        {this.state.success ? (
          <>
            {this.state.success === 'success' ? (
              <>
                <Space h="lg" />
                <Alert title="ثبت نام با موفقیت انجام شد" color="indigo">
                  <Group position="apart">
                    <Text size="sm">
                      به طور خودکار به صفحه ورود هدایت میشود
                    </Text>
                  </Group>
                </Alert>
              </>
            ) : (
              <>
                <Space h="lg" />
                <Alert title="مشکلی پیش آمده است" color="red">
                  لطفا مجددا تلاش کنید
                </Alert>
              </>
            )}
          </>
        ) : (
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={verirySchema}
            onSubmit={(values, actions) =>
              this.handleVerify({ values, actions })
            }
          >
            <Form className="w-[90%] mt-7">
              {this.state.successCode && <Alert title={title} color="green" />}
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
                  sx={{cursor: this.state.time < 0 ? 'pointer': 'not-allowed'}}
                  color={this.state.time < 0 ? 'indigo' : '#ccc'}
                >
                  ارسال مجدد
                </Text>
                {this.state.time > 0 && (
                  <Text color="indigo" size="sm">
                    {this.state.time === 60 ? '1:00' : this.state.time < 10 ? `0:0${this.state.time}`: `0:${this.state.time}`}
                  </Text>
                )}
              </Group>
              <Space h="sm" />
              <Space h="sm" />
              <Button
                fullWidth
                radius="md"
                color="indigo"
                type="submit"
                loading={this.state.loading}
              >
                تایید
              </Button>
            </Form>
          </Formik>
        )}
      </>
    );
  }
}

export default VerifyForm;
