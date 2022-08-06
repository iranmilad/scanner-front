import {ColorizeTag,LinkTag} from '../../../../helper';

export const header = [
  {
    name: "تعداد خریدار",
    selector: (row) => row.n0,
    sortable: true,
  },
  {
    name: "حجم خرید",
    selector: (row) => row.n1,
    sortable: true,
  },
  {
    name: "ارزش خرید",
    selector: (row) => row.n2,
    sortable: true,
  },
  {
    name: "سرانه خرید",
    selector: (row) => row.n3,
    sortable: true,
  },
  {
    name: "قدرت خرید",
    selector: (row) => row.n4,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n4} />
  },
  {
    name: "سرانه فروش",
    selector: (row) => row.n5,
    sortable: true,
  },
  {
    name: "ارزش فروش",
    selector: (row) => row.n6,
    sortable: true,
  },
  {
    name: "حجم فروش",
    selector: (row) => row.n7,
    sortable: true,
  },
  {
    name: "تعداد فروشنده",
    selector: (row) => row.n8,
    sortable: true,
  },
  {
    name: "ورود پول",
    selector: (row) => row.n9,
    sortable: true,
    // cell: (row) => <ColorizeTag row={row.n9} />,
  },
]