import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


export const verifyMobileShema = Yup.object().shape({
  mobile: Yup.string()
  .required("شماره تلفن را وارد کنید")
  .matches(phoneRegExp, 'شماره تلفن معتبر نیست')
  .min(11, "شماره تلفن معتبر نیست")
  .max(11, "شماره تلفن معتبر نیست"),
})