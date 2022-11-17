import { ColorizeTag, LinkTag } from '../../../helper';

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
    name: 'آر اس آی',
    selector: (row) => row.n8,
    sortable: true,
  },
  {
    name: 'استوکاستیک',
    selector: (row) => row.n9,
    sortable: true,
  },
  {
    name: 'استوکاستیک سیگنال',
    selector: (row) => row.n10,
    sortable: true,
  },
  {
    name: 'سی سی آی',
    selector: (row) => row.n11,
    sortable: true,
  },
  {
    name: 'adx',
    selector: (row) => row.n12,
    sortable: true,
  },
  {
    name: '+di',
    selector: (row) => row.n13,
    sortable: true,
  },
  {
    name: '-di',
    selector: (row) => row.n14,
    sortable: true,
  },
  {
    name: 'مکدی',
    selector: (row) => row.n15,
    sortable: true,
  },
  {
    name: 'سیگنال مکدی',
    selector: (row) => row.n16,
    sortable: true,
  },
  {
    name: 'تنکان سن',
    selector: (row) => row.n17,
    sortable: true,
  },
  {
    name: 'کیجون سن',
    selector: (row) => row.n18,
    sortable: true,
  },
  {
    name: 'سنکو اسپن A',
    selector: (row) => row.n19,
    sortable: true,
  },
  {
    name: 'سنکو اسپن B',
    selector: (row) => row.n20,
    sortable: true,
  },
  {
    name: 'میانگین 10 روزه نمایی',
    selector: (row) => row.n21,
    sortable: true,
  },
  {
    name: 'میانگین 20 روزه نمایی',
    selector: (row) => row.n22,
    sortable: true,
  },
];
