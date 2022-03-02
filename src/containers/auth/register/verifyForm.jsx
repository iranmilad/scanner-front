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
    time: 4,
  };
  handleVerify({ values, actions }) {
    /**
     * Handle verify code in fron end
     */
    if (values.verifyCode == this.props.verify.code) {
      this.setState((prev) => ({
        ...prev,
        loading: true,
      }));
      registerAPI({url:'/user/confirm-register',data:this.props.verify})
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
              <Alert title={title} color="green" />
              <Space h="sm" />
              <TextField
                name="verifyCode"
                label={<Text size="sm">کد تایید</Text>}
              />
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
