import fa from 'apexcharts/dist/locales/fa.json';
import colors from 'tailwindcss/colors';
import { clockTime } from '../../helper';

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
        parentHeightOffset: 0,
        locales: [fa],
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        toolbar: {
          show: true,
        },
        id: 'A1',
        fontFamily: 'Iran-sans',
        events: {
          dataPointSelection: function (
            event,
            chartContext,
            { dataPointIndex }
          ) {
            // this.reducer.setModal({ show: true, content: 'tree' });
            // console.log(window.chartable.setModal());
            let {
              w: { globals },
            } = chartContext;
            let label = globals.labels[dataPointIndex];
            let id = globals['chartID'];
            window.chartable.setChart({
              label,
              id,
              pointIndex: dataPointIndex,
            });
            window.chartable.setModal();
          },
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: 0,
          bottom: 12,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
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
        parentHeightOffset: 0,
        locales: [fa],
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        id: 'A1',
        fontFamily: 'Iran-sans',
      },
      legend: {
        position: 'bottom',
      },
      colors: ['#E91E63', '#66DA26'],
      labels: ['سهام منفی', 'سهام مثبت'],
    },
  },
  A3: {
    title: 'روند تغییرات آخرین قیمت سهام حق تقدم، ص.سهامی',
    type: 'line',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        group: 'AGroup',
        id: 'A3',
        fontFamily: 'Iran-sans',
        type: 'line',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
          bottom: 12,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 407,
          options: {
            chart:{
              height: 280
            },
            xaxis: {
              labels: {
                show:true
              }
            },
            grid: {
              show:true,
              padding: {
                bottom: 12,
              },
            },
          },
        },
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
      colors: ['#10b981', '#ef4444'],
    },
  },
  A4: {
    title: 'ارزش کل سفارش های روی تابلو نماد های سهامی ، حق تقدم ، ص.سهامی',
    type: 'bar',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        defaultLocale: 'fa',
        parentHeightOffset: 0,
        animations: {
          enabled: false,
        },
        id: 'A4',
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
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
          bottom: 40,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
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
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        group: 'AGroup',
        id: 'A5',
        fontFamily: 'Iran-sans',
        animations: {
          enabled: false,
        },
        type: 'line',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 5,
          right: -5,
          bottom: 30,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
    },
  },
  A6: {
    title: 'تغیرات ورود پول اشخاص حقیقی',
    type: 'line',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        group: 'AGroup',
        id: 'A6',
        fontFamily: 'Iran-sans',
        type: 'line',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
          bottom: 12,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
    },
  },
  A7: {
    title: 'تغییرات درصد خرید و فروش اشخاص حقیقی',
    type: 'area',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        group: 'AGroup',
        id: 'A7',
        fontFamily: 'Iran-sans',
        type: 'area',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
          bottom: 12,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
      colors: ['#10b981', '#ef4444'],
    },
  },
  A8: {
    title: 'ارزش معاملات در دقیقه',
    type: 'line',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        group: 'AGroup',
        id: 'A8',
        fontFamily: 'Iran-sans',
        type: 'line',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
      colors: ['#10b981', '#ef4444'],
    },
  },
  A9: {
    title: 'تغیرات ارزش کل سفارش ها به میلیارد تومان',
    type: 'line',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'line',
        width: '100%',
        group: 'AGroup',
        id: 'A9',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
          bottom: 12,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
      colors: ['#10b981', '#ef4444'],
    },
  },
  A10: {
    title: 'تغیرات سرانه های خرید و فروش بازار',
    type: 'line',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'line',
        width: '100%',
        group: 'AGroup',
        id: 'A10',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
          bottom: 12,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
      colors: ['#10b981', '#ef4444'],
    },
  },
  A11: {
    title: 'آخرین قیمت به پایانی',
    type: 'bar',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        id: 'A11',
        fontFamily: 'Iran-sans',
        events: {
          dataPointSelection: function (
            event,
            chartContext,
            { dataPointIndex }
          ) {
            // this.reducer.setModal({ show: true, content: 'tree' });
            // console.log(window.chartable.setModal());
            let {
              w: { globals },
            } = chartContext;
            let label = globals.labels[dataPointIndex];
            let id = globals['chartID'];
            window.chartable.setChart({
              label,
              id,
              pointIndex: dataPointIndex,
            });
            window.chartable.setModal();
          },
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
          bottom: 12,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
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
        locales: [fa],
        defaultLocale: 'fa',
        parentHeightOffset: 0,
        width: '100%',
        animations: {
          enabled: false,
        },
        id: 'A12',
        fontFamily: 'Iran-sans',
        events: {
          dataPointSelection: function (
            event,
            chartContext,
            { dataPointIndex }
          ) {
            // this.reducer.setModal({ show: true, content: 'tree' });
            // console.log(window.chartable.setModal());
            let {
              w: { globals },
            } = chartContext;
            let label = globals.labels[dataPointIndex];
            let id = globals['chartID'];
            window.chartable.setChart({
              label,
              id,
              pointIndex: dataPointIndex,
            });
            window.chartable.setModal();
          },
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: 0,
          bottom: 12,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
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
        locales: [fa],
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        id: 'A13',
        fontFamily: 'Iran-sans',
        events: {
          dataPointSelection: function (
            event,
            chartContext,
            { dataPointIndex }
          ) {
            // this.reducer.setModal({ show: true, content: 'tree' });
            // console.log(window.chartable.setModal());
            let {
              w: { globals },
            } = chartContext;
            let label = globals.labels[dataPointIndex];
            let id = globals['chartID'];
            window.chartable.setChart({
              label,
              id,
              pointIndex: dataPointIndex,
            });
            window.chartable.setModal();
          },
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
          bottom: 12,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
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
        locales: [fa],
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        id: 'A14',
        fontFamily: 'Iran-sans',
      },
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 4,
          horizontal: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: 10,
          bottom: 12,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      legend: {
        show: false,
      },
      colors: ['#E91E63', '#66DA26', colors.blue[500]],
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
        locales: [fa],
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        id: 'A15',
        fontFamily: 'Iran-sans',
        events: {
          dataPointSelection: function (
            event,
            chartContext,
            { dataPointIndex }
          ) {
            // this.reducer.setModal({ show: true, content: 'tree' });
            // console.log(window.chartable.setModal());
            let {
              w: { globals },
            } = chartContext;
            let label = globals.labels[dataPointIndex];
            let id = globals['chartID'];
            window.chartable.setChart({
              label,
              id,
              pointIndex: dataPointIndex,
            });
            window.chartable.setModal();
          },
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
          bottom: 12,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
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
        locales: [fa],
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        id: 'A16',
        fontFamily: 'Iran-sans',
        events: {
          dataPointSelection: function (
            event,
            chartContext,
            { dataPointIndex }
          ) {
            // this.reducer.setModal({ show: true, content: 'tree' });
            // console.log(window.chartable.setModal());
            let {
              w: { globals },
            } = chartContext;
            let label = globals.labels[dataPointIndex];
            let id = globals['chartID'];
            window.chartable.setChart({
              label,
              id,
              pointIndex: dataPointIndex,
            });
            window.chartable.setModal();
          },
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
          bottom: 12,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
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
      responsive:[
        {
          breakpoint: 1872,
          options: {
            xaxis: {
              labels: {
                show: true,
                // offsetY: 90,
                offsetX: 10,
              }
            }
          }
        }
      ],
      xaxis: {
        labels: {
          show: true,
          rotate: 0,
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
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'line',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
          bottom: 12,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
    },
  },
  A18: {
    title: 'تغیرات ارزش معاملات در هر دقیقه',
    type: 'area',
    auth: true,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'line',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
          bottom: 12,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
    },
  },
  totalIndustriesStockPresent: {
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
        locales: [fa],
        defaultLocale: 'fa',
        width: '100%',
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
  totalIndustriesStockValueQueue: {
    title: 'ارزش کل سفارش های روی تابلو گروه به میلیارد تومان',
    type: 'bar',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        defaultLocale: 'fa',
      },
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 4,
          horizontal: true,
        },
        chart: {
          width: '100%',
          animations: {
            enabled: false,
          },
          fontFamily: 'Iran-sans',
        },
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
  totalIndustriesChangeBuySellHeadsHistory: {
    title: 'تغییرات سرانه های خرید و فروش گروه به میلیون تومان',
    type: 'line',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        defaultLocale: 'fa',
        width: '100%',
        animations: {
          enabled: false,
        },
        type: 'line',
        fontFamily: 'Iran-sans',
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        category: clockTime('09:00', '12:30', 15),
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
  totalIndustriesEnterManyBuyerIHistory: {
    title: 'تغییرات ورود پول اشخاص حقیقی به میلیارد تومان',
    type: 'area',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        defaultLocale: 'fa',
        width: '100%',
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
      },
      xaxis: {
        category: clockTime('09:00', '12:30', 15),
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
  totalIndustriesMarketOrderValueHistory: {
    title: 'تغییرات ارزش کل سفارش ها به میلیارد تومان',
    type: 'line',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        defaultLocale: 'fa',
        width: '100%',
        animations: {
          enabled: false,
        },
        type: 'line',
        fontFamily: 'Iran-sans',
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        category: clockTime('09:00', '12:30', 15),
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
  dailyTradeValue: {
    title: 'تغییرات سرانه های خرید و فروش گروه به میلیون تومان',
    auth: false,
    options: {
      chart: {
        parentHeightOffset: 0,
        width: '100%',
        locales: [fa],
        defaultLocale: 'fa',
        height: 350,
        type: 'line',
        fontFamily: 'Iran-sans',
        stacked: false,
        animations: {
          enabled: false,
        },
      },
      noData: {
        text: 'دیتایی موجود نمیباشد',
        align: 'center',
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      stroke: {
        width: [0, 4],
        curve: 'smooth',
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
          bottom: 20,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      responsive:[
        {
          breakpoint: 1899,
          options: {
            xaxis:{
              tickAmount: 10,
            }
          }
        },
        {
          breakpoint: 1033,
          options: {
            xaxis:{
              tickAmount: 7,
            }
          }
        },
        {
          breakpoint: 768,
          options: {
            grid:{
              padding: {
                bottom:30
              }
            },
            xaxis:{
              tickAmount: 2,
              labels:{
                offsetX: 10,
              }
            }}
        }
      ],
      xaxis: {
        type: 'category',
        labels: {
          show: true,
          rotateAlways: false,
          rotate: 0,
          offsetX: 0,
          offsety: 0,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
  dailyEntryMany: {
    options: {
      chart: {
        parentHeightOffset: 0,
        width: '100%',
        locales: [fa],
        defaultLocale: 'fa',
        height: 350,
        type: 'column',
        fontFamily: 'Iran-sans',
        stacked: false,
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
      noData: {
        text: 'دیتایی موجود نمیباشد',
        align: 'center',
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      stroke: {
        width: [0, 4],
        curve: 'smooth',
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
          bottom: 12,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      responsive:[
        {
          breakpoint: 1899,
          options: {
            xaxis:{
              tickAmount: 10,
            }
          }
        },
        {
          breakpoint: 1033,
          options: {
            xaxis:{
              tickAmount: 7,
            }
          }
        },
        {
          breakpoint: 768,
          options: {
            grid:{
              padding: {
                bottom:30
              }
            },
            xaxis:{
              tickAmount: 2,
              labels:{
                offsetX: 10,
              }
            }}
        }
      ],
      xaxis: {
        type: 'category',
        labels: {
          show: true,
          rotateAlways: false,
          rotate: 0,
          offsetX: 0,
          offsety: 0,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
  dailyPowerBuyer: {
    options: {
      chart: {
        parentHeightOffset: 0,
        width: '100%',
        locales: [fa],
        defaultLocale: 'fa',
        height: 400,
        type: 'column',
        fontFamily: 'Iran-sans',
        stacked: false,
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
      noData: {
        text: 'دیتایی موجود نمیباشد',
        align: 'center',
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      stroke: {
        width: [0, 4],
        curve: 'smooth',
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
          bottom: 12,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      responsive:[
        {
          breakpoint: 1899,
          options: {
            xaxis:{
              tickAmount: 10,
            }
          }
        },
        {
          breakpoint: 1033,
          options: {
            xaxis:{
              tickAmount: 7,
            }
          }
        },
        {
          breakpoint: 768,
          options: {
            grid:{
              padding: {
                bottom:30
              }
            },
            xaxis:{
              tickAmount: 2,
              labels:{
                offsetX: 10,
              }
            }}
        }
      ],
      xaxis: {
        type: 'category',
        labels: {
          show: true,
          rotateAlways: false,
          rotate: 0,
          offsetX: 0,
          offsety: 0,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
  MF1: {
    type: 'line',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'line',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
  MF2: {
    type: 'line',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'line',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
  MF3: {
    type: 'line',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'line',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
  MF4: {
    type: 'line',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'line',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
  MF5: {
    type: 'line',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'line',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
  MF6: {
    type: 'line',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'line',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'line',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
      colors: ['#10b981', '#ef4444'],
    },
  },
  MF8: {
    type: 'line',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'line',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
      colors: ['#10b981', '#ef4444'],
    },
  },
  MF9: {
    type: 'line',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'line',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
      colors: ['#10b981', '#ef4444'],
    },
  },
  MF10: {
    type: 'line',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'line',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
      colors: ['#10b981', '#ef4444'],
    },
  },
  MF11: {
    type: 'line',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'line',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
      colors: ['#10b981', '#ef4444'],
    },
  },
  MF12: {
    type: 'line',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'line',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
      colors: ['#10b981', '#ef4444'],
    },
  },
  MF13: {
    type: 'area',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'area',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
      colors: ['#E91E63'],
    },
  },
  MF14: {
    type: 'area',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'area',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
      colors: ['#E91E63'],
    },
  },
  MF15: {
    type: 'area',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'area',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
      colors: ['#E91E63'],
    },
  },
  MF16: {
    type: 'area',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'area',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
      colors: ['#E91E63'],
    },
  },
  MF17: {
    type: 'area',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'area',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
      colors: ['#E91E63'],
    },
  },
  MF18: {
    type: 'area',
    auth: false,
    options: {
      chart: {
        locales: [fa],
        parentHeightOffset: 0,
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        fontFamily: 'Iran-sans',
        type: 'area',
        width: '100%',
        toolbar: {
          show: true,
        },
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
      colors: ['#E91E63'],
    },
  },
  symbolMoneyflowTotalEnterManyBuyerIHistory: {
    options: {
      chart: {
        parentHeightOffset: 0,
        locales: [fa],
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        type: 'line',
        fontFamily: 'Iran-sans',
        group: 'symbol',
        id: 'symbolMoneyflowTotalEnterManyBuyerIHistory',
      },
      colors: [colors.pink[500]],
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
          bottom: 20
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
  symbolMoneyflowTotalChangeBuySellHeadsHistory: {
    options: {
      chart: {
        parentHeightOffset: 0,
        locales: [fa],
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        type: 'line',
        fontFamily: 'Iran-sans',
        group: 'symbol',
        id: 'symbolMoneyflowTotalChangeBuySellHeadsHistory',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      legend: {
        show: false,
      },
      stroke: {
        curve: 'smooth',
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
          bottom: 20
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
  symbolTradeLastDayHistory: {
    options: {
      chart: {
        parentHeightOffset: 0,
        locales: [fa],
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        type: 'line',
        fontFamily: 'Iran-sans',
        group: 'symbol',
        id: 'symbolTradeLastDayHistory',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      colors: [colors.indigo[500]],
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
          bottom: 20
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
    responsive: [
      {
        breakpoint: 2337,
        options: {
          xaxis: {
            labels: {
              rotateAlways: false,
              rotate: 0,
            },
          },
        },
      },
      {
        breakpoint: 1200,
        options: {
          xaxis: {
            tickAmount: 7,
            labels: {
              rotateAlways: false,
              rotate: 0,
            },
          },
        },
      },
      {
        breakpoint: 2428,
        options: {
          xaxis: {
            tickAmount: 6,
            labels: {
              rotateAlways: false,
              rotate: 0,
            },
          },
        },
      },
    ],
  },
  symbolTradeValueHistory: {
    options: {
      chart: {
        parentHeightOffset: 0,
        locales: [fa],
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        type: 'area',
        fontFamily: 'Iran-sans',
        group: 'symbol',
        id: 'symbolTradeValueHistory',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      colors: [colors.emerald[500]],
      stroke: {
        curve: 'smooth',
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
          bottom: 20
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
  symbolCounterBuyerSellerHistory: {
    options: {
      chart: {
        parentHeightOffset: 0,
        locales: [fa],
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        type: 'area',
        fontFamily: 'Iran-sans',
        group: 'symbol',
        id: 'symbolCounterBuyerSellerHistory',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      stroke: {
        curve: 'smooth',
      },
      legend:{
        show: false,
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
          bottom: 20
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
  symbolTradeTimeValueHistory: {
    options: {
      chart: {
        parentHeightOffset: 0,
        locales: [fa],
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        type: 'bar',
        fontFamily: 'Iran-sans',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      stroke: {
        curve: 'smooth',
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
          bottom: 20
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -4,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
        parentHeightOffset: 0,
        locales: [fa],
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        type: 'line',
        fontFamily: 'Iran-sans',
        group: 'symbol',
        stacked: false,
      },
      dataLabels: {
        enabled: false,
      },
      ledgend: {
        show: true,
      },
      stroke: {
        width: [0, 4],
        curve: 'smooth',
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
          bottom: 20
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
        parentHeightOffset: 0,
        locales: [fa],
        defaultLocale: 'fa',
        animations: {
          enabled: false,
        },
        type: 'line',
        fontFamily: 'Iran-sans',
        group: 'symbol',
        stacked: false,
      },
      dataLabels: {
        enabled: false,
      },
      ledgend: {
        show: true,
      },
      stroke: {
        width: [0, 4],
        curve: 'smooth',
      },
      grid: {
        show: true,
        padding: {
          left: 0,
          right: -5,
          bottom: 20
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      responsive: [
        {
          breakpoint: 2337,
          options: {
            xaxis: {
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 7,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
        {
          breakpoint: 2428,
          options: {
            xaxis: {
              tickAmount: 6,
              labels: {
                rotateAlways: false,
                rotate: 0,
              },
            },
          },
        },
      ],
      xaxis: {
        type: 'category',
        // tickAmount: 6,
        categories: clockTime('09:00', '12:30', 15),
        labels: {
          rotateAlways: false,
          offsetX: -2,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: {
            left: 20,
          },
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
