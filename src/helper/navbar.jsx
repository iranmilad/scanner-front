import { randomNumber } from '../helper';
import TreemapIcon from '../assets/images/treemap-chart.png';

export const headers = [
  {
    name: 'خانه',
    link: '/',
    icon: <svg className='w-3.5 h-3.5 fill-gray-600 ml-3 group-hover:fill-blue-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><defs><style>{`.fa-secondary{opacity:.4}`}</style></defs><path className="fa-primary" d="M416 101.5V64C416 46.33 430.3 32 448 32H480C497.7 32 512 46.33 512 64V185.5L565.1 231.9C578.4 243.6 579.7 263.8 568.1 277.1C556.4 290.4 536.2 291.7 522.9 280.1L288 74.52L53.07 280.1C39.77 291.7 19.56 290.4 7.917 277.1C-3.72 263.8-2.372 243.6 10.93 231.9L266.9 7.918C278.1-2.639 297-2.639 309.1 7.918L416 101.5z"/><path className="fa-secondary" d="M288 74.52L512.1 270.6L512.5 471.9C512.6 494 494.7 512 472.5 512H392C369.9 512 352 494.1 352 472V383.7C352 366 337.7 351.7 320 351.7H256C238.3 351.7 224 366 224 383.7V472C224 494.1 206.1 512 184 512H104.1C81.99 512 64.09 494.1 64.08 472L64.02 270.5L288 74.52z"/></svg>,
  },
  {
    name: 'سوابق بازار',
    link: '/industries/history/A00',
    icon: <svg className='w-3.5 h-3.5 fill-gray-600 ml-3 group-hover:fill-blue-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><defs><style>{`.fa-secondary{opacity:.4}`}</style></defs><path className="fa-primary" d="M320 0v128h128L320 0zM352 256h-49.16l-25.38-50.72c-4.219-8.438-12.16-13.72-22.47-13.25c-9.438 .375-17.78 6.281-21.28 15.06L189.6 317.5L165.5 269.3C161.4 261.1 153.1 256 143.1 256H16C7.164 256 0 263.2 0 272V288c0 8.836 7.164 16 16 16h113.2l41.38 82.72C174.6 394.9 182.9 400 192 400c.3125 0 .6562 0 1-.0313c9.438-.375 17.78-6.281 21.28-15.06l44.16-110.4l8.094 16.19C270.6 298.9 278.9 304 288 304h64c8.836 0 16-7.164 16-16V272C368 263.2 360.8 256 352 256z"/><path className="fa-secondary" d="M448 128v336c0 26.51-21.49 48-48 48h-288C85.49 512 64 490.5 64 464v-160h65.16l41.38 82.72C174.6 394.9 182.9 400 192 400c.3125 0 .6562 0 1-.0313c9.438-.375 17.78-6.281 21.28-15.06l44.16-110.4l8.094 16.19C270.6 298.9 278.9 304 288 304h64c8.836 0 16-7.164 16-16V272C368 263.2 360.8 256 352 256h-49.16l-25.38-50.72c-4.219-8.438-12.16-13.72-22.47-13.25c-9.438 .375-17.78 6.281-21.28 15.06L189.6 317.5L165.5 269.3C161.4 261.1 153.1 256 143.1 256H64V48C64 21.49 85.49 0 112 0H320v128H448z"/></svg>,
  },
  {
    name: 'دیده بان ها',
    link: '#',
    icon: <svg className='w-3.5 h-3.5 fill-gray-600 ml-3 group-hover:fill-blue-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>{`.fa-secondary{opacity:.4}`}</style></defs><path className="fa-primary" d="M63.88 160.1C61.34 253.9 3.5 274.3 0 404V448c0 17.6 14.4 32 32 32h128c17.6 0 32-14.4 32-32V288h32V128H95.88C78.26 128 64.35 142.5 63.88 160.1zM448.1 160.1C447.6 142.5 433.7 128 416.1 128H288v160h32v160c0 17.6 14.4 32 32 32h128c17.6 0 32-14.4 32-32v-44C508.5 274.3 450.7 253.9 448.1 160.1z"/><path className="fa-secondary" d="M400 32h-64C327.1 32 320 39.13 320 48V96h96.04L416 48C416 39.13 408.9 32 400 32zM224 288h64V128H224V288zM176 32h-64C103.1 32 96 39.13 96 48L95.96 96H192V48C192 39.13 184.9 32 176 32z"/></svg>,
    children: [
      {
        name: 'بازار',
        link: '/extra/marketwatch',
      },
      {
        name: 'تکنیکال',
        link: '/extra/technowatch',
      },
      {
        name: 'صنایع',
        link: '/extra/industrialwatch',
      },
      {
        name: 'سفارشات',
        link: '/extra/orderwatch',
      },
      {
        name: 'حمایت ها و مقاومت ها',
        link: '/extra/pivotwatch',
        account: true,
      },
      {
        name: 'جریانات نقدینگی بلندمدت',
        link: '/extra/signalwatch',
        account: true,
      },
    ],
  },
  {
    name: 'نمودارها',
    link: '#',
    icon: <svg className='w-3.5 h-3.5 fill-gray-600 ml-3 group-hover:fill-blue-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>{`.fa-secondary{opacity:.4}`}</style></defs><path className="fa-primary" d="M304 32C312.8 32 320 39.16 320 48V96C337.7 96 352 110.3 352 128V224C352 241.7 337.7 256 320 256V304C320 312.8 312.8 320 304 320C295.2 320 288 312.8 288 304V256C270.3 256 256 241.7 256 224V128C256 110.3 270.3 96 288 96V48C288 39.16 295.2 32 304 32zM416 144C416 135.2 423.2 128 432 128C440.8 128 448 135.2 448 144V192C465.7 192 480 206.3 480 224V288C480 305.7 465.7 320 448 320V368C448 376.8 440.8 384 432 384C423.2 384 416 376.8 416 368V320C398.3 320 384 305.7 384 288V224C384 206.3 398.3 192 416 192V144zM128 160C128 142.3 142.3 128 160 128V80C160 71.16 167.2 64 176 64C184.8 64 192 71.16 192 80V128C209.7 128 224 142.3 224 160V288C224 305.7 209.7 320 192 320V368C192 376.8 184.8 384 176 384C167.2 384 160 376.8 160 368V320C142.3 320 128 305.7 128 288V160z"/><path className="fa-secondary" d="M32 32C49.67 32 64 46.33 64 64V400C64 408.8 71.16 416 80 416H480C497.7 416 512 430.3 512 448C512 465.7 497.7 480 480 480H80C35.82 480 0 444.2 0 400V64C0 46.33 14.33 32 32 32z"/></svg>,
    children: [
      {
        name: 'عملکرد شرکت ها',
        link: '/reports',
      },
      {
        name: 'جریانات نقدینگی بازار',
        link: '/market/chart/A00',
      },
      {
        name: 'جریانات نقدینگی روزانه بازار',
        link: '/chart/daily/A00',
      },
      {
        name: 'جریانات نقدینگی لحظه',
        link: '/moneyflow',
        account: true,
      },
    ],
  },
  {
    name: 'لینک های مفید',
    link: '#',
    icon: <svg className='w-3.5 h-3.5 fill-gray-600 ml-3 group-hover:fill-blue-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><defs><style>{`.fa-secondary{opacity:.4}`}</style></defs><path className="fa-primary" d="M400 96v64c0 8.836-7.164 16-16 16h-64v64C320 248.8 312.8 256 304 256h-64C231.2 256 224 248.8 224 240v-64H160C151.2 176 144 168.8 144 160V96c0-8.838 7.164-16 16-16h64v-64C224 7.162 231.2 0 240 0h64C312.8 0 320 7.162 320 16v64h64C392.8 80 400 87.16 400 96z"/><path className="fa-secondary" d="M559.7 392.2l-135.1 99.52C406.9 504.8 385 512 362.1 512H15.1C7.251 512 0 504.8 0 496v-95.98C0 391.3 7.251 383.1 15.1 383.1l55.37 .0241l46.5-37.74c20.1-17 47.12-26.25 74.12-26.25h159.1c19.5 0 34.87 17.38 31.62 37.38c-2.623 15.74-17.37 26.62-33.37 26.62H271.1c-8.748 0-15.1 7.25-15.1 16c0 8.742 7.25 15.99 15.1 15.99h120.6l119.7-88.17c17.79-13.19 42.81-9.344 55.93 8.469C581.3 354.1 577.5 379.1 559.7 392.2z"/></svg>,
    children: [
      {
        name: 'فیلترهای جریان نقدینگی بلندمدت',
        link: '/extra/longmoneyflow',
      },
      {
        name: 'لیست شرکت ها بر اساس ارزش بازار',
        link: '/marketvalues',
      },
      {
        name: 'لیست شرکت ها بر اساس فاصله تا سقف قیمت',
        link: '/tops',
      },
    ],
  },
  {
    name: 'نقشه بازار',
    link: '/treemap',
    icon: TreemapIcon,
  },
  {
    name: 'اشتراک ویژه',
    link: '/subscription',
    icon: <svg className='w-3.5 h-3.5 fill-gray-600 ml-3 group-hover:fill-blue-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><style>{`.fa-secondary{opacity:.4}`}</style></defs><path className="fa-primary" d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z"/><path className="fa-secondary" d="M136 352c-6.156 0-12.28 2.344-16.97 7.031l-48 48c-9.375 9.375-9.375 24.56 0 33.94s24.56 9.375 33.94 0l48-48c9.375-9.375 9.375-24.56 0-33.94C148.3 354.3 142.2 352 136 352zM376 160c6.156 0 12.28-2.344 16.97-7.031l48-48c9.375-9.375 9.375-24.56 0-33.94s-24.56-9.375-33.94 0l-48 48c-9.375 9.375-9.375 24.56 0 33.94C363.7 157.7 369.8 160 376 160zM104.1 71.03c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l48 48C123.7 157.7 129.8 160 136 160s12.28-2.344 16.97-7.031c9.375-9.375 9.375-24.56 0-33.94L104.1 71.03zM392.1 359C388.3 354.3 382.2 352 376 352s-12.28 2.344-16.97 7.031c-9.375 9.375-9.375 24.56 0 33.94l48 48c9.375 9.375 24.56 9.375 33.94 0s9.375-24.56 0-33.94L392.1 359z"/></svg>,
  },
];

export const marketHeader = [
  {
    name: 'خانه',
    link: '/',
    replace: false,
  },
  {
    name: "داشبورد",
    link: '/stock',
    replace: true
  },
  {
    name: 'سوابق',
    link: '/stock/shistory',
    replace: true,
  },
  {
    name: 'نمودار های جریانات نقدینگی',
    link: '/stock/chart',
    replace: true,
  },
  {
    name: 'نمودار های عملکرد ماهیانه',
    link: '/stock/monthly-chart',
    replace: true,
  },
  {
    name: 'تحلیلگر جریانات نقدینگی',
    link: '/stock/moneyflowanalyser',
    replace: true,
  },
  {
    name: 'چارت',
    link: '/stock/chartx',
    replace: true,
  },
  {
    name: 'جریان نقدی سهم',
    link: '/stock/sixChart',
    replace: true,
  },
];