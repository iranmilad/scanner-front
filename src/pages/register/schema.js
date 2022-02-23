import * as Yup from 'yup';
import { Text } from '@mantine/core';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = Yup.object().shape({
  username: Yup.string()
  .required("نام کاربری را وارد کنید")
    .min(4, 'نام کاربری باید حداقل 4 کاراکتر باشد')
    .max(50, 'نام کاربری باید حداکثر 50 کاراکتر باشد'),
  phone: Yup.string()
  .required("شماره تلفن را وارد کنید")
  .matches(phoneRegExp, 'شماره تلفن معتبر نیست')
  .min(10, "شماره تلفن معتبر نیست")
  .max(11, "شماره تلفن معتبر نیست"),
  password: Yup.string()
    .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
    .max(50,"رمز عبور باید حداکثر 50 کاراکتر باشد")
    .required("رمز عبور را وارد کنید"),
  acceptTerms: Yup.boolean()
  .oneOf([true])
  .required()
})

export default schema;