import {clockTime,randomNumber} from '../../helper';
import colors from 'tailwindcss/colors';

const ChartData = {
  A1: {
    title: 'محدوده قیمتی آخرین معاملات سهام حق تقدم و ص.سهامی',
    type: 'bar',
    auth: false,
    options: {
      plotOptions: {
        horizontal: false,
        bar:{
          distributed: true
        },
      },
      chart:{
        fontFamily: 'Iran-sans',
        events: {
          dataPointSelection: function(event, chartContext, config){
            this.reducer.setModal({show:true,content: 'tree' });
          }
        }
      },
      colors: ['#E91E63','#E91E63','#E91E63','#E91E63','#E91E63','#E91E63','#66DA26','#66DA26','#66DA26','#66DA26','#66DA26','#66DA26'],
      labels: [    'پایین تر از منفی 5',
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
      'بالاتر از مثبت 5'],
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
        category: [    'پایین تر از منفی 5',
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
        'بالاتر از مثبت 5',]
      }
    }
  },
  A2: {
    title: 'وضعیت آخرین معاملات سهام ، حق تقدم، ص.سهامی',
    type: 'polarArea',
    auth: false,
    options: {
      colors: ['#E91E63', '#66DA26'],
      labels: ['سهام منفی', 'سهام مثبت'],
      events: {
        onclick: function (event, chartContext) {
          this.setState({modal: true});
        }
      }
    }
  },
  A3: {
    title: 'روند تغییرات آخرین قیمت سهام حق تقدم، ص.سهامی',
    type: 'area',
    auth: false,
    options: {
      chart: {
        fontFamily: 'Iran-sans',
      },
      xaxis:{
        category: clockTime()
      },
      legend: {
        show: false
      },
      colors: ['#E91E63', '#66DA26'],
      tooltip:{
        y:{
          formatter: (value) => {
            return value
          }
        }
      }
    }
  },
  A4: {
    title: 'ارزش کل سفارش های روی تابلو نماد های سهامی ، حق تقدم ، ص.سهامی',
    type: 'bar',
    auth: false,
    options: {
      plotOptions:{
        bar: {
          distributed: true,
          borderRadius: 4,
          horizontal: true,
        }
      },
      colors: ['#E91E63', '#66DA26'],
      dataLabels:{
        enabled: true,
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
        },
      },
      xaxis: {
        labels: {
          enabled:false,
        },
        categories: [
          "فروش",
          "خرید"
        ]
      },
      yaxis: {
        labels: {
          show: false
        }
      },
    }
  },
  A5: {
    title: "تغیرات ورود پول اشخاص حقیقی به سهام ، حق تقدم و ص.سهامی",
    type: 'line',
    auth: false,
    options: {
      xaxis: {
        categories: clockTime()
      }
    }
  },
  A6:{
    title: "تغیرات ورود پول اشخاص حقیقی",
    type: 'line',
    auth: false,
    options: {
      colors: ['#ec4899'],
      xaxis: {
        categories: clockTime()
      }
    }
  },
  A7: {
    title: "تغیرات ارزش کل سفارش ها به میلیارد تومان",
    type: 'line',
    auth: false,
    options: {
      xaxis: {
        categories: clockTime()
      }
    }
  },
  A8: {
    title: "تغیرات سرانه های خرید و فروش بازار",
    type: 'line',
    auth: false,
    options: {
      xaxis: {
        categories: clockTime()
      }
    }
  },
  A9: {
    title: 'تغیرات ارزش کل سفارش ها به میلیارد تومان',
    type: 'area',
    auth: false,
    options: {
      chart: {
        fontFamily: 'Iran-sans',
      },
      xaxis:{
        category: clockTime()
      },
      legend: {
        show: false
      },
      colors: ['#E91E63', '#66DA26'],
      tooltip:{
        y:{
          formatter: (value) => {
            return value
          }
        }
      }
    }
  },
  A10: {
    title: 'تغیرات سرانه های خرید و فروش بازار',
    type: 'area',
    auth: false,
    options: {
      chart: {
        fontFamily: 'Iran-sans',
      },
      xaxis:{
        category: clockTime()
      },
      legend: {
        show: false
      },
      colors: ['#E91E63', '#66DA26'],
      tooltip:{
        y:{
          formatter: (value) => {
            return value
          }
        }
      }
    } 
  },
  A11: {
    title: 'آخرین قیمت به پایانی',
    type: 'bar',
    auth: false,
    options: {
      plotOptions: {
        horizontal: false,
        distributed: true
      },
      colors: ['#66DA26','#ff0'],
      labels: [
        "پایین تر",
        "برابر",
        "بالاتر"
      ],
      dataLabels: {
        style: {
          colors: [colors.slate[700]],
        },
      },
      xaxis: {
        categories: [
          "پایین تر",
          "برابر",
          "بالاتر"
        ]
      }
    }
  },
  A12: {
    title: 'کندل های امروز سهم ها',
    type: 'bar',
    auth: false,
    options: {
      plotOptions: {
        horizontal: false,
        distributed: true
      },
      colors: ['#66DA26','#ff0'],
      labels: [
        "نزولی",
        "ثابت",
        "صعودی"
      ],
      dataLabels: {
        style: {
          colors: [colors.slate[700]],
        },
      },
      xaxis: {
        labels: {
          show: true,

        },
        categories: [
          "نزولی",
          "ثابت",
          "صعودی"
        ]
      }
    }
  },
  A13: {
    title: 'تعداد صف های خرید و فروش',
    type: 'bar',
    auth: false,
    options: {
      plotOptions: {
        horizontal: false,
        bar:{
          distributed: true
        }
      },
      colors: [colors.rose[500],colors.rose[500],colors.rose[500],colors.emerald[500],colors.emerald[500],colors.emerald[500],],
      labels: [
        "صف فروش",
        ["صف فروش",
        "حجم کمتر",
      "از مبنا"],
        "صف فروش بدون معامله",
        "صف خرید",
        "صف خرید کمتر از حجم مبنا",
        "صف خرید بدون معامله"
      ],
      dataLabels: {
        style: {
          colors: [colors.slate[700]],
        },
      },
      xaxis: {
        labels: {
          show: true,
          offsetY:108
        },
        categories: [
          "صف فروش",
          "صف فروش کمتر از حجم مبنا",
          "صف فروش بدون معامله",
          "صف خرید",
          "صف خرید کمتر از حجم مبنا",
          "صف خرید بدون معامله"
        ]
      }
    }
  },
  A14: {
    title: 'نقش حقیقی و حقوقی در معاملات',
    type: 'bar',
    auth: true,
    options: {
      plotOptions:{
        bar: {
          distributed: true,
          borderRadius: 4,
          horizontal: true,
        }
      },
      colors: ['#E91E63', '#66DA26',colors.blue[500]],
      dataLabels:{
        enabled: true,
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
        },
      },
      xaxis: {
        labels: {
          enabled:false,
        },
        categories: ["خوب","عالی","متوسط"]
      },
      yaxis: {
        labels: {
          show: false
        }
      },
    }
  },
  A15: {
    title: 'کندل های نوسانی',
    type: 'bar',
    auth: true,
    options: {
      plotOptions: {
        horizontal: false,
        distributed: true
      },
      colors: ['#66DA26','#ff0'],
      labels: [
        "سایه بالا",
        "دوجی",
        "سایه پایین"
      ],
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
        categories: [
          "سایه بالا",
          "دوجی",
          "سایه پایین"
        ]
      }
    }
  },
  A16: {
    title: 'نماد های با نوسان بالا',
    type: 'bar',
    auth: true,
    options: {
      plotOptions: {
        horizontal: false,
        distributed: true
      },
      colors: ['#66DA26','#ff0'],
      labels: [
        "صف خرید به فروش",
        "مثبت به صف فروش",
        "صف خرید به منفی",
        "صف فروش مثبت",
        "منفی به صف خرید",
        "صف فروش به صف خرید"
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
          "صف خرید به فروش",
          "مثبت به صف فروش",
          "صف خرید به منفی",
          "صف فروش مثبت",
          "منفی به صف خرید",
          "صف فروش به صف خرید"
        ]
      }
    }
  },
  A17: {
    title: 'تغییرات ارزش معاملات خرد',
    type: 'line',
    auth: true,
    options: {
      xaxis: {
        categories: clockTime()
      }
    }
  },
  A18: {
    title: 'تغیرات ارزش معاملات در هر دقیقه',
    type: 'bar',
    auth: true,
    options: {
      dataLabels: {
        enabled:false
      },
      xaxis: {
        labels:{
          show:false
        },
        categories: clockTime()
      }
    }
  }
}

export default ChartData;