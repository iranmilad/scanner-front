import Chart from "../components/Chart";

export default {
  title: "Chart",
  component: Chart,
}

const Template = (args) => <Chart {...args} />

export const Primary = Template.bind({});
Primary.args = {
  data: [
    {
      name: "Data",
      data: [
        2771.42,
        2991.21,
        3471.16,
        3681.88,
        2971.32,
        3203.96,
        2754.43,
        3174.13
      ]
    }
  ],
  isLoading:false,
  isFetcing: false,
  error: null,
  options:{
    chart: {
      type: "area",
      height: "100%",
      sparkline: {
        enabled: true
      }
    },
    xaxis: {
      type: "category",
      categories: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  },
  allow: null,
  type: "area",
}