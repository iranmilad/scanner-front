import colors from 'tailwindcss/colors';

/**
 * description: treemap config
 * @returns {Object}
 */
const config = {
  colorAxis: {
    minColor: '#02AD65',
    maxColor: '#D62D4D',
  },
  tooltip: {
    backgroundColor: colors.slate[100],
    style: {
      color: 'black',
      fontFamily: 'Iran-sans',
    },
    shared: true,
    useHTML: true,
    borderRadius: 8,
    padding: 20,
    pointFormatter: function () {
      let { name } = this.options;
      if ('more' in this.options) {
        return `<div style="width:200px;text-align:right" dir="rtl"><b class="block">${
          name || ''
        }</b><br/><hr /><br/>
        <div class="tooltip-div"><b>نام واقعی : </b>${
          this.options?.more?.realName || ''
        }</div>
        <div class="tooltip-div"><b>قیمت نهایی : </b>${
          this.options?.more?.endPrice || ''
        }</div>
        <div class="tooltip-div"><b>آخرین معامله : </b>${
          this.options?.more?.lastDeal || ''
        }</div>
        <div class="tooltip-div"><b>تعداد : </b>${
          this.options?.more?.count || ''
        }</div>
        <div class="tooltip-div"><b>حجم : </b>${
          this.options?.more?.volume || ''
        }</div>
        <div class="tooltip-div"><b>ارزش : </b>${
          this.options?.more?.value || ''
        }</div>
        <div class="tooltip-div"><b>زمان : </b>${
          this.options?.more?.time || ''
        }</div>
        `;
      }
      return `<div style="text-align:center" dir="rtl"><b class="block">${
        name || ''
      }</b></div`;
    },
    footerFormat: '</div>',
  },
  loading: true,
  legend: false,
  series: [
    {
      type: 'treemap',
      name: 'نقشه کامل',
      layoutAlgorithm: 'stripes',
      allowDrillToNode: true,
      style: {
        fontFamily: 'Iran-sans',
      },
      point: {
        events: {
          click: function () {
            if(this.drillLvl === 1){
              let hostname = window.location.hostname;
              window.open(`${hostname}/treemap/?id=${this.options.id}`,"_blank")
            }
          },
        },
      },
      dataLabels: {
        enabled: true,
        verticalAlign: 'middle',
        shadow: false,
        style: {
          fontSize: '15px',
          fontWeight: 'bold',
          fontFamily: 'Iran-sans',
          color: 'white',
        },
        format: '{point.displayValue} {point.name}',
      },
      breadcrumbs: {
        buttonTheme: {
          fill: '#f7f7f7',
          padding: 8,
          stroke: '#cccccc',
          'stroke-width': 1,
          style: {
            fontFamily: 'Iran-sans',
          },
        },
        floating: true,
        position: {
          align: 'right',
        },
        showFullPath: false,
      },
      animation: false,
      alternateStartingDirection: true,
      levelIsConstant: false,
      levels: [
        {
          level: 1,
          layoutAlgorithm: 'sliceAndDice',
          dataLabels: {
            enabled: true,
            shadow: false,
            align: 'left',
            verticalAlign: 'top',
          },
          borderColor: 'white',
          borderWidth: 4,
        },
      ],
    },
  ],
  title: false,
  credits: false,
};

export default config;
