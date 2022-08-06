import {ColorizeTag,LinkTag} from '../../../../helper';

export const header = [
  {
    name: "حجم",
    selector: (row) => row.n0,
    sortable: true,
  },
  {
    name: "ارزش",
    selector: (row) => row.n1,
    sortable: true,
  },
  {
    name: "اولین",
    selector: (row) => row.n2,
    sortable: true,
  },
  {
    name: "بیشترین",
    selector: (row) => row.n3,
    sortable: true,
  },
  {
    name: "کمترین",
    selector: (row) => row.n4,
    sortable: true,
  },
  {
    name: "آخرین",
    selector: (row) => row.n5,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n5} />,
  },
  {
    name: "قیمت پایانی",
    selector: (row) => row.n6,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n6} />,
  },
  {
    name: "قیمت دیروز",
    selector: (row) => row.n7,
    sortable: true,
  },
  {
    name: "حجم مبنا",
    selector: (row) => row.n8,
    sortable: true,
  },
  {
    name: "تعداد معاملات",
    selector: (row) => row.n9,
    sortable: true,
  }
]