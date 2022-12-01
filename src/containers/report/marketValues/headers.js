import {LinkTag} from '../../../helper';


/**
 * @param {Array} props
 * @param {object} props.headers
 */
export const header = [
    {
      name: 'شناسه',
      selector: (row) => row.id,
      omit: true,
    },
    {
      name: 'رتبه',
      selector: (row) => row.colid,
      sortable: true,
    },
    {
      name: 'نماد',
      selector: (row) => row.n0,
      sortable: true,
      cell: (row) => <LinkTag link={`/stock/${row.id}`} text={row.n0} />,
    },
    {
      name: 'قیمت هر سهم',
      selector: (row) => row.n1,
      sortable: true,
    },
    {
      name: 'تعداد سهام',
      selector: (row) => row.n2,
      sortable: true,
    },
    {
      name: 'ارزش بازار',
      selector: (row) => row.n3,
      sortable: true,
    },
]