export const summaryOfRetailTable = {
  header: [
    {
      name: 'حجم معاملات',
      selector: (row) => row.n1,
    },
    {
      name: 'ارزش معاملات',
      selector: (row) => row.n2,
    },
    {
      name: 'سرانه خرید حقیق',
      selector: (row) => row.n3,
    },
    {
      name: 'سرانه فروش حقیقی',
      selector: (row) => row.n4,
    },
    {
      name: 'قدرت خرید',
      selector: (row) => row.n5,
    },
    {
      name: 'ورود پول حقیقی',
      selector: (row) => row.n6,
    },
  ],
  data: [
    {
      id: 1,
      n1: "7.8 B",
      n2: '4,400 B',
      n3: '20.5 M',
      n4: '19.1 M',
      n5: '1.07',
      n6: '-289.5 B',
    },
  ],
};

export const Separated_statistics_micro_transactions = {
  header: [
    {
      name: '#',
      selector: (row) => row.n0,
      sortable: true,
    },
    {
      name: 'حجم معاملات',
      selector: (row) => row.n1,
      sortable: true,
    },
    {
      name: 'ارزش معاملات',
      selector: (row) => row.n2,
      sortable: true,
    },
    {
      name: 'سرانه خرید حقیق',
      selector: (row) => row.n3,
      sortable: true,
    },
    {
      name: 'سرانه فروش حقیقی',
      selector: (row) => row.n4,
      sortable: true,
    },
    {
      name: 'قدرت خرید',
      selector: (row) => row.n5,
      sortable: true,
    },
    {
      name: 'ورود پول حقیقی',
      selector: (row) => row.n6,
      sortable: true,
    },
  ],
  data: [
    {
      id: 1,
      n0: 'سهام، حق تقدم و ص.سهامی',
      n1: '6.9 B',
      n2: '3,238.9 B',
      n3: '17.8 M',
      n4: '17.1 M',
      n5: '1.04',
      n6: '-379.3 B',
    },
    {
      id: 2,
      n0: 'سهام و حق تقدم',
      n1: '6.9 B',
      n2: '2,691.5 B',
      n3: '15.7 M',

      n4: '15.2 M',
      n5: '1.03',
      n6: '-342 B',
    },
    {
      id: 3,
      n0: 'صندوق های سهامی',
      n1: '68.9 M',
      n2: '547.4 B',
      n3: '35.1 M',
      n4: '34.7 M',
      n5: '1.01',
      n6: '-37.3 B',
    },
    {
      id: 4,
      n0: 'ص. درآمد ثابت و مختلط',
      n1: '848.1 M',
      n2: '1,161.1 B',
      n3: '69 M',
      n4: '85.5 M',
      n5: '-1.24',
      n6: '89.9 B',
    },
    {
      id: 5,
      n0: 'پنجاه سهم بزرگ',
      n1: '2.4 B',
      n2: '1,047.2 B',
      n3: '19.5 M',
      n4: '18.3 M',
      n5: '1.07',
      n6: '-213.8 B',
    },
  ],
};

export const Real_Legal = {
  header: [
    {
      name: 'تعداد خریداران	',
      selector: (row) => row.n0,
    },
    {
      name: 'ارزش خرید',
      selector: (row) => row.n1,
    },
    {
      name: 'درصد خرید',
      selector: (row) => row.n2,
    },
    {
      name: 'درصد فروش	',
      selector: (row) => row.n3,
    },
    {
      name: 'ارزش فروش	',
      selector: (row) => row.n4,
    },
    {
      name: 'تعداد فروشندگان',
      selector: (row) => row.n5,
    },
    {
      name: 'نوع',
      selector: (row) => row.n6,
    },
  ],
  data: [
    {
      id: 0,
      n0: '139,815	',
      n1: '2,861.7 B	',
      n2: '65.04',
      n3: '71.05	',
      n4: '3,126.2 B	',
      m5: '163,302',
      n6: 'حقیقی',
    },
    {
      id: 1,
      n0: '1,177',
      n1: '1,451.1 B	',
      n2: '32.98	',
      n3: '26.97',
      n4: '1,186.5 B	',
      m5: '952',
      n6: 'حقوقی',
    },
  ],
};


export const Summary_exchanges = {
  header: [
    {
      name: "نام گروه",
      selector: (row) => row.n0,
      sortable: true,
    },
    {
      name: "حجم معاملات",
      selector: (row) => row.n1,
      sortable: true,
    },
    {
      name: "ارزش معاملات",
      selector: (row) => row.n2,
      sortable: true,
    },
    {
      name: "ارزش خرید حقیقی",
      selector: (row) => row.n3,
      sortable: true,
    },
    {
      name: "ارزش فروش حقیقی",
      selector: (row) => row.n4,
      sortable: true,
    },
    {
      name: "ارزش سفارش های خرید",
      selector: (row) => row.n5,
      sortable: true,
    },
    {
      name: "ارزش سفارش های فروش",
      selector: (row) => row.n6,
      sortable: true,
    },
    {
      name: "تراز سفارش ها",
      selector: (row) => row.n7,
      sortable: true,
    },
    {
      name: "هم وزن",
      selector: (row) => row.n8,
      sortable: true,
    },
    {
      name: "سرانه خرید",
      selector: (row) => row.n9,
      sortable: true,
    },
    {
      name: "سرانه فروش",
      selector: (row) => row.n10,
      sortable: true,
    },
    {
      name: "قدرت خرید",
      selector: (row) => row.n11,
      sortable: true,
    },
    {
      name: "درصد خرید حقیقی",
      selector: (row) => row.n12,
      sortable: true,
    },
    {
      name: "درصد فروش حقیقی",
      selector: (row) => row.n13,
      sortable: true,
    },
    {
      name: "ورود پول حقیقی",
      selector: (row) => row.n14,
      sortable: true,
    }
  ],
  data: [
    {
      id: 0,
      n0: 'ص. درآمد ثابت',
      n1: '848.1 M',
      n2: '1,161.1 B',
      n3: '69 M',
      n4: '85.5 M',
      n5: <span className="p-1 bg-emerald-500 rounded-md text-white">3.24</span>,
      n6: '89.9 B',
      n7: <span className="p-1 bg-emerald-500 rounded-md text-white">1.24</span>,
      n8: '89.9 B',
      n9: <span className="p-1 bg-emerald-500 rounded-md text-white">1.24</span>,
      n10: '89.9 B',
      n11: <span className="p-1 bg-emerald-500 rounded-md text-white">1.24</span>,
      n12: '89.9 B',
      n13: <span className="p-1 bg-emerald-500 rounded-md text-white">1.24</span>,
      n14: '89.9 B',
    },
    // fill other rows with diffrent data
    {
      id: 1,
      n0: 'صندوق های سهامی',
      n1: '828.1 M',
      n2: '1,131.1 B',
      n3: '69 M',
      n4: '85.5 M',
      n5: <span className="p-1 bg-rose-500 rounded-md text-white">1.24</span>,
      n6: '89.9 B',
      n7: <span className="p-1 bg-rose-500 rounded-md text-white">1.224</span>,
      n8: '89.3 B',
      n9: <span className="p-1 bg-rose-500 rounded-md text-white">1.24</span>,
      n10: '89.9 B',
      n11: <span className="p-1 bg-rose-500 rounded-md text-white">1.124</span>,
      n12: '84.9 B',
      n13: <span className="p-1 bg-rose-500 rounded-md text-white">1.24</span>,
      n14: '89.9 B',
    },
    // fill other rows with diffrent data
    {
      id: 2,
      n0: 'فلزات اساسی',
      n1: '848.1 M',
      n2: '1,161.1 B',
      n3: '69 M',
      n4: '852.5 M',
      n5: <span className="p-1 bg-rose-500 rounded-md text-white"> 1.24</span>,
      n6: '893.9 B',
      n7: <span className="p-1 bg-rose-500 rounded-md text-white"> 1.24</span>,
      n8: '85.9 B',
      n9: <span className="p-1 bg-rose-500 rounded-md text-white"> 1.24</span>,
      n10: '89.9 B',
      n11: <span className="p-1 bg-rose-500 rounded-md text-white"> 2.24</span>,
      n12: '83.9 B',
      n13: <span className="p-1 bg-rose-500 rounded-md text-white"> 1.24</span>,
      n14: '89.9 B',
    },
    // fill other rows with diffrent data
    {
      id: 3,
      n0: 'خودرو و ساخت قطعات',
      n1: '235.1 M',
      n2: '1,123.1 B',
      n3: '12 M',
      n4: '412.5 M',
      n5: <span className="p-1 bg-emerald-500 rounded-md text-white">1.243</span>,
      n6: '23.9 B',
      n7: <span className="p-1 bg-emerald-500 rounded-md text-white">1.24</span>,
      n8: '2.9 B',
      n9: <span dir="ltr" className="p-1 bg-rose-500 rounded-md text-white">-1.24</span>,
      n10: '8912.9 B',
      n11: <span dir="ltr" className="p-1 bg-rose-500 rounded-md text-white">-142.24</span>,
      n12: '8539.9 B',
      n13: <span dir="ltr" className="p-1 bg-rose-500 rounded-md text-white" >-1.24</span>,
      n14: '839.9 B',
    }
  ]
} 