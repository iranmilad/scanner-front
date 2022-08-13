import { clockTime, randomNumber } from '../../helper';
import colors from 'tailwindcss/colors';

const ChartData = {
  A1: {
    title: 'محدوده قیمتی آخرین معاملات سهام حق تقدم و ص.سهامی',
    type: 'bar',
    auth: false,
    options: {
      plotOptions: {
        horizontal: false,
        bar: {
          distributed: true,
        },
      },
      legend: {
        show: false,
      },
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        events: {
          dataPointSelection: function (event, chartContext, config) {
            this.reducer.setModal({ show: true, content: 'tree' });
          },
        },
      },
      colors: [
        '#E91E63',
        '#E91E63',
        '#E91E63',
        '#E91E63',
        '#E91E63',
        '#E91E63',
        '#66DA26',
        '#66DA26',
        '#66DA26',
        '#66DA26',
        '#66DA26',
        '#66DA26',
      ],
      labels: [
        'پایین تر از منفی 5',
        'منفی 4 تا منفی 5',
        'منفی 3 تا منفی 4',
        'منفی 2 تا منفی 3',
        'منفی 1 تا منفی 2',
        'صفر تا منفی 1',
        'صفر تا مثبت 1',
        'مثبت 1 تا مثبت 2',
        'مثبت 2 تا مثبت 3',
        'مثبت 3 تا مثبت 4',
        'مثبت 4 تا مثبت 5',
        'بالاتر از مثبت 5',
      ],
      dataLabels: {
        style: {
          colors: [colors.slate[700]],
        },
      },
      xaxis: {
        labels: {
          show: true,
          offsetY: 70,
          offsetX: -25,
        },
        category: [
          'پایین تر از منفی 5',
          'منفی 4 تا منفی 5',
          'منفی 3 تا منفی 4',
          'منفی 2 تا منفی 3',
          'منفی 1 تا منفی 2',
          'صفر تا منفی 1',
          'صفر تا مثبت 1',
          'مثبت 1 تا مثبت 2',
          'مثبت 2 تا مثبت 3',
          'مثبت 3 تا مثبت 4',
          'مثبت 4 تا مثبت 5',
          'بالاتر از مثبت 5',
        ],
      },
    },
  },
  A2: {
    title: 'وضعیت آخرین معاملات سهام ، حق تقدم، ص.سهامی',
    type: 'polarArea',
    auth: false,
    options: {
      chart: {
        animations: {
          enabled: false,
        },
      },
      colors: ['#E91E63', '#66DA26'],
      labels: ['سهام منفی', 'سهام مثبت'],
      xaxis: {
        position: 'bottom',
      },
    },
  },
  A3: {
    title: 'روند تغییرات آخرین قیمت سهام حق تقدم، ص.سهامی',
    type: 'area',
    auth: false,
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
      },
      xaxis: {
        categories: clockTime(),
      },
      legend: {
        show: false,
      },
      colors: ['#E91E63', '#66DA26'],
      tooltip: {
        y: {
          formatter: function (val) {
            let value = val;
            if (val > 1000000000 || val < -1000000000) {
              value = `${Math.floor(val / 1000000000)} B`;
            } else if (val > 1000000 || val < -1000000) {
              value = `${Math.floor(val / 1000000)} M`;
            } else if (val > 1000 || val < -1000) {
              value = `${Math.floor(val / 1000)} K`;
            }
            return value;
          },
        },
      },
    },
  },
  A4: {
    title: 'ارزش کل سفارش های روی تابلو نماد های سهامی ، حق تقدم ، ص.سهامی',
    type: 'bar',
    auth: false,
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
      },
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 4,
          horizontal: true,
        },
      },
      colors: ['#E91E63', '#66DA26'],
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          let value = val;
          if (val > 1000000000 || val < -1000000000) {
            value = `${Math.floor(val / 1000000000)} B`;
          } else if (val > 1000000 || val < -1000000) {
            value = `${Math.floor(val / 1000000)} M`;
          } else if (val > 1000 || val < -1000) {
            value = `${Math.floor(val / 1000)} K`;
          }
          return value;
        },
      },
      xaxis: {
        floating: true,
        labels: {
          show: false,
        },
        categories: ['فروش', 'خرید'],
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
    },
  },
  A5: {
    title: 'تغیرات ورود پول اشخاص حقیقی به سهام ، حق تقدم و ص.سهامی',
    type: 'line',
    auth: false,
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
      },
      xaxis: {
        categories: clockTime(),
      },
      yaxis: {
        show: true,
        labels: {
          formatter: function (val) {
            let value = val;
            if (val > 1000000000 || val < -1000000000) {
              value = `${Math.floor(val / 1000000000)} B`;
            } else if (val > 1000000 || val < -1000000) {
              value = `${Math.floor(val / 1000000)} M`;
            } else if (val > 1000 || val < -1000) {
              value = `${Math.floor(val / 1000)} K`;
            }
            return value;
          },
        },
      },
    },
  },
  A6: {
    title: 'تغیرات ورود پول اشخاص حقیقی',
    type: 'line',
    auth: false,
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
      },
      colors: ['#ec4899'],
      xaxis: {
        categories: clockTime(),
      },
      yaxis: {
        show: true,
        labels: {
          formatter: function (val) {
            let value = val;
            if (val > 1000000000 || val < -1000000000) {
              value = `${Math.floor(val / 1000000000)} B`;
            } else if (val > 1000000 || val < -1000000) {
              value = `${Math.floor(val / 1000000)} M`;
            } else if (val > 1000 || val < -1000) {
              value = `${Math.floor(val / 1000)} K`;
            }
            return value;
          },
        },
      },
    },
  },
  A7: {
    title: 'تغییرات درصد خرید و فروش اشخاص حقیقی',
    type: 'line',
    auth: false,
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
      },
      xaxis: {
        categories: clockTime(),
      },
      yaxis: {
        show: true,
        labels: {
          formatter: function (val) {
            let value = val;
            if (val > 1000000000 || val < -1000000000) {
              value = `${Math.floor(val / 1000000000)} B`;
            } else if (val > 1000000 || val < -1000000) {
              value = `${Math.floor(val / 1000000)} M`;
            } else if (val > 1000 || val < -1000) {
              value = `${Math.floor(val / 1000)} K`;
            }
            return value;
          },
        },
      },
    },
  },
  A8: {
    title: 'ارزش معاملات در دقیقه',
    type: 'line',
    auth: false,
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
      },
      xaxis: {
        categories: clockTime(),
      },
      yaxis: {
        show: true,
        labels: {
          formatter: function (val) {
            let value = val;
            if (val > 1000000000 || val < -1000000000) {
              value = `${Math.floor(val / 1000000000)} B`;
            } else if (val > 1000000 || val < -1000000) {
              value = `${Math.floor(val / 1000000)} M`;
            } else if (val > 1000 || val < -1000) {
              value = `${Math.floor(val / 1000)} K`;
            }
            return value;
          },
        },
      },
    },
  },
  A9: {
    title: 'تغیرات ارزش کل سفارش ها به میلیارد تومان',
    type: 'line',
    auth: false,
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
      },
      xaxis: {
        categories: clockTime(),
      },
      yaxis: {
        show: true,
        labels: {
          formatter: function (val) {
            let value = val;
            if (val > 1000000000 || val < -1000000000) {
              value = `${Math.floor(val / 1000000000)} B`;
            } else if (val > 1000000 || val < -1000000) {
              value = `${Math.floor(val / 1000000)} M`;
            } else if (val > 1000 || val < -1000) {
              value = `${Math.floor(val / 1000)} K`;
            }
            return value;
          },
        },
      },
      legend: {
        show: false,
      },
      colors: ['#E91E63', '#66DA26'],
      tooltip: {
        y: {
          formatter: (value) => {
            return value;
          },
        },
      },
    },
  },
  A10: {
    title: 'تغیرات سرانه های خرید و فروش بازار',
    type: 'area',
    auth: false,
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
      },
      xaxis: {
        category: clockTime(),
      },
      legend: {
        show: false,
      },
      colors: ['#E91E63', '#66DA26'],
      tooltip: {
        y: {
          formatter: (value) => {
            return value;
          },
        },
      },
    },
  },
  A11: {
    title: 'آخرین قیمت به پایانی',
    type: 'bar',
    auth: false,
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
      },
      plotOptions: {
        horizontal: false,
        distributed: true,
      },
      colors: ['#66DA26', '#ff0'],
      labels: ['پایین تر', 'برابر', 'بالاتر'],
      dataLabels: {
        style: {
          colors: [colors.slate[700]],
        },
      },
      xaxis: {
        categories: ['پایین تر', 'برابر', 'بالاتر'],
      },
    },
  },
  A12: {
    title: 'کندل های امروز سهم ها',
    type: 'bar',
    auth: false,
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
      },
      plotOptions: {
        horizontal: false,
        distributed: true,
      },
      colors: ['#66DA26', '#ff0'],
      labels: ['نزولی', 'ثابت', 'صعودی'],
      dataLabels: {
        style: {
          colors: [colors.slate[700]],
        },
      },
      xaxis: {
        labels: {
          show: true,
        },
        categories: ['نزولی', 'ثابت', 'صعودی'],
      },
    },
  },
  A13: {
    title: 'تعداد صف های خرید و فروش',
    type: 'bar',
    auth: false,
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
      },
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 4,
          horizontal: true,
        },
      },
      legend: {
        show: false,
      },
      colors: [
        colors.rose[500],
        colors.pink[500],
        colors.orange[500],
        colors.emerald[500],
        colors.blue[500],
        colors.purple[500],
      ],
      dataLabels: {
        enabled: true,
        textAnchor: 'end',
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val;
        },
        style: {
          colors: ['#000'],
        },
      },
      xaxis: {
        labels: {
          show: true,
          offsetY: 108,
        },
        categories: [
          'صف فروش',
          'صف فروش کمتر از حجم مبنا',
          'صف فروش بدون معامله',
          'صف خرید',
          'صف خرید کمتر از حجم مبنا',
          'صف خرید بدون معامله',
        ],
      },
      yaxis: {
        show: false,
      },
    },
  },
  A14: {
    title: 'نقش حقیقی و حقوقی در معاملات',
    type: 'bar',
    auth: true,
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
      },
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 4,
          horizontal: true,
        },
      },
      colors: ['#E91E63', '#66DA26', colors.blue[500]],
      dataLabels: {
        enabled: true,
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val;
        },
      },
      xaxis: {
        labels: {
          enabled: false,
        },
        categories: ['حقیقی موثر', 'حقوقی موثر', 'مبادله عادی'],
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
    },
  },
  A15: {
    title: 'کندل های نوسانی',
    type: 'bar',
    auth: true,
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
      },
      plotOptions: {
        horizontal: false,
        distributed: true,
      },
      colors: ['#66DA26', '#ff0'],
      labels: ['سایه بالا', 'دوجی', 'سایه پایین'],
      dataLabels: {
        style: {
          colors: [colors.slate[700]],
        },
      },
      xaxis: {
        labels: {
          show: true,
          rotate: 0,
          // offsetY: 90
        },
        categories: ['سایه بالا', 'دوجی', 'سایه پایین'],
      },
    },
  },
  A16: {
    title: 'نماد های با نوسان بالا',
    type: 'bar',
    auth: true,
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
      },
      plotOptions: {
        horizontal: false,
        distributed: true,
      },
      colors: ['#66DA26', '#ff0'],
      labels: [
        'صف خرید به فروش',
        'مثبت به صف فروش',
        'صف خرید به منفی',
        'صف فروش مثبت',
        'منفی به صف خرید',
        'صف فروش به صف خرید',
      ],
      dataLabels: {
        style: {
          colors: [colors.slate[700]],
        },
      },
      xaxis: {
        labels: {
          show: true,
          offsetY: 90,
          offsetX: -25,
        },
        categories: [
          'صف خرید به فروش',
          'مثبت به صف فروش',
          'صف خرید به منفی',
          'صف فروش مثبت',
          'منفی به صف خرید',
          'صف فروش به صف خرید',
        ],
      },
    },
  },
  A17: {
    title: 'تغییرات ارزش معاملات خرد',
    type: 'area',
    auth: true,
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
      },
      xaxis: {
        categories: clockTime(),
      },
    },
  },
  A18: {
    title: 'تغیرات ارزش معاملات در هر دقیقه',
    type: 'area',
    auth: true,
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        labels: {
          show: true,
        },
        categories: clockTime(),
      },
      yaxis: {
        show: true,
        labels: {
          formatter: function (val) {
            let value = val;
            if (val > 1000000000 || val < -1000000000) {
              value = `${Math.floor(val / 1000000000)} B`;
            } else if (val > 1000000 || val < -1000000) {
              value = `${Math.floor(val / 1000000)} M`;
            } else if (val > 1000 || val < -1000) {
              value = `${Math.floor(val / 1000)} K`;
            }
            return value;
          },
        },
      },
    },
  },
  IndustryChart1: {
    title: 'محدوده قیمتی آخرین معامله نماد های گروه',
    type: 'bar',
    auth: false,
    options: {
      plotOptions: {
        horizontal: false,
        bar: {
          distributed: true,
        },
      },
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
      },
      colors: [
        '#E91E63',
        '#E91E63',
        '#E91E63',
        '#E91E63',
        '#E91E63',
        '#E91E63',
        '#66DA26',
        '#66DA26',
        '#66DA26',
        '#66DA26',
        '#66DA26',
        '#66DA26',
      ],
      labels: [
        'پایین تر از منفی 5',
        'منفی 4 تا منفی 5',
        'منفی 3 تا منفی 4',
        'منفی 2 تا منفی 3',
        'منفی 1 تا منفی 2',
        'صفر تا منفی 1',
        'صفر تا مثبت 1',
        'مثبت 1 تا مثبت 2',
        'مثبت 2 تا مثبت 3',
        'مثبت 3 تا مثبت 4',
        'مثبت 4 تا مثبت 5',
        'بالاتر از مثبت 5',
      ],
      dataLabels: {
        style: {
          colors: [colors.slate[700]],
        },
      },
      xaxis: {
        labels: {
          show: true,
          offsetY: 70,
          offsetX: -25,
        },
        category: [
          'پایین تر از منفی 5',
          'منفی 4 تا منفی 5',
          'منفی 3 تا منفی 4',
          'منفی 2 تا منفی 3',
          'منفی 1 تا منفی 2',
          'صفر تا منفی 1',
          'صفر تا مثبت 1',
          'مثبت 1 تا مثبت 2',
          'مثبت 2 تا مثبت 3',
          'مثبت 3 تا مثبت 4',
          'مثبت 4 تا مثبت 5',
          'بالاتر از مثبت 5',
        ],
      },
    },
  },
  IndustryChart2: {
    title: 'ارزش کل سفارش های روی تابلو گروه به میلیارد تومان',
    type: 'bar',
    auth: false,
    options: {
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 4,
          horizontal: true,
        },
        chart:{
          animations: {
            enabled: false,
          },
          fontFamily: 'Iran-sans',
        }
      },
      colors: ['#E91E63', '#66DA26'],
      dataLabels: {
        enabled: true,
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val;
        },
      },
      xaxis: {
        labels: {
          enabled: false,
        },
        categories: ['فروش', 'خرید'],
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
    },
  },
  IndustryChart3: {
    title: 'تغییرات سرانه های خرید و فروش گروه به میلیون تومان',
    type: 'line',
    auth: false,
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        type: 'line',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000,
          },
        },
        fontFamily: 'Iran-sans',
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        category: clockTime(),
      },
      legend: {
        show: false,
      },
      colors: ['#E91E63', '#66DA26'],
      tooltip: {
        y: {
          formatter: (value) => {
            return value;
          },
        },
      },
    },
  },
  IndustryChart4: {
    title: 'تغییرات ورود پول اشخاص حقیقی به میلیارد تومان',
    type: 'area',
    auth: false,
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
      },
      xaxis: {
        category: clockTime(),
      },
      legend: {
        show: false,
      },
      colors: [colors.blue[900]],
      tooltip: {
        y: {
          formatter: (value) => {
            return value;
          },
        },
      },
    },
  },
  IndustryChart5: {
    title: 'تغییرات ارزش کل سفارش ها به میلیارد تومان',
    type: 'line',
    auth: false,
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        type: 'line',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000,
          },
        },
        fontFamily: 'Iran-sans',
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        category: clockTime(),
      },
      legend: {
        show: false,
      },
      colors: ['#E91E63', '#66DA26'],
      tooltip: {
        y: {
          formatter: (value) => {
            return value;
          },
        },
      },
    },
  },
  dailyChart1: {
    title: 'تغییرات سرانه های خرید و فروش گروه به میلیون تومان',
    auth: false,
    options: {
      chart: {
        height: 350,
        type: 'line',
        fontFamily: 'Iran-sans',
        stacked: false,
        animations: {
          enabled: false,
        },
      },
      legend: {
        show: false,
      },
      stroke: {
        width: [0, 4],
        curve: 'smooth',
      },
      xaxis: {
        type: 'string',
        labels: {
          offsetX: -15,
          offsetY: 50,
        },
      },
      yaxis: {
        show: true,
        labels: {
          formatter: function (val) {
            let value = val;
            if (val > 1000000000 || val < -1000000000) {
              value = `${Math.floor(val / 1000000000)} B`;
            } else if (val > 1000000 || val < -1000000) {
              value = `${Math.floor(val / 1000000)} M`;
            } else if (val > 1000 || val < -1000) {
              value = `${Math.floor(val / 1000)} K`;
            }
            return value;
          },
        },
      },
    },
  },
  dailyChart2: {
    options: {
      chart: {
        type: 'bar',
        height: 350,
        fontFamily: 'Iran-sans',
        animations: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [
              {
                from: 0,
                to: 1000000000000000000000000,
                color: colors.green[500],
              },
              {
                from: -1000000000000000000,
                to: 0,
                color: colors.red[500],
              },
            ],
          },
          columnWidth: '90%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        show: true,
        labels: {
          formatter: function (val) {
            let value = val;
            if (val > 1000000000 || val < -1000000000) {
              value = `${Math.floor(val / 1000000000)} B`;
            } else if (val > 1000000 || val < -1000000) {
              value = `${Math.floor(val / 1000000)} M`;
            } else if (val > 1000 || val < -1000) {
              value = `${Math.floor(val / 1000)} K`;
            }
            return value;
          },
        },
      },
      xaxis: {
        type: 'string',
        labels: {
          rotate: -90,
        },
      },
    },
  },
  dailyChart3: {
    options: {
      chart: {
        type: 'bar',
        height: 350,
        fontFamily: 'Iran-sans',
        animations: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [
              {
                from: 0,
                to: 1000000000000000000000000,
                color: colors.sky[500],
              },
              {
                from: -1000000000000000000000000,
                to: 0,
                color: colors.indigo[500],
              },
            ],
          },
          columnWidth: '90%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'string',
        labels: {
          rotate: -90,
        },
      },
    },
  },
  MF1: {
    type: 'line',
    auth: false,
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'line',
        width: '100%',
        grid: {
          show: false,
        },
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'category',
        tickPlacement: 'on',
        categories: clockTime(),
        labels: {
          offsetX: -10,
        },
        rotateAlways: false,
        hideOverlappingLabels: true,
        offsetY: 30,
        axisBorder: {
          show: false,
        },
      },

      yaxis: {
        show: true,
        labels: {
          formatter: function (val) {
            let value = val;
            if (val > 1000000000 || val < -1000000000) {
              value = `${Math.floor(val / 1000000000)} B`;
            } else if (val > 1000000 || val < -1000000) {
              value = `${Math.floor(val / 1000000)} M`;
            } else if (val > 1000 || val < -1000) {
              value = `${Math.floor(val / 1000)} K`;
            }
            return value;
          },
        },
      },
      legend: {
        show: false,
      },
      colors: ['#E91E63', '#66DA26'],
    },
  },
  MF7: {
    type: 'line',
    auth: false,
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'line',
        width: '100%',
        grid: {
          show: false,
        },
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'category',
        tickPlacement: 'on',
        categories: clockTime(),
        labels: {
          offsetX: -10,
        },
        rotateAlways: false,
        hideOverlappingLabels: true,
        offsetY: 30,
        axisBorder: {
          show: false,
        },
      },

      yaxis: {
        show: true,
        labels: {
          formatter: function (val) {
            let value = val;
            if (val > 1000000000 || val < -1000000000) {
              value = `${Math.floor(val / 1000000000)} B`;
            } else if (val > 1000000 || val < -1000000) {
              value = `${Math.floor(val / 1000000)} M`;
            } else if (val > 1000 || val < -1000) {
              value = `${Math.floor(val / 1000)} K`;
            }
            return value;
          },
        },
      },
      legend: {
        show: false,
      },
      colors: ['#E91E63', '#66DA26'],
    },
  },
  MF13: {
    type: 'area',
    auth: false,
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'area',
        width: '100%',
        grid: {
          show: false,
        },
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'category',
        tickPlacement: 'on',
        categories: clockTime(),
        labels: {
          offsetX: -10,
        },
        rotateAlways: false,
        hideOverlappingLabels: true,
        offsetY: 30,
        axisBorder: {
          show: false,
        },
      },

      yaxis: {
        show: true,
        labels: {
          formatter: function (val) {
            let value = val;
            if (val > 1000000000 || val < -1000000000) {
              value = `${Math.floor(val / 1000000000)} B`;
            } else if (val > 1000000 || val < -1000000) {
              value = `${Math.floor(val / 1000000)} M`;
            } else if (val > 1000 || val < -1000) {
              value = `${Math.floor(val / 1000)} K`;
            }
            return value;
          },
        },
      },
      legend: {
        show: false,
      },
      colors: ['#E91E63', '#66DA26'],
    },
  },
  FX1: {
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        type: 'area',
        fontFamily: 'Iran-sans',
        group: 'symbol',
        id: 'chartFX1',
      },
      colors: [colors.pink[500]],
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        labels: {
          show: true,
          offsetY: 20,
        },
        categories: clockTime(),
      },
      yaxis: {
        show: true,
        labels: {
          formatter: function (val) {
            let value = val;
            if (val > 1000000000 || val < -1000000000) {
              value = `${Math.floor(val / 1000000000)} B`;
            } else if (val > 1000000 || val < -1000000) {
              value = `${Math.floor(val / 1000000)} M`;
            } else if (val > 1000 || val < -1000) {
              value = `${Math.floor(val / 1000)} K`;
            }
            return value;
          },
        },
      },
    },
  },
  FX2: {
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        type: 'line',
        fontFamily: 'Iran-sans',
        group: 'symbol',
        id: 'chartFX2',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      legend: {
        show: false,
      },
      xaxis: {
        labels: {
          show: true,
          offsetY: 20,
        },
        categories: clockTime(),
      },
      yaxis: {
        show: true,
        labels: {
          formatter: function (val) {
            let value = val;
            if (val > 1000000000 || val < -1000000000) {
              value = `${Math.floor(val / 1000000000)} B`;
            } else if (val > 1000000 || val < -1000000) {
              value = `${Math.floor(val / 1000000)} M`;
            } else if (val > 1000 || val < -1000) {
              value = `${Math.floor(val / 1000)} K`;
            }
            return value;
          },
        },
      },
    },
  },
  FX3: {
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        type: 'area',
        fontFamily: 'Iran-sans',
        group: 'symbol',
        id: 'chartFX3',
      },
      colors: [colors.indigo[500]],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        labels: {
          show: true,
          offsetY: 20,
        },
        categories: clockTime(),
      },
      yaxis: {
        show: true,
        labels: {
          formatter: function (val) {
            let value = val;
            if (val > 1000000000 || val < -1000000000) {
              value = `${Math.floor(val / 1000000000)} B`;
            } else if (val > 1000000 || val < -1000000) {
              value = `${Math.floor(val / 1000000)} M`;
            } else if (val > 1000 || val < -1000) {
              value = `${Math.floor(val / 1000)} K`;
            }
            return value;
          },
        },
      },
    },
  },
  FX4: {
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        type: 'area',
        fontFamily: 'Iran-sans',
        group: 'symbol',
        id: 'chartFX4',
      },
      colors: [colors.emerald[500]],
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        labels: {
          show: true,
          offsetY: 20,
        },
        categories: clockTime(),
      },
      yaxis: {
        show: true,
        labels: {
          formatter: function (val) {
            let value = val;
            if (val > 1000000000 || val < -1000000000) {
              value = `${Math.floor(val / 1000000000)} B`;
            } else if (val > 1000000 || val < -1000000) {
              value = `${Math.floor(val / 1000000)} M`;
            } else if (val > 1000 || val < -1000) {
              value = `${Math.floor(val / 1000)} K`;
            }
            return value;
          },
        },
      },
    },
  },
  FX5: {
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        type: 'line',
        fontFamily: 'Iran-sans',
        group: 'symbol',
        id: 'chartFX5',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      legend: {
        show: false,
      },
      xaxis: {
        labels: {
          show: true,
          offsetY: 20,
        },
        categories: clockTime(),
      },
      yaxis: {
        show: true,
        labels: {
          formatter: function (val) {
            let value = val;
            if (val > 1000000000 || val < -1000000000) {
              value = `${Math.floor(val / 1000000000)} B`;
            } else if (val > 1000000 || val < -1000000) {
              value = `${Math.floor(val / 1000000)} M`;
            } else if (val > 1000 || val < -1000) {
              value = `${Math.floor(val / 1000)} K`;
            }
            return value;
          },
        },
      },
    },
  },
  FX6: {
    options: {
      chart: {
        animations: {
          enabled: false,
        },
        type: 'bar',
        fontFamily: 'Iran-sans',
        group: 'symbol',
        id: 'chartFX6',
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        labels: {
          show: true,
          offsetY: 20,
        },
        categories: clockTime(),
      },
      yaxis: {
        show: true,
        labels: {
          formatter: function (val) {
            let value = val;
            if (val > 1000000000 || val < -1000000000) {
              value = `${Math.floor(val / 1000000000)} B`;
            } else if (val > 1000000 || val < -1000000) {
              value = `${Math.floor(val / 1000000)} M`;
            } else if (val > 1000 || val < -1000) {
              value = `${Math.floor(val / 1000)} K`;
            }
            return value;
          },
        },
      },
    },
  },
  sellPerfomance: {
    options: {
      chart: {
        height: 350,
        width: '100%',
        type: 'line',
        fontFamily: 'Iran-sans',
        stacked: false,
        animations: {
          enabled: false,
        },
      },
      legend: {
        show: false,
      },
      stroke: {
        width: [0, 4],
        curve: 'smooth',
      },
      xaxis: {
        type: 'string',
        labels: {
          offsetX: -15,
          offsetY: 50,
        },
      },
      yaxis: {
        show: true,
        labels: {
          formatter: function (val) {
            let value = val;
            if (val > 1000000000 || val < -1000000000) {
              value = `${Math.floor(val / 1000000000)} B`;
            } else if (val > 1000000 || val < -1000000) {
              value = `${Math.floor(val / 1000000)} M`;
            } else if (val > 1000 || val < -1000) {
              value = `${Math.floor(val / 1000)} K`;
            }
            return value;
          },
        },
      },
    },
  },
  perfomanceValue: {
    options: {
      chart: {
        height: 350,
        width: '100%',
        type: 'line',
        fontFamily: 'Iran-sans',
        stacked: false,
        animations: {
          enabled: false,
        },
      },
      legend: {
        show: false,
      },
      stroke: {
        width: [0, 4],
        curve: 'smooth',
      },
      xaxis: {
        type: 'string',
        labels: {
          offsetX: -15,
          offsetY: 50,
        },
      },
      yaxis: {
        show: true,
        labels: {
          formatter: function (val) {
            let value = val;
            if (val > 1000000000 || val < -1000000000) {
              value = `${Math.floor(val / 1000000000)} B`;
            } else if (val > 1000000 || val < -1000000) {
              value = `${Math.floor(val / 1000000)} M`;
            } else if (val > 1000 || val < -1000) {
              value = `${Math.floor(val / 1000)} K`;
            }
            return value;
          },
        },
      },
    },
  },
};

export default ChartData;
