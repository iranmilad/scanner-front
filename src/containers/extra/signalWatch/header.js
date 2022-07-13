import {ColorizeTag,LinkTag,ColorizeTagArrow} from '../../../helper';
import { Link } from 'react-router-dom';
import { BsGraphUp } from 'react-icons/bs';

/**
 * @param {Array} props
 * @param {object} props.headers
 */
export const header = [
  {
    name: 'نماد',
    selector: (row) => row.n0,
    sortable: true,
    cell: (row) => <LinkTag link="#" text={row.n0} />,
  },
  {
    name: 'نمودار جریانات نقدیندگی',
    selector: (row) => row.n1,
    cell: (row) => (
      <Link to={row.n1}>
        <BsGraphUp />
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
    name: "آخرین",
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
  }
    
]