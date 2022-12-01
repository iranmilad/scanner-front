import {ColorizeTag,LinkTag} from "../../helper"

/**
 * @param {Array} props
 * @param {object} props.headers
 */
export const header = [
  {
    name: 'ردیف',
    selector: (row) => row.id,
    omit: true,
  },
  {
    name: 'نماد',
    selector: (row) => row.n0,
    sortable: true,
    cell: (row) => <LinkTag link={`/stock/${row.id}`} text={row.n0} />
  },
  {
    name: 'سقف قیمتی سهم',
    selector: (row) => row.n1,
    sortable: true,
  },
  {
    name: 'قیمت امروز',
    selector: (row) => row.n2,
    sortable: true,
  },
  {
    name: 'تاریخ رسیدن به قله',
    selector: (row) => row.n3,
    sortable: true,
  },
  {
    name: 'درصد ریزش از سقف',
    selector: (row) => row.n4,
    cell: (row) => <ColorizeTag row={row.n4} />,
    sortable: true,
  },
]