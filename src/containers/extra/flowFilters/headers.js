import { ColorizeTag, LinkTag } from '../../../helper';
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
    name: 'حجم معاملات',
    selector: (row) => row.n2,
    sortable: true,
  },
  {
    name: 'ارزش معاملات',
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
    cell: (row) => <ColorizeTag row={row.n5} />
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
    cell: (row) => <ColorizeTag row={row.n7} />
  },
  {
    name: 'بازدهی 5 روزه',
    selector: (row) => row.n8,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n8} />,
  },
  {
    name: 'بازدهی 20 روزه',
    selector: (row) => row.n9,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n9} />
  },
];
