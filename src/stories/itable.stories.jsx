import ITable from "../components/ITable";
import {ColorizeTag} from "../helper"

export default {
  title: "ITable",
  component: ITable
}

const header = [
  {
    name: "شناسه",
    selector: (row) => row.id,
    omit: true
  },
  {
    name: 'نماد',
    selector: (row) => row.n0,
    sortable: true,
  },
  {
    name: 'نمودار جریانات نقدیندگی',
    selector: (row) => row.n1,
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
    name: 'بازدهی 5 روزه',
    selector: (row) => row.n8,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n8} />,
  },
  {
    name: 'بازدهی 20 روزه',
    selector: (row) => row.n9,
    sortable: true,
    cell: (row) => <ColorizeTag row={row.n9} />,
  },
]

const Template = (args) => <ITable {...args} />;

export const Empty = Template.bind({});

Empty.args = {
  title: "Empty table",
  isLoading: false
}

export const WidthData = Template.bind({});
WidthData.args = {
  title: "Table with data",
  
}