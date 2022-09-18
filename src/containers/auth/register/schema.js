import * as Yup from 'yup';
import { Text } from '@mantine/core';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const registerStepOne = Yup.object().shape({
  last_name: Yup.string()
  .required("نام خانوادگی را وارد کنید")
    .min(3, 'نام خانوادگی باید حداقل 3 کاراکتر باشد')
    .max(50, 'نام خانوادگی باید حداکثر 50 کاراکتر باشد'),
  mobile: Yup.string()
  .required("شماره تلفن را وارد کنید")
  .matches(phoneRegExp, 'شماره تلفن معتبر نیست')
  .min(11, "شماره تلفن معتبر نیست")
  .max(11, "شماره تلفن معتبر نیست"),
  password: Yup.string()
    .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
    .max(50,"رمز عبور باید حداکثر 50 کاراکتر باشد")
    .required("رمز عبور را وارد کنید"),
  acceptTerms: Yup.boolean()
  .oneOf([true])
  .required()
})

export const verirySchema = Yup.object().shape({
  verifyCode: Yup.number()
  .required("کد تایید را وارد کنید")
});