import { Form, Formik } from 'formik';
import { Text, Button, Stack } from '@mantine/core';
import * as Yup from 'yup';
import { Component } from 'react';
import TextField from '../../../components/FormsUI/TextField';
import axios from 'axios';
import Cookies from 'js-cookie';
import { showNotification } from '@mantine/notifications';
import { getEveryUser } from '../../../apis/main';

class ChangePassword extends Component {
  state = {
    loading: false,
  };
  async changePassowrd(values) {
    this.setState({ loading: true });
    try {
      let response = await getEveryUser('/user/change-password', {
        method: "put",
        data: {
          current_password: values.oldPassword,
          password: values.newPassword,
          password_confirmation: values.confirmPassword,
        },
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      this.setState({ loading: false });
      showNotification({
        title: 'پیام سیستم',
        message: response.data.message,
        color: 'blue',
        autoClose: 5000,
        dir: 'rtl',
      });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
    }
  }
  render() {
    const INITIAL_VALUE = {
      oldPassword: '',
      newPassword: '',
    };
    return (
      <>
        <Text size="lg" weight="bold" mb="lg">
          تغییر گذرواژه
        </Text>
        <Formik
          initialValues={INITIAL_VALUE}
          validationSchema={schema}
          onSubmit={(values) => this.changePassowrd(values)}
        >
          <Form>
            <Stack>
              <TextField
                name="oldPassword"
                label={<Text size="sm">گذرواژه قبلی</Text>}
                type="password"
                dir="ltr"
              />
              <TextField
                name="newPassword"
                label={<Text size="sm">گذرواژه جدید</Text>}
                type="password"
                dir="ltr"
              />
              <TextField
                name="confirmPassword"
                label={<Text size="sm">تکرار گذرواژه</Text>}
                type="password"
                dir="ltr"
              />
              <Button type="submit" mt="lg" loading={this.state.loading}>
                تغییر گذرواژه
              </Button>
            </Stack>
          </Form>
        </Formik>
      </>
    );
  }
}

export const schema = Yup.object().shape({
  oldPassword: Yup.string().required('لطفا گذرواژه فعلی را وارد کنید'),
  newPassword: Yup.string()
    .required('لطفا گذرواژه جدید را وارد کنید')
    .min(8, 'رمز عبور باید حداقل 8 کاراکتر باشد')
    .max(50, 'رمز عبور باید حداکثر 50 کاراکتر باشد'),
  confirmPassword: Yup.string()
    .required('لطفا تکرار گذرواژه را وارد کنید')
    .oneOf(
      [Yup.ref('newPassword'), null],
      'رمز عبور و تکرار آن باید یکسان باشد'
    ),
});

export default ChangePassword;
