import { randomNumber } from '../helper';

export const masterData = [
  {
    name: 'شاخص کل بورس',
    value: '1,301,161.48',
    change: '-72.87',
    percent: '-0.01',
  },
  {
    name: 'شاخص کل هم وزن',
    value: '333,018.79',
    change: '-261.63',
    percent: '-0.08',
  },
];

export const headers = [
  {
    name: 'خانه',
    link: '/',
    icon: 'fa-duotone fa-house-chimney',
  },
  {
    name: 'سوابق بازار',
    link: '/industries/history/A00',
    icon: 'fa-duotone fa-file-waveform',
  },
  {
    name: 'دیده بان ها',
    link: '#',
    icon: 'fa-duotone fa-binoculars',
    children: [
      {
        name: 'بازار',
        link: '#',
      },
      {
        name: 'تکنیکال',
        link: '#',
      },
      {
        name: 'صنایع',
        link: '#',
      },
      {
        name: 'سفارشات',
        link: '#',
      },
      {
        name: 'حمایت ها و مقاومت ها',
        link: '#',
        account: true,
      },
      {
        name: 'جریانات نقدینگی بلندمدت',
        link: '#',
        account: true,
      },
    ],
  },
  {
    name: 'نمودارها',
    link: '#',
    icon: 'fa-duotone fa-chart-candlestick',
    children: [
      {
        name: 'عملکرد شرکت ها',
        link: '#',
      },
      {
        name: 'جریانات نقدینگی',
        link: '#',
      },
      {
        name: 'جریانات نقدینگی روزانه بازار',
        link: '/chart/daily/A00',
      },
      {
        name: 'جریانات نقدینگی لحظه',
        link: '#',
        account: true,
      },
    ],
  },
  {
    name: 'لینک های مفید',
    link: '#',
    icon: 'fa-duotone fa-hand-holding-medical',
    children: [
      {
        name: 'فیلترنویسی ساده',
        link: '#',
      },
      {
        name: 'فیلترهای جریان نقدینگی بلندمدت',
        link: '#',
      },
      {
        name: 'لیست شرکت ها بر اساس ارزش بازار',
        link: '#',
      },
      {
        name: 'لیست شرکت ها بر اساس فاصله تا سقف قیمت',
        link: '#',
      },
    ],
  },
  {
    name: 'نقشه بازار',
    link: '/treemap',
    icon: 'fa-solid fa-objects-column',
  },
  {
    name: 'راهنمای سایت',
    link: '#',
    icon: 'fa-duotone fa-square-question',
  },
];

export const header2 = [
  {
    name: 'پشتیبانی',
    link: '#',
    icon: 'fa-duotone fa-headset',
  },
  {
    name: 'حساب کاربری',
    link: '#',
    icon: 'fa-duotone fa-user',
    children: [
      {
        name: 'احراز هویت',
        link: '#',
      },
      {
        name: 'حساب های بانکی',
        link: '#',
      },
      {
        name: 'ورود دو مرحله ای',
        link: '#',
      },
      {
        name: 'تغیر رمز',
        link: '#',
      },
      {
        name: 'تاریخچه ورود',
        link: '#',
      },
      {
        name: 'اعلان ها',
        link: '#',
      },
    ],
  },
];
