import {ColorizeTag} from "../../../helper"

export const header = [
  {
    name: "ردیف",
    selector: (row) => row.n0,
    sortable: true,
  },
  {
    name: "تاریخ",
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
  },
  {
    name: "درصد",
    selector: (row) => row.n6,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n6} />
  },
  {
    name: "پایانی",
    selector: (row) => row.n7,
    sortable: true,
  },
  {
    name: "درصد",
    selector: (row) => row.n8,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n8} />
  },
  {
    name: "نوسان",
    selector: (row) => row.n9,
    sortable: true,
  },
  {
    name: "حجم",
    selector: (row) => row.n10,
    sortable: true,
  },
  {
    name: "ارزش",
    selector: (row) => row.n11,
    sortable: true,
  },
  {
    name: "حجم به 5 روز",
    selector: (row) => row.n12,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n12} />
  },
  {
    name: "حجم به 20 روز",
    selector: (row) => row.n13,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n13} />
  },
  {
    name: "درصد خرید حقیقی",
    selector: (row) => row.n14,
    sortable: true,
  },
  {
    name: "درصد فروش حقیقی",
    selector: (row) => row.n15,
    sortable: true,
  },
  {
    name: "سرانه خرید",
    selector: (row) => row.n16,
    sortable: true,
  },
  {
    name: "حجم به 5 روزه",
    selector: (row) => row.n17,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n17} />
  },
  {
    name: "حجم به 20 روزه",
    selector: (row) => row.n18,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n18} />
  },
  {
    name: "سرانه فروش",
    selector: (row) => row.n19,
    sortable: true,
  },
  {
    name: "حجم به 5 روزه",
    selector: (row) => row.n20,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n20} />
  },
  {
    name: "حجم به 20 روزه",
    selector: (row) => row.n21,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n21} />
  },
  {
    name: "قدرت خرید",
    selector: (row) => row.n22,
    sortable: true,
  },
  {
    name: "حجم به 5 روزه",
    selector: (row) => row.n23,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n23} />
  },
  {
    name: "حجم به 20 روزه",
    selector: (row) => row.n24,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n24} />
  },
  {
    name: "ورود پول",
    selector: (row) => row.n25,
    sortable: true,
  },
  {
    name: "حجم به 5 روزه",
    selector: (row) => row.n26,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n26} />
  },
  {
    name: "حجم به 20 روزه",
    selector: (row) => row.n27,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n27} />
  },
]