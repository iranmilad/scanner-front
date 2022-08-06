import {ColorizeTag} from "../../../helper";

export const bookMarkSummary = [
  {
    name: "تعداد",
    selector: (row) => row.n0,
    sortable: true,
  },
  {
    name: "ارزش",
    selector: (row) => row.n1,
    sortable: true,
  },
  {
    name: "حجم",
    selector: (row) => row.n2,
    sortable: true,
  },
  {
    name: "خرید",
    selector: (row) => row.n3,
    sortable: true,
  },
  {
    name: "فروش",
    selector: (row) => row.n4,
    sortable: true,
  },
  {
    name: "حجم",
    selector: (row) => row.n5,
    sortable: true,
  },
  {
    name: "ارزش",
    selector: (row) => row.n6,
    sortable: true,
  },
  {
    name: "تعداد",
    selector: (row) => row.n7,
    sortable: true,
  }
]

export const totlaBookMarkSummary = [
  {
    name: "تعداد",
    selector: (row) => row.n0,
    sortable: true,
  },
  {
    name: "ارزش",
    selector: (row) => row.n1,
    sortable: true,
  },
  {
    name: "حجم",
    selector: (row) => row.n2,
    sortable: true,
  },
  {
    name: "خرید",
    selector: (row) => row.n3,
    sortable: true,
  },
  {
    name: "تراز سفارش ها",
    selector: (row) => row.n4,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n4} />
  },
  {
    name: "فروش",
    selector: (row) => row.n5,
    sortable: true,
  },
  {
    name: "حجم",
    selector: (row) => row.n6,
    sortable: true,
  },
  {
    name: "ارزش",
    selector: (row) => row.n7,
    sortable: true,
  },
  {
    name: "تعداد",
    selector: (row) => row.n8,
    sortable: true,
  }
]

export const totalClientSummary = [
  {
    name: "تعداد",
    selector: (row) => row.n0,
    sortable: true,
  },
  {
    name: "ارزش",
    selector: (row) => row.n1,
    sortable: true,
  },
  {
    name: "حجم",
    selector: (row) => row.n2,
    sortable: true,
  },
  {
    name: "درصد خرید",
    selector: (row) => row.n3,
    sortable: true,
  },
  {
    name: "",
    selector: (row) => row.n4,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n4} />
  },
  {
    name: "درصد فروش",
    selector: (row) => row.n5,
    sortable: true,
  },
  {
    name: "حجم",
    selector: (row) => row.n6,
    sortable: true,
  },
  {
    name: "ارزش",
    selector: (row) => row.n7,
    sortable: true,
  },
  {
    name: "تعداد",
    selector: (row) => row.n8,
    sortable: true,
  }
];

export const statementPerdiod = [
  {
    name: "",
    selector: (row) => row.n0,
    sortable: true,
  },
  {
    name: "بازدهی",
    selector: (row) => row.n1,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n1} />
  },
  {
    name: "حجم میانگین",
    selector: (row) => row.n2,
    sortable: true,
  },
  {
    name: "نسبت حجم",
    selector: (row) => row.n3,
    sortable: true,
  },
  {
    name: "سرانه خرید",
    selector: (row) => row.n4,
    sortable: true,
  },
  {
    name: "سرانه فروش",
    selector: (row) => row.n5,
    sortable: true,
  },
  {
    name: "قدرت خرید",
    selector: (row) => row.n6,
    sortable: true,
  },
  {
    name: "حقوقی به حقیقی",
    selector: (row) => row.n7,
    sortable: true,
  },
  {
    name: "میانگین روزانه",
    selector: (row) => row.n8,
    sortable: true,
  },
  {
    name: "ورود پول",
    selector: (row) => row.n9,
    sortable: true,
  },
  {
    name: "میانگین روزانه",
    selector: (row) => row.n10,
    sortable: true,
  }
];

export const changePerfomance = [
  {
    name: "",
    selector: (row) => row.n0,
    sortable: true,
  },
  {
    name: "1 روزه",
    selector: (row) => row.n1,
    sortable: true,
  },
  {
    name: "هفتگی (5 روزه)",
    selector: (row) => row.n2,
    sortable: true,
  },
  {
    name: "ماهانه (20 روزه)",
    selector: (row) => row.n3,
    sortable: true,
  },
  {
    name: "سه ماهه (60 روزه)",
    selector: (row) => row.n4,
    sortable: true,
  },
  {
    name: "شش ماهه (120 روزه)",
    selector: (row) => row.n5,
    sortable: true,
  },
  {
    name: "سالانه (240 روزه)",
    selector: (row) => row.n6,
    sortable: true,
  }
];

export const combinationAssets = [
  {
    name: "",
    selector: (row) => row.n0,
    sortable: true,
  },
  {
    name: "",
    selector: (row) => row.n1,
    sortable: true,
  }
]