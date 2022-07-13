import { Component } from 'react';
import { Formik, Form } from 'formik';
import { Button, Select, Stack, Text } from '@mantine/core';
import * as Yup from 'yup';
import TextField from "../../../components/FormsUI/TextField";
import Textarea from '../../../components/FormsUI/Textarea';
import axios from 'axios';
import { showNotification } from '@mantine/notifications';
import Cookies from "js-cookie"

class Question extends Component {
  state = {
    messageTypesSelected: 'درخواست راهنمایی',
    loading: false
  }
  async sendMessage(values){
    this.setState({loading: true})
    try {
      let response = await axios.post('https://user.tseshow.com/api/question', {
        type: this.state.messageTypesSelected,
        title: values['subject'],
        question: values['body'],
      },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      this.setState({loading:false})
      showNotification({
        title: "پیام سیستم",
        message: "پیام شما با موفقیت ارسال شد ؛ در اولین فرصت پاسخ داده خواهد شد",
        color: "green",
        autoClose: 5000,
        dir:"rtl"
      })
    } catch (error) {
      this.setState({loading:false})
      showNotification({
        title: "پیام سیستم",
        message: "مشکلی در ارسال پیام به سرور به وجود آمده است",
        color: "red",
        autoClose: 5000,
      })
    }
  }
  render() {
    const INITIAL_VALUE = {
      subject: '',
      body: '',
    }
    const messageTypes = [
      {value: "درخواست راهنمایی", label: "درخواست راهنمایی"},
      {value: "مشکل در تهیه اشتراک", label: "مشکل در تهیه اشتراک"},
      {value: "پیشنهاد یا انتقاد", label: "پیشنهاد یا انتقاد"},
      {value: "سایر موارد", label: "سایر موارد"},
    ]
    return (
      <>
        <Text size="lg" mb="md" weight="bold">
          ارسال پیام به ما
        </Text>
        <Formik initialValues={INITIAL_VALUE} validationSchema={schema} onSubmit={(values)=>this.sendMessage(values)}>
          <Form>
            <Stack>
              <Select
                data={messageTypes}
                label="دسته بندی"
                placeholder='دسته بندی را انتخاب کنید'
                defaultValue="درخواست راهنمایی"
                onChange={(e) => this.setState({messageTypesSelected: e})}
              />
              <TextField
                name="subject"
                label={<Text size="sm">موضوع</Text>}
                type="text"
                variant="default"
                size="sm"
                />
                <Textarea
                  name="body"
                  label={<Text size="sm">متن</Text>}
                  type="text"
                  minRows={5}
                />
                <Button type='submit' loading={this.state.loading}>ارسال پیام</Button>
            </Stack>
          </Form>
        </Formik>
      </>
    );
  }
}

const schema = Yup.object().shape({
  subject: Yup.string()
    .required('عنوان پیام را وارد کنید')
    .min(3, 'عنوان پیام باید حداقل 3 کاراکتر باشد')
    .max(255, 'عنوان پیام باید حداکثر 255 کاراکتر باشد'),
  body: Yup.string()
  .required("متن پیام را وارد کنید")
});

export default Question;
