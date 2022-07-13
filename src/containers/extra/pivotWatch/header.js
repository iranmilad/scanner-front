import {ColorizeTag,LinkTag} from '../../../helper';
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
    name: 'ارزش معاملات',
    selector: (row) => row.n2,
    sortable: true,
  },
  {
    name: 'ارزش معاملات به میانگین 5 روز',
    selector: (row) => row.n3,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n3} />,
  },
  {
    name: 'ارزش معاملات به میانگین 10 روز',
    selector: (row) => row.n4,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n4} />,
  },
  {
    name: 'آخرین',
    selector: (row) => row.n5,
    sortable: true,
  },
  {
    name: 'درصد',
    selector: (row) => row.n6,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n6} />
  },
  {
    name: 'پایانی',
    selector: (row) => row.n7,
    sortable: true,
  },
  {
    name: 'درصد',
    selector: (row) => row.n8,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n8} />
  },
  {
    name: 'سقف قیمتی',
    selector: (row) => row.n9,
    sortable: true,
  },
  {
    name: 'درصد فاصله',
    selector: (row) => row.n10,
    sortable: true,
  },
  {
    name: 'نخستین حمایت',
    selector: (row) => row.n11,
    sortable: true,
  },
  {
    name: 'درصد فاصله',
    selector: (row) => row.n12,
    sortable: true,
  },
  {
    name: 'دومین حمایت',
    selector: (row) => row.n13,
    sortable: true,
  },
  {
    name: 'درصد فاصله',
    selector: (row) => row.n14,
    sortable: true,
  },
  {
    name: 'نخستین مقاومت',
    selector: (row) => row.n15,
    sortable: true,
  },
  {
    name: 'درصد فاصله',
    selector: (row) => row.n16,
    sortable: true,
  },
  {
    name: 'دومین مقاومت',
    selector: (row) => row.n17,
    sortable: true,
  },
  {
    name: 'درصد فاصله',
    selector: (row) => row.n18,
    sortable: true,
  },
  {
    name: 'قدرت خرید',
    selector: (row) => row.n19,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n19} />,
  },
  {
    name: 'قدرت خرید 5 روزه',
    selector: (row) => row.n20,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n20} />,
  },
  {
    name: 'قدرت خرید 10 روزه',
    selector: (row) => row.n21,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n21} />,
  },
  {
    name: 'ورود پول',
    selector: (row) => row.n22,
    sortable: true,
    cell: (row) => <ColorizeTag style={{width: "270px",textAlign:"center"}} row={row.n22} />,
  },
  {
    name: 'بازدهی 10 روزه',
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
  {
    name: 'میانگین متحرک 200 روزه',
    selector: (row) => row.n25,
    sortable: true,
  },
  {
    name: 'درصد فاصله',
    selector: (row) => row.n26,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n26} />,
  }
    
]