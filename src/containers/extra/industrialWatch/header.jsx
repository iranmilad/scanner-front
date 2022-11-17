import {ColorizeTag,LinkTag} from '../../../helper';

/**
 * @param {Array} props
 * @param {object} props.headers
 */
export const header = [
  {
    name: 'شناسه',
    selector: (row) => row.id,
    omit:true
  },
  {
    name: 'نام گروه',
    selector: (row) => row.n0,
    sortable: true,
    cell: (row) => <LinkTag link={`/industries/${row.id}`} text={row.n0} style={{width: "100px"}} />,
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
    name: 'بازدهی گروه (هم وزن)',
    selector: (row) => row.n8,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n8} />,
  },
  {
    name: 'ارزش معاملات نسبت به میانگین 5 روزه',
    selector: (row) => row.n9,
    sortable: true,
  },
  {
    name: 'ارزش معاملات نسبت به میانگین 20 روزه',
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
    name: 'قدرت خرید 20 روزه',
    selector: (row) => row.n15,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n15} />,
  },
  {
    name: 'درصد خرید حقیقی',
    selector: (row) => row.n16,
    sortable: true,
  },
  {
    name: 'درصد فروش حقیقی',
    selector: (row) => row.n17,
    sortable: true,
  },
  {
    name: 'ورود پول',
    selector: (row) => row.n18,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n18} />,
  },
  {
    name: 'میانگین 5 روزه ورود پول',
    selector: (row) => row.n19,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n19} />,
  },
  {
    name: 'میانگین 20 روزه ورود پول',
    selector: (row) => row.n20,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n20} />,
  }
    
]