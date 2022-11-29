import {ColorizeTag,LinkTag} from '../../../helper';


export const header= [
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
]