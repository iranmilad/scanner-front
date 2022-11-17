import { Link } from 'react-router-dom';
import { ColorizeTag, LinkTag } from './index';

function openSubModal({label,id,pointIndex}){
  window.chartable.setChart({ label, id ,pointIndex});
  window.chartable.setModal();
}

export const totalSummeryGroupState = {
  header: [
    {
      name: 'شناسه',
      selector: row => row.id,
      omit: true
    },
    {
      name: 'نام گروه',
      selector: (row) => row.n0,
      cell: row => <span className='text-blue-500 cursor-pointer' onClick={()=> openSubModal({label:row.n0,id:"tb-GroupState",pointIndex:row.id})}>{row.n0}</span>
    },
    {
      name: 'حجم معاملات',
      selector: (row) => row.n1,
      sortable: true
    },
    {
      name: 'ارزش معاملات',
      selector: (row) => row.n2,
      sortable: true
    },
    {
      name: 'سرانه خرید حقیق',
      selector: (row) => row.n3,
      sortable: true
    },
    {
      name: 'سرانه فروش حقیقی',
      selector: (row) => row.n4,
      sortable: true
    },
    {
      name: 'قدرت خرید',
      selector: (row) => row.n5,
      cell: (row) => <ColorizeTag row={row.n5} />,
      sortable: true
    },
    {
      name: 'ورود پول حقیقی',
      selector: (row) => row.n6,
      cell: (row) => <ColorizeTag row={row.n6} />,
      sortable: true
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
      grow: 2
    },
    {
      name: 'حجم معاملات',
      selector: (row) => row.n1,
      sortable: true,
      minWidth: "0px"
    },
    {
      name: 'ارزش معاملات',
      selector: (row) => row.n2,
      sortable: true,
      minWidth: "0px"
    },
    {
      name: 'ارزش خرید حقیقی',
      selector: (row) => row.n3,
      sortable: true,
      minWidth: "0px"
    },
    {
      name: 'ارزش فروش حقیقی',
      selector: (row) => row.n4,
      sortable: true,
      minWidth: "0px"
    },
    {
      name: 'ارزش سفارش های خرید',
      selector: (row) => row.n5,
      sortable: true,
      minWidth: "0px"
    },
    {
      name: 'ارزش سفارش های فروش',
      selector: (row) => row.n6,
      sortable: true,
      minWidth: "0px"
    },
    {
      name: 'تراز سفارش ها',
      selector: (row) => row.n7,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n7} />,
      minWidth: "0px"
    },
    {
      name: 'هم وزن',
      selector: (row) => row.n8,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n8} />,
      minWidth: "0px"
    },
    {
      name: 'سرانه خرید',
      selector: (row) => row.n9,
      sortable: true,
      minWidth: "0px"
    },
    {
      name: 'سرانه فروش',
      selector: (row) => row.n10,
      sortable: true,
      minWidth: "0px"
    },
    {
      name: 'قدرت خرید',
      selector: (row) => row.n11,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n11} />,
      minWidth: "0px"
    },
    {
      name: 'درصد خرید حقیقی',
      selector: (row) => row.n12,
      sortable: true,
      minWidth: "0px"
    },
    {
      name: 'درصد فروش حقیقی',
      selector: (row) => row.n13,
      sortable: true,
      minWidth: "0px"
    },
    {
      name: 'ورود پول حقیقی',
      selector: (row) => row.n14,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n14} />,
      minWidth: "0px"
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
      cell: (row) => <LinkTag link={`/stock/${row.id}`} text={row.n0} />,
      minWidth: "50px"
    },
    {
      name: 'حجم معاملات',
      selector: (row) => row.n1,
      sortable: true,
      minWidth: "70px"
    },
    {
      name: 'میانگین حجم 20 روزه',
      selector: (row) => row.n2,
      sortable: true,
      minWidth: "0px"
    },
    {
      name: 'ارزش معاملات',
      selector: (row) => row.n3,
      sortable: true,
      minWidth: "0px"
    },
    {
      name: 'آخرین',
      selector: (row) => row.n4,
      sortable: true,
      minWidth: "0px"
    },
    {
      name: 'درصد',
      selector: (row) => row.n5,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n5} />,
      minWidth: "0px"
    },
    {
      name: 'پایانی',
      selector: (row) => row.n6,
      sortable: true,
      minWidth: "0px"
    },
    {
      name: 'درصد',
      selector: (row) => row.n7,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n7} />,
      minWidth: "0px"
    },
    {
      name: 'نوسان',
      selector: (row) => row.n8,
      sortable: true,
      minWidth: "0px"
    },
    {
      name: 'سرانه خرید',
      selector: (row) => row.n9,
      sortable: true,
      minWidth: "0px"
    },
    {
      name: 'سرانه فروش',
      selector: (row) => row.n10,
      sortable: true,
      minWidth: "0px"
    },
    {
      name: 'قدرت خرید',
      selector: (row) => row.n11,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n11} />,
      minWidth: "0px"
    },
    {
      name: 'قدرت خرید 5 روزه',
      selector: (row) => row.n12,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n12} />,
      minWidth: "0px"
    },
    {
      name: 'ورود پول',
      selector: (row) => row.n13,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n13} />,
      minWidth: "0px"
    },
    {
      name: 'بازدهی 5 روزه',
      selector: (row) => row.n14,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n14} />,
      minWidth: "0px"
    },
    {
      name: 'بازدهی 20 روزه',
      selector: (row) => row.n15,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n15} />,
      minWidth: "0px"
    },
    {
      name: 'بازدهی 60 روزه',
      selector: (row) => row.n16,
      sortable: true,
      cell: (row) => <ColorizeTag row={row.n16} />,
      minWidth: "0px"
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
      cell: (row) => <LinkTag link={`/stock/${row.id}`} text={row.n0} />,
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
      minWidth: "30px"
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
      minWidth: "30px"
    },
    {
      name: 'ارزش به 5 روز',
      selector: (row) => row.n3,
      minWidth: "10px"
    },
    {
      name: 'ارزش به 20 روز',
      selector: (row) => row.n4,
      minWidth: "60px"
    },
    {
      name: 'ارزش خرید حقیقی',
      selector: (row) => row.n5,
      minWidth: "60px"
    },
    {
      name: 'ارزش فروش حقیقی',
      selector: (row) => row.n6,
      minWidth: "60px"
    },
    {
      name: 'سرانه خرید',
      selector: (row) => row.n7,
      minWidth: "60px"
    },
    {
      name: '5 روز',
      selector: (row) => row.n8,
      minWidth: "60px"
    },
    {
      name: '20 روز',
      selector: (row) => row.n9,
      minWidth: "60px"
    },
    {
      name: 'سرانه فروش',
      selector: (row) => row.n10,
      minWidth: "60px"
    },
    {
      name: '5 روز',
      selector: (row) => row.n11,
      minWidth: "50px"
    },
    {
      name: '20 روز',
      selector: (row) => row.n12,
      minWidth: "50px"
    },
    {
      name: 'قدرت خرید',
      selector: (row) => row.n13,
      cell: (row) => <ColorizeTag row={row.n13} />,
      minWidth: "50px"
    },
    {
      name: '5 روز',
      selector: (row) => row.n14,
      cell: (row) => <ColorizeTag row={row.n14} />,
      minWidth: "50px"
    },
    {
      name: '20 روز',
      selector: (row) => row.n15,
      cell: (row) => <ColorizeTag row={row.n15} />,
      minWidth: "50px"
    },
    {
      name: 'ورود پول',
      selector: (row) => row.n16,
      cell: (row) => <ColorizeTag row={row.n16} />,
      minWidth: "50px"
    },
    {
      name: '5 روز',
      selector: (row) => row.n17,
      cell: (row) => <ColorizeTag row={row.n17} />,
      minWidth: "50px"
    },
    {
      name: '20 روز',
      selector: (row) => row.n18,
      cell: (row) => <ColorizeTag row={row.n18} />,
      minWidth: "50px"
    },
    {
      name: 'شاخص گروه',
      selector: (row) => row.n18,
      cell: (row) => <ColorizeTag row={row.n19} />,
      minWidth: "50px"
    },
  ],
};

export const industries_history_type_2 = {
  header: [
    {
      name: 'ردیف',
      selector: (row) => row.n0,
      minWidth: "30px"
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
      minWidth: "30px"
    },
    {
      name: 'ارزش به 5 روز',
      selector: (row) => row.n3,
      minWidth: "10px"
    },
    {
      name: 'ارزش به 20 روز',
      selector: (row) => row.n4,
      minWidth: "60px"
    },
    {
      name: 'ارزش خرید حقیقی',
      selector: (row) => row.n5,
      minWidth: "60px"
    },
    {
      name: 'ارزش فروش حقیقی',
      selector: (row) => row.n6,
      minWidth: "60px"
    },
    {
      name: 'کد های خریدار',
      selector: (row) => row.n7,
      minWidth: "60px"
    },
    {
      name: 'کد های فروشنده',
      selector: (row) => row.n8,
      minWidth: "60px"
    },
    {
      name: 'سرانه خرید',
      selector: (row) => row.n9,
      minWidth: "60px"
    },
    {
      name: '5 روز',
      selector: (row) => row.n10,
      minWidth: "60px"
    },
    {
      name: '20 روز',
      selector: (row) => row.n11,
      minWidth: "60px"
    },
    {
      name: 'سرانه فروش',
      selector: (row) => row.n12,
      minWidth: "50px"
    },
    {
      name: '5 روز',
      selector: (row) => row.n13,
      minWidth: "50px"
    },
    {
      name: '20 روز',
      selector: (row) => row.n14,
      minWidth: "50px"
    },
    {
      name: 'قدرت خرید',
      selector: (row) => row.n15,
      cell: (row) => <ColorizeTag row={row.n15} />,
      minWidth: "50px"
    },
    {
      name: '5 روز',
      selector: (row) => row.n16,
      cell: (row) => <ColorizeTag row={row.n16} />,
      minWidth: "50px"
    },
    {
      name: '20 روز',
      selector: (row) => row.n17,
      cell: (row) => <ColorizeTag row={row.n17} />,
      minWidth: "50px"
    },
    {
      name: 'ورود پول',
      selector: (row) => row.n18,
      cell: (row) => <ColorizeTag row={row.n18} />,
      minWidth: "50px"
    },
    {
      name: '5 روز',
      selector: (row) => row.n19,
      cell: (row) => <ColorizeTag row={row.n19} />,
      minWidth: "50px"
    },
    {
      name: '20 روز',
      selector: (row) => row.n20,
      cell: (row) => <ColorizeTag row={row.n20} />,
      minWidth: "50px"
    },
    {
      name: 'شاخص کل',
      selector: (row) => row.n21,
      minWidth: "50px"
    },
    {
      name: 'شاخص هم وزن',
      selector: (row) => row.n22,
      minWidth: "50px"
    },
  ],
};

export const marketValues = {
  header: [
    {
      name: 'شناسه',
      selector: (row) => row.id,
      omit: true,
    },
    {
      name: 'رتبه',
      selector: (row) => row.colid,
      sortable: true,
    },
    {
      name: 'نماد',
      selector: (row) => row.n0,
      sortable: true,
      cell: (row) => <LinkTag link={`/stock/${row.id}`} text={row.n0} />,
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
      name: 'شناسه',
      selector: (row) => row.id,
      omit: true,
    },
    {
      name: 'نماد',
      selector: (row) => row.n0,
      sortable: true,
      cell: (row) => <LinkTag link={`/stock/${row.id}`} text={row.n0} />,
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
