import { ColorizeTag, LinkTag } from '../../../../helper';

export const header = [
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
    name: 'اولین',
    selector: (row) => row.n3,
    sortable: true,
  },
  {
    name: 'بیشترین',
    selector: (row) => row.n4,
    sortable: true,
  },
  {
    name: 'کمترین',
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
    name: 'سرانه خرید',
    selector: (row) => row.n10,
    sortable: true,
  },
  {
    name: 'سرانه فروش',
    selector: (row) => row.n11,
    sortable: true,
  },
  {
    name: 'قدرت خرید',
    selector: (row) => row.n12,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n12} />,
  },
  {
    name: 'ورود پول حقیقی',
    selector: (row) => row.n13,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n13} />,
  },
  {
    name: 'ارزش سفارش های خرید',
    selector: (row) => row.n14,
    sortable: true,
  },
  {
    name: 'ارزش سفارش های فروش',
    selector: (row) => row.n15,
    sortable: true,
  },
];
