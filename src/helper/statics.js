export const totalSummeryGroupState = {
  header: [
    {
      name: 'نام گروه',
      selector: (row) => row.n0,
    },
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
};

export const summaryTrans = {
  header: [
    {
      name: '#',
      selector: (row) => row.id,
      sortable: true,
      omit: true,
    },
    {
      name: 'حجم معاملات',
      selector: (row) => row.n0,
      sortable: true,
    },
    {
      name: 'ارزش معاملات',
      selector: (row) => row.n1,
      sortable: true,
    },
    {
      name: 'سرانه خرید حقیق',
      selector: (row) => row.n2,
      sortable: true,
    },
    {
      name: 'سرانه فروش حقیقی',
      selector: (row) => row.n3,
      sortable: true,
    },
    {
      name: 'قدرت خرید',
      selector: (row) => row.n4,
      sortable: true,
    },
    {
      name: 'ورود پول حقیقی',
      selector: (row) => row.n5,
      sortable: true,
    },
  ],
};

export const totalSummerStockLOrN = {
  header: [
    {
      name: 'تعداد خریدار',
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
      name: 'نوع',
      selector: (row) => row.n3,
    },
    {
      name: 'تعداد فروشنده',
      selector: (row) => row.n4,
    },
    {
      name: 'ارزش فروش',
      selector: (row) => row.n5,
    },
    {
      name: 'درصد فروش',
      selector: (row) => row.n6,
    },
  ],
};

const EmailCustom = (row) => <a href="mailto://" style={{width:'200px'}} >{row.n0}</a>;

export const totalSummeryIndustrials = {
  header: [
    {
      name: 'شناسه',
      selector: (row) => row.id,
      omit: true,
    },
    {
      name: 'نام گروه',
      selector: (row) => row.n0,
      sortable: true,
      cell: (row) => <EmailCustom {...row} />,
      grow: 3,
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
      name: 'ارزش خرید حقیقی',
      selector: (row) => row.n3,
      sortable: true,
    },
    {
      name: 'ارزش فروش حقیقی',
      selector: (row) => row.n4,
      sortable: true,
    },
    {
      name: 'ارزش سفارش های خرید',
      selector: (row) => row.n5,
      sortable: true,
    },
    {
      name: 'ارزش سفارش های فروش',
      selector: (row) => row.n6,
      sortable: true,
    },
    {
      name: 'تراز سفارش ها',
      selector: (row) => row.n7,
      sortable: true,
    },
    {
      name: 'هم وزن',
      selector: (row) => row.n8,
      sortable: true,
    },
    {
      name: 'سرانه خرید',
      selector: (row) => row.n9,
      sortable: true,
    },
    {
      name: 'سرانه فروش',
      selector: (row) => row.n10,
      sortable: true,
    },
    {
      name: 'قدرت خرید',
      selector: (row) => row.n11,
      sortable: true,
    },
    {
      name: 'درصد خرید حقیقی',
      selector: (row) => row.n12,
      sortable: true,
    },
    {
      name: 'درصد فروش حقیقی',
      selector: (row) => row.n13,
      sortable: true,
    },
    {
      name: 'ورود پول حقیقی',
      selector: (row) => row.n14,
      sortable: true,
    },
  ],
};

/**
 * return data with diffrent case
 */
export const summary_config = {
  groupName: {
    colorize: false,
    link: true,
    href: `/industries`,
  },
  n5: {
    colorize: true,
  },
  n7: {
    colorize: true,
  },
  n9: {
    colorize: true,
  },
  n11: {
    colorize: true,
  },
  n13: {
    colorize: true,
  },
};

/**
 * industry header for table one of industries page
 */
export const industries_table1 = {
  header: [
    {
      name: 'حجم معاملات گروه',
      selector: (row) => row.n0,
    },
    {
      name: 'ارزش معاملات گروه',
      selector: (row) => row.n1,
    },
    {
      name: 'سرانه خرید حقیقی	',
      selector: (row) => row.n2,
    },
    {
      name: 'سرانه فروش حقیقی	',
      selector: (row) => row.n3,
    },
    {
      name: 'نسبت خریدار به فروشنده	',
      selector: (row) => row.n4,
    },
    {
      name: 'ورود پول حقیقی',
      selector: (row) => row.n5,
    },
  ],
};

/**
 * industry header for table two of industries page
 */
export const industries_table2 = {
  header: [...totalSummerStockLOrN.header],
};

export const industries_table3 = {
  header: [
    {
      name: 'شناسه',
      selector: (row) => row.id,
      omit: true,
    },
    {
      name: 'نماد',
      selector: (row) => row.n0,
      sortable: true,
    },
    {
      name: 'حجم معاملات',
      selector: (row) => row.n1,
      sortable: true,
    },
    {
      name: 'میانگین حجم 20 روزه',
      selector: (row) => row.n2,
      sortable: true,
    },
    {
      name: 'ارزش معاملات',
      selector: (row) => row.n3,
      sortable: true,
    },
    {
      name: 'آخرین',
      selector: (row) => row.n4,
      sortable: true,
    },
    {
      name: 'درصد',
      selector: (row) => row.n5,
      sortable: true,
    },
    {
      name: 'پایانی',
      selector: (row) => row.n6,
      sortable: true,
    },
    {
      name: 'درصد',
      selector: (row) => row.n7,
      sortable: true,
    },
    {
      name: 'نوسان',
      selector: (row) => row.n8,
      sortable: true,
    },
    {
      name: 'سرانه خرید',
      selector: (row) => row.n9,
      sortable: true,
    },
    {
      name: 'سرانه فروش',
      selector: (row) => row.n10,
      sortable: true,
    },
    {
      name: 'قدرت خرید',
      selector: (row) => row.n11,
      sortable: true,
    },
    {
      name: 'قدرت خرید 5 روزه',
      selector: (row) => row.n12,
      sortable: true,
    },
    {
      name: 'ورود پول',
      selector: (row) => row.n13,
      sortable: true,
    },
    {
      name: 'بازدهی 5 روزه',
      selector: (row) => row.n14,
      sortable: true,
    },
    {
      name: 'بازدهی 20 روزه',
      selector: (row) => row.n15,
      sortable: true,
    },
    {
      name: 'بازدهی 60 روزه',
      selector: (row) => row.n16,
      sortable: true,
    },
  ],
  options: {
    originalName: {
      link: true,
      href: `/industries/detail`,
    },
  },
};
