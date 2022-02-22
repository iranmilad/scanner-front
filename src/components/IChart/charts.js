
export const barChart = {
  options: {
    chart: {
      type: 'bar',
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
        },
      },
      fontFamily: 'Iran-sans',
    },
    plotOptions: {
      bar: {
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: true,
    },
    legend:{
      show: false
    },
    xaxis: {
      tickPlacement: 'on'
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val}`;
        },
      },
    },
  },
}

export const polarAreaChart = {
  options: {
    chart:{
      type: "polarArea",
      distributed: true,
      fontFamily: 'Iran-sans',
    },
    fill:{
      opacity: 1
    },
    stroke: {
      width: 1,
    },
    yaxis: {
      show: false
    },
    legend: {
      show: false
    },
    dataLabels:{
      enabled: true,
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0
        },
        spokes: {
          strokeWidth: 0
        },
      }
    },
    tooltip:{
      y: {
        formatter: function (val) {
          return `${val}`;
        },
      }
    }
  }
}

export const areaChart = {
  options:{
    chart: {
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    tooltip:{
      x: {
        format: 'HH:mm'
      }
    }
  }
}

export const lineChart = {
  options:{
    chart: {
      type: "line",
    },
    dataLabels:{
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
  }
}

// a function for generat 360 random number from 400 to 260 with 10 step
export const randomNumber = () => {
  let arr = [];
  for (let i = 0; i < 50; i++) {
    arr.push(Math.floor(Math.random() * (400 - 260) + 260));
  }
  return arr;
};

// a function for generate clock time from 9:00 to 14:00 with every 1 min
const clockTime = () => {
  let arr = [];
  for (let i = 9; i < 15; i++) {
    for (let j = 0; j < 60; j++) {
      arr.push(`${i}:${j}`);
    }
  }
  return arr;
};



export const FourthChart = {
  series: [
    {
      data: [309.3, 606.8],
    },
  ],
  options: {
    chart: {
      type: 'bar',
      height: 40,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        distributed: true,
        horizontal: true,
        barHeight: '100%',
        dataLabels: {
          position: 'center',
        },
      },
    },
    colors: ['#E91E63', '#66DA26'],
    dataLabels: {
      enabled: true,
      textAnchor: 'center',
      style: {
        colors: ['#fff'],
      },
    },
    xaxis: {
      categories: ['فروش', 'خرید'],
      style: {
        colors: ['#ff0000'],
      },
    },
    legend: {
      show: true,
    },
  },
};

// Fifth chart

export const FifthChart = {
  series: [
    {
      name: 'Desktops',
      data: randomNumber(),
    },
  ],
  options: {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        distributed: true,
        horizontal: true,
        barHeight: '100%',
        dataLabels: {
          position: 'center',
        },
      },
    },
    colors: ['#66DA26'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },

    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: clockTime(),
    },
  },
};

// Sixth chart and assign Fifth chart to this and change the color
export const SixthChart = {
  series: [
    {
      name: 'Desktops',
      data: randomNumber(),
    },
  ],
  options: {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        distributed: true,
        horizontal: true,
        barHeight: '100%',
        dataLabels: {
          position: 'center',
        },
      },
    },
    colors: ['#0ea5e9'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },

    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: clockTime(),
    },
  },
};

export const SeventhChart = {
  series: [
    {
      name: 'فروش',
      data: randomNumber(),
    },
    {
      name: 'خرید',
      data: randomNumber(),
    },
  ],
  options: {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        distributed: true,
        horizontal: true,
        barHeight: '100%',
        dataLabels: {
          position: 'center',
        },
      },
    },
    colors: ['#0ea5e9', '#66DA26'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },

    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: clockTime(),
    },
  },
};

export const EighthChart = {
  series: [
    {
      name: 'فروش',
      data: randomNumber(),
    },
    {
      name: 'خرید',
      data: randomNumber(),
    },
  ],
  options: {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        distributed: true,
        horizontal: true,
        barHeight: '100%',
        dataLabels: {
          position: 'center',
        },
      },
    },
    colors: ['#0ea5e9', '#66DA26'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: clockTime(),
    },
  },
};

export const ninthChart = {
  series: [
    {
      data: [400, 430, 448, 470, 540, 580, 690],
    },
  ],
  options: {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: [
        ' فروش',
        'کمتر از مبنا',
        'بدون معامله',
        'خرید',
        'کمتر از مبنا',
        'بدون معامله',
      ],
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    yaxis: {
      reversed: true,
      axisTicks: {
        show: false,
      },
    },
  },
};

export const tenthChart = {
  series: [
    {
      data: [438, 55, 186],
    },
  ],
  options: {
    chart: {
      type: 'bar',
      height: 350,
    },
    xaxis: {
      categories: ['پایین ترین', 'برابر', 'بالاتر'],
    },
  },
};

export const EleventhChart = {
  series: [
    {
      data: [372, 105, 202],
    },
  ],
  options: {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        distributed: true,
        horizontal: false,
        barHeight: '100%',
        dataLabels: {
          position: 'center',
        },
      },
    },
    colors: ['#E91E63', '#0ea5e9', '#66DA26'],
    xaxis: {
      categories: ['پایین ترین', 'برابر', 'بالاتر'],
    },
    dataLabels: {
      show: false,
    },
  },
};
