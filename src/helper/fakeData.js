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
        name: 'جریانات نقدینگی روزانه',
        link: '#',
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

export const firstChart = {
  special: 'A1',
  series: [
    {
      name: "تعداد نماد ها",
      data: [2, 49, 44, 118, 94, 88, 107, 53, 60, 9, 57, 3],
    },
  ],
};

export const twoChart = {
  special: 'A2',
  series: [58, 42],
};

export const threeChart = {
  special: 'A3',
  series: [
    {
      name: 'مثبت',
      data: randomNumber(),
    },
    {
      name: 'منفی',
      data: randomNumber(),
    },
  ],
};

export const fourchart = {
  special: 'A4',
  series: [
    {
      name: "ارزش سفارشات",
      data: ['323.3B', '271.9B'],
    },
  ],
};

export const fiveChart = {
  special: 'A5',
  series: [
    {
      name: 'ورود پول',
      data: randomNumber(),
    },
  ],
};

export const sixChart = {
  special: 'A6',
  series: [
    {
      name: 'ورود پول',
      data: randomNumber(),
    },
  ],
};

export const sevenChart = {
  special: 'A7',
  series: [
    {
      name: 'ورود پول',
      data: randomNumber(),
    },
  ],
};

export const eightChart = {
  special: 'A8',
  series: [
    {
      name: 'ورود پول',
      data: randomNumber(),
    },
  ],
};

export const A9 = {
  special: 'A9',
  series: [
    {
      name: 'خرید',
      data: randomNumber(),
    },
    {
      name: 'فروش',
      data: randomNumber(),
    },
  ],
};

export const A10 = {
  special: 'A10',
  series: [
    {
      name: 'خرید',
      data: randomNumber(),
    },
    {
      name: 'فروش',
      data: randomNumber(),
    },
  ],
};

export const A11 = {
  special: 'A11',
  series: [
    {
      data: [301, 42, 335],
    },
  ],
};

export const A12 = {
  special: 'A12',
  series: [
    {
      data: [217, 102, 359],
    },
  ],
};

export const A13 = {
  special: 'A13',
  series: [
    {
      name: "نماد",
      data: [61, 56, 200, 122, 90, 54],
    },
  ],
};

export const A14 = {
  special: 'A14',
  series: [
    {
      data: [14, 20, 66],
    },
  ],
};

export const A15 = {
  special: 'A15',
  series: [
    {
      data: [12, 30, 60],
    },
  ],
};

export const A16 = {
  special: 'A16',
  series: [
    {
      data: [61, 56, 200, 122, 90, 54],
    },
  ],
};

export const A17 = {
  special: 'A17',
  series: [
    {
      name: 'Desktops',
      data: randomNumber(),
    },
  ],
};

export const A18 = {
  special: 'A18',
  series: [
    {
      name: 'Desktops',
      data: randomNumber(),
    },
  ]
}
