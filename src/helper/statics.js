import { Link } from 'react-router-dom';
import { ColorizeTag, LinkTag } from './index';

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
      cell: (row) => <ColorizeTag row={row.n5} />,
    },
    {
      name: 'ورود پول حقیقی',
      selector: (row) => row.n6,
      cell: (row) => <ColorizeTag row={row.n6} />,
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
      cell: (row) => <ColorizeTag row={row.n4} />,
      sortable: true,
    },
    {
      name: 'ورود پول حقیقی',
      selector: (row) => row.n5,
      cell: (row) => <ColorizeTag row={row.n5} />,
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
      cell: (row) => <LinkTag link={`/industries/${row.id}`} text={row.n0} />,
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
      cell: (row) => <ColorizeTag row={row.n7} />,
    },
    {
      name: 'هم وزن',
      selector: (row) => row.n8,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n8} />,
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
      cell: (row) => <ColorizeTag row={row.n11} />,
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
      cell: (row) => <ColorizeTag row={row.n14} />,
    },
  ],
};

/**
 * industry header for table one of industries page
 */
export const industries_table1 = {
  header: [
    {
      name: 'شناسه',
      selector: (row) => row.id,
      omit: true,
    },
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
      cell: (row) => <ColorizeTag row={row.n4} />,
    },
    {
      name: 'ورود پول حقیقی',
      selector: (row) => row.n5,
      cell: (row) => <ColorizeTag row={row.n5} />,
    },
  ],
};

/**
 * industry header for table two of industries page
 */
export const industries_table2 = {
  header: [...totalSummerStockLOrN.header],
};

export const industries_table3_type1 = {
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
      cell: (row) => <LinkTag link={`/market/real/${row.id}`} text={row.n0} />,
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
      cell: (row) => <ColorizeTag row={row.n5} />,
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
      cell: (row) => <ColorizeTag row={row.n7} />,
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
      cell: (row) => <ColorizeTag row={row.n11} />,
    },
    {
      name: 'قدرت خرید 5 روزه',
      selector: (row) => row.n12,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n12} />,
    },
    {
      name: 'ورود پول',
      selector: (row) => row.n13,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n13} />,
    },
    {
      name: 'بازدهی 5 روزه',
      selector: (row) => row.n14,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n14} />,
    },
    {
      name: 'بازدهی 20 روزه',
      selector: (row) => row.n15,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n15} />,
    },
    {
      name: 'بازدهی 60 روزه',
      selector: (row) => row.n16,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n16} />,
    },
  ],
};

export const industries_table3_type2 = {
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
      cell: (row) => <LinkTag link={`/market/real/${row.id}`} text={row.n0} />,
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
      name: 'NAV',
      selector: (row) => row.n4,
      sortable: true,
    },
    {
      name: 'درصد تفاوت قیمت با  NAV',
      selector: (row) => row.n5,
      sortable: true,
    },
    {
      name: 'آخرین',
      selector: (row) => row.n6,
      sortable: true,
    },
    {
      name: 'درصد',
      selector: (row) => row.n7,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n7} />,
    },
    {
      name: 'پایانی',
      selector: (row) => row.n8,
      sortable: true,
    },
    {
      name: 'درصد',
      selector: (row) => row.n9,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n9} />,
    },
    {
      name: 'نوسان',
      selector: (row) => row.n10,
      sortable: true,
    },
    {
      name: 'سرانه خرید',
      selector: (row) => row.n11,
      sortable: true,
    },
    {
      name: 'سرانه فروش',
      selector: (row) => row.n12,
      sortable: true,
    },
    {
      name: 'قدرت خرید',
      selector: (row) => row.n13,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n13} />,
    },
    {
      name: 'قدرت خرید 5 روزه',
      selector: (row) => row.n14,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n14} />,
    },
    {
      name: 'ورود پول',
      selector: (row) => row.n15,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n15} />,
    },
    {
      name: 'بازدهی 5 روزه',
      selector: (row) => row.n16,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n16} />,
    },
    {
      name: 'بازدهی 20 روزه',
      selector: (row) => row.n17,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n17} />,
    },
    {
      name: 'بازدهی 60 روزه',
      selector: (row) => row.n18,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n18} />,
    },
  ],
};

export const industries_history_type_1 = {
  header: [
    {
      name: 'ردیف',
      selector: (row) => row.n0,
    },
    {
      name: 'تاریخ',
      selector: (row) => row.n1,
      cell: (row) => (
        <Link
          style={{ width: '300px' }}
          to={`/extra/marketwatch/${row.n1.replaceAll('/', '')}`}
        >
          <span className="text-blue-500" style={{ width: '300px' }}>
            {row.n1}
          </span>
        </Link>
      ),
    },
    {
      name: 'ارزش معاملات',
      selector: (row) => row.n2,
    },
    {
      name: 'ارزش به 5 روز',
      selector: (row) => row.n3,
    },
    {
      name: 'ارزش به 20 روز',
      selector: (row) => row.n4,
    },
    {
      name: 'ارزش خرید حقیقی',
      selector: (row) => row.n5,
    },
    {
      name: 'ارزش فروش حقیقی',
      selector: (row) => row.n6,
    },
    {
      name: 'سرانه خرید',
      selector: (row) => row.n7,
    },
    {
      name: '5 روز',
      selector: (row) => row.n8,
    },
    {
      name: '20 روز',
      selector: (row) => row.n9,
    },
    {
      name: 'سرانه فروش',
      selector: (row) => row.n10,
    },
    {
      name: '5 روز',
      selector: (row) => row.n11,
    },
    {
      name: '20 روز',
      selector: (row) => row.n12,
    },
    {
      name: 'قدرت خرید',
      selector: (row) => row.n13,
      cell: (row) => <ColorizeTag row={row.n13} />,
    },
    {
      name: '5 روز',
      selector: (row) => row.n14,
      cell: (row) => <ColorizeTag row={row.n14} />,
    },
    {
      name: '20 روز',
      selector: (row) => row.n15,
      cell: (row) => <ColorizeTag row={row.n15} />,
    },
    {
      name: 'ورود پول',
      selector: (row) => row.n16,
      cell: (row) => <ColorizeTag row={row.n16} />,
    },
    {
      name: '5 روز',
      selector: (row) => row.n17,
      cell: (row) => <ColorizeTag row={row.n17} />,
    },
    {
      name: '20 روز',
      selector: (row) => row.n18,
      cell: (row) => <ColorizeTag row={row.n18} />,
    },
    {
      name: 'شاخص گروه',
      selector: (row) => row.n18,
      cell: (row) => <ColorizeTag row={row.n19} />,
    },
  ],
};

export const industries_history_type_2 = {
  header: [
    {
      name: 'ردیف',
      selector: (row) => row.n0,
    },
    {
      name: 'تاریخ',
      selector: (row) => row.n1,
      cell: (row) => (
        <Link
          style={{ width: '300px' }}
          to={`/extra/marketwatch/${row.n1.replaceAll('/', '')}`}
        >
          <span className="text-blue-500" style={{ width: '300px' }}>
            {row.n1}
          </span>
        </Link>
      ),
    },
    {
      name: 'ارزش معاملات',
      selector: (row) => row.n2,
    },
    {
      name: 'ارزش به 5 روز',
      selector: (row) => row.n3,
    },
    {
      name: 'ارزش به 20 روز',
      selector: (row) => row.n4,
    },
    {
      name: 'ارزش خرید حقیقی',
      selector: (row) => row.n5,
    },
    {
      name: 'ارزش فروش حقیقی',
      selector: (row) => row.n6,
    },
    {
      name: 'کد های خریدار',
      selector: (row) => row.n7,
    },
    {
      name: 'کد های فروشنده',
      selector: (row) => row.n8,
    },
    {
      name: 'سرانه خرید',
      selector: (row) => row.n9,
    },
    {
      name: '5 روز',
      selector: (row) => row.n10,
    },
    {
      name: '20 روز',
      selector: (row) => row.n11,
    },
    {
      name: 'سرانه فروش',
      selector: (row) => row.n12,
    },
    {
      name: '5 روز',
      selector: (row) => row.n13,
    },
    {
      name: '20 روز',
      selector: (row) => row.n14,
    },
    {
      name: 'قدرت خرید',
      selector: (row) => row.n15,
      cell: (row) => <ColorizeTag row={row.n15} />,
    },
    {
      name: '5 روز',
      selector: (row) => row.n16,
      cell: (row) => <ColorizeTag row={row.n16} />,
    },
    {
      name: '20 روز',
      selector: (row) => row.n17,
      cell: (row) => <ColorizeTag row={row.n17} />,
    },
    {
      name: 'ورود پول',
      selector: (row) => row.n18,
      cell: (row) => <ColorizeTag row={row.n18} />,
    },
    {
      name: '5 روز',
      selector: (row) => row.n19,
      cell: (row) => <ColorizeTag row={row.n19} />,
    },
    {
      name: '20 روز',
      selector: (row) => row.n20,
      cell: (row) => <ColorizeTag row={row.n20} />,
    },
    {
      name: 'شاخص کل',
      selector: (row) => row.n21,
    },
    {
      name: 'شاخص هم وزن',
      selector: (row) => row.n22,
    },
  ],
};

export const marketValues = {
  header: [
    {
      name: 'شرکت',
      selector: (row) => row.id,
      sortable: true,
      cell: (row) => (
        <Link to={`/market/real/${row.id}`}>
          <svg
            className="w-3 h-3 fill-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M64 400C64 408.8 71.16 416 80 416H480C497.7 416 512 430.3 512 448C512 465.7 497.7 480 480 480H80C35.82 480 0 444.2 0 400V64C0 46.33 14.33 32 32 32C49.67 32 64 46.33 64 64V400zM439 279L406.6 246.6L326.6 326.6C314.1 339.1 293.9 339.1 281.4 326.6L208 253.3L150.6 310.6C138.1 323.1 117.9 323.1 105.4 310.6C92.88 298.1 92.88 277.9 105.4 265.4L185.4 185.4C197.9 172.9 218.1 172.9 230.6 185.4L304 258.7L361.4 201.4L328.1 168.1C313.9 153.9 324.6 128 345.9 128H456C469.3 128 480 138.7 480 152V262.1C480 283.4 454.1 294.1 439 279L439 279z" />
          </svg>
        </Link>
      ),
    },
    {
      name: 'نماد',
      selector: (row) => row.n0,
      sortable: true,
    },
    {
      name: 'قیمت هر سهم',
      selector: (row) => row.n1,
      sortable: true,
    },
    {
      name: 'تعداد سهام',
      selector: (row) => row.n2,
      sortable: true,
    },
    {
      name: 'ارزش بازار',
      selector: (row) => row.n3,
      sortable: true,
    },
  ],
};

export const orderWatch = {
  header: [
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
      name: 'ارزش معاملات',
      selector: (row) => row.n2,
      sortable: true,
    },
    {
      name: 'آخرین',
      selector: (row) => row.n3,
      sortable: true,
    },
    {
      name: 'درصد',
      selector: (row) => row.n4,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n4} />,
    },
    {
      name: 'پایانی',
      selector: (row) => row.n5,
      sortable: true,
    },
    {
      name: 'درصد',
      selector: (row) => row.n6,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n6} />,
    },
    {
      name: 'نوسان',
      selector: (row) => row.n7,
      sortable: true,
    },
    {
      name: 'حجم سفارش های خرید',
      selector: (row) => row.n8,
      sortable: true,
    },
    {
      name: 'حجم سفارش های فروش',
      selector: (row) => row.n9,
      sortable: true,
    },
    {
      name: 'ارزش سفارش های خرید',
      selector: (row) => row.n10,
      sortable: true,
    },
    {
      name: 'ارزش سفارش های فروش',
      selector: (row) => row.n11,
      sortable: true,
    },
    {
      name: 'تراز سفارش ها',
      selector: (row) => row.n12,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n12} />,
    },
  ],
};

export const extraTops = [
  {
    name: 'ردیف',
    selector: (row) => row.id,
    omit: true,
  },
  {
    name: 'نماد',
    selector: (row) => row.n0,
    sortable: true,
  },
  {
    name: 'سقف قیمتی سهم',
    selector: (row) => row.n1,
    sortable: true,
  },
  {
    name: 'قیمت امروز',
    selector: (row) => row.n2,
    sortable: true,
  },
  {
    name: 'تاریخ رسیدن به قله',
    selector: (row) => row.n3,
    sortable: true,
  },
  {
    name: 'درصد ریزش از سقف',
    selector: (row) => row.n4,
    cell: (row) => <ColorizeTag row={row.n4} />,
    sortable: true,
  },
];

function floorNumber(row) {
  if (row > 1000000000) {
    return (row / 1000000000).toFixed(2) + 'B';
  } else if (row > 1000000) {
    return (row / 1000000).toFixed(2) + 'M';
  } else {
    return row;
  }
}
