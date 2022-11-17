import {ColorizeTag,LinkTag} from '../../../helper';

/**
 * @param {Array} props
 * @param {object} props.headers
 */
export const header = [
  {
    name: "شناسه",
    selector: (row) => row.id,
    omit: true
  },
  {
    name: 'نماد',
    selector: (row) => row.n0,
    sortable: true,
    cell: (row) => <LinkTag link={`/stock/${row.id}`} text={row.n0} />,
  },
  {
    name: 'حجم',
    selector: (row) => row.n1,
    sortable: true,
  },
  {
    name: 'ارزش',
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
    name: 'ارزش به میانگین 5 روزه',
    selector: (row) => row.n8,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n8} />,
  },
  {
    name: 'ارزش به میانگین 20 روزه',
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
    name: 'سرانه خرید 5 روزه',
    selector: (row) => row.n13,
    sortable: true,
  },
  {
    name: 'سرانه فروش 5 روزه',
    selector: (row) => row.n14,
    sortable: true,
  },
  {
    name: 'قدرت خرید 5 روزه',
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
    name: 'بازدهی 5 روزه',
    selector: (row) => row.n20,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n20} />,
  },
  {
    name: 'بازدهی 10 روزه',
    selector: (row) => row.n21,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n21} />,
  },
    
]