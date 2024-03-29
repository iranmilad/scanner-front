import { ColorizeTag, LinkTag, ColorizeTagArrow } from '../../../helper';
import { Link } from 'react-router-dom';

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
    name: 'نمودار جریانات نقدیندگی',
    selector: (row) => row.n1,
    cell: (row) => (
      <Link to={`/stock/chart/${row.n1}`}>
        <svg
          className="w-3 h-3 fill-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M64 400C64 408.8 71.16 416 80 416H480C497.7 416 512 430.3 512 448C512 465.7 497.7 480 480 480H80C35.82 480 0 444.2 0 400V64C0 46.33 14.33 32 32 32C49.67 32 64 46.33 64 64V400zM439 279L406.6 246.6L326.6 326.6C314.1 339.1 293.9 339.1 281.4 326.6L208 253.3L150.6 310.6C138.1 323.1 117.9 323.1 105.4 310.6C92.88 298.1 92.88 277.9 105.4 265.4L185.4 185.4C197.9 172.9 218.1 172.9 230.6 185.4L304 258.7L361.4 201.4L328.1 168.1C313.9 153.9 324.6 128 345.9 128H456C469.3 128 480 138.7 480 152V262.1C480 283.4 454.1 294.1 439 279L439 279z" />
        </svg>
      </Link>
    ),
  },
  {
    name: 'حجم',
    selector: (row) => row.n2,
    sortable: true,
  },
  {
    name: 'ارزش',
    selector: (row) => row.n3,
    sortable: true,
  },
  {
    name: 'آخرین',
    selector: (row) => row.n4,
    sortable: true,
  },
  {
    name: 'درصد',
    selector: (row) => row.n5,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n5} />,
  },
  {
    name: 'پایانی',
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
    name: 'قدرت خرید - میانگین 5 روزه به 20 روزه',
    selector: (row) => row.n8,
    sortable: true,
    cell: (row) => <ColorizeTagArrow row={row.n8} />,
  },
  {
    name: 'قدرت خرید - میانگین 5 روزه به 60 روزه',
    selector: (row) => row.n9,
    sortable: true,
    cell: (row) => <ColorizeTagArrow row={row.n9} />,
  },
  {
    name: 'قدرت خرید - میانگین 20 روزه به 60 روزه',
    selector: (row) => row.n10,
    sortable: true,
    cell: (row) => <ColorizeTagArrow row={row.n10} />,
  },
  {
    name: 'ورود پول - میانگین 5 روزه به 20 روزه',
    selector: (row) => row.n11,
    sortable: true,
    cell: (row) => <ColorizeTagArrow row={row.n11} />,
  },
  {
    name: 'ورود پول - میانگین 5 روزه به 60 روزه',
    selector: (row) => row.n12,
    sortable: true,
    cell: (row) => <ColorizeTagArrow row={row.n12} />,
  },
  {
    name: 'ورود پول - میانگین 20 روزه به 60 روزه',
    selector: (row) => row.n13,
    sortable: true,
    cell: (row) => <ColorizeTagArrow row={row.n13} />,
  },
  {
    name: 'ارزش معاملات - میانگین 5 روزه به 20 روزه',
    selector: (row) => row.n14,
    sortable: true,
    cell: (row) => <ColorizeTagArrow row={row.n14} />,
  },
  {
    name: 'ارزش معاملات - میانگین 5 روزه به 60 روزه',
    selector: (row) => row.n15,
    sortable: true,
    cell: (row) => <ColorizeTagArrow row={row.n15} />,
  },
  {
    name: 'ارزش معاملات - میانگین 20 روزه به 60 روزه',
    selector: (row) => row.n16,
    sortable: true,
    cell: (row) => <ColorizeTagArrow row={row.n16} />,
  },
  {
    name: 'سرانه خرید - میانگین 5 روزه به 20 روزه',
    selector: (row) => row.n17,
    sortable: true,
    cell: (row) => <ColorizeTagArrow row={row.n17} />,
  },
  {
    name: 'سرانه خرید - میانگین 5 روزه به 60 روزه',
    selector: (row) => row.n18,
    sortable: true,
    cell: (row) => <ColorizeTagArrow row={row.n18} />,
  },
  {
    name: 'سرانه خرید - میانگین 20 روزه به 60 روزه',
    selector: (row) => row.n19,
    sortable: true,
    cell: (row) => <ColorizeTagArrow row={row.n19} />,
  },
  {
    name: 'سرانه فروش - میانگین 5 روزه به 20 روزه',
    selector: (row) => row.n20,
    sortable: true,
    cell: (row) => <ColorizeTagArrow row={row.n20} />,
  },
  {
    name: 'سرانه فروش - میانگین 5 روزه به 60 روزه',
    selector: (row) => row.n21,
    sortable: true,
    cell: (row) => <ColorizeTagArrow row={row.n21} />,
  },
  {
    name: 'سرانه فروش - میانگین 20 روزه به 60 روزه',
    selector: (row) => row.n22,
    sortable: true,
    cell: (row) => <ColorizeTagArrow row={row.n22} />,
  },
  {
    name: 'بازدهی 5 روزه',
    selector: (row) => row.n23,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n23} />,
  },
  {
    name: 'بازدهی 20 روزه',
    selector: (row) => row.n24,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n24} />,
  },
];
