import { randomNumber } from '../helper';

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
        link: '/extra/marketwatch',
      },
      {
        name: 'تکنیکال',
        link: '/extra/technowatch',
      },
      {
        name: 'صنایع',
        link: '/extra/industrialwatch',
      },
      {
        name: 'سفارشات',
        link: '/extra/orderwatch',
      },
      {
        name: 'حمایت ها و مقاومت ها',
        link: '/extra/pivotwatch',
        account: true,
      },
      {
        name: 'جریانات نقدینگی بلندمدت',
        link: '/extra/signalwatch',
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
        link: '/reports',
      },
      {
        name: 'جریانات نقدینگی',
        link: '#',
      },
      {
        name: 'جریانات نقدینگی بازار',
        link: '/market/chart/A00',
      },
      {
        name: 'جریانات نقدینگی روزانه بازار',
        link: '/chart/daily/A00',
      },
      {
        name: 'جریانات نقدینگی لحظه',
        link: '/moneyflow',
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
        name: 'فیلترهای جریان نقدینگی بلندمدت',
        link: '/extra/longmoneyflow',
      },
      {
        name: 'لیست شرکت ها بر اساس ارزش بازار',
        link: '/marketvalues',
      },
      {
        name: 'لیست شرکت ها بر اساس فاصله تا سقف قیمت',
        link: '/tops',
      },
    ],
  },
  {
    name: 'نقشه بازار',
    link: '/treemap',
    icon: 'fa-solid fa-objects-column',
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
