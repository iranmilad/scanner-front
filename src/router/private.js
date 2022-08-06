import React from 'react';
import PivotWatch from "../containers/extra/pivotWatch";
import SignalWatch from "../containers/extra/signalWatch";
import MarketWatch from "../containers/extra/marketWatch";
import IndustrialWatch from "../containers/extra/industrialWatch";

const Market_Values = React.lazy(()=>import("../containers/report/marketValues"));
const Order_Watch = React.lazy(()=> import("../containers/extra/orderWatch"));
const Tops = React.lazy(()=> import("../containers/tops"));
const Market_Chart = React.lazy(()=> import("../containers/market/chart"));
const TechnoWatch = React.lazy(()=> import("../containers/extra/technoWatch"));
const LongMoneyFlow = React.lazy(()=> import("../containers/extra/flowFilters"));
const Dashboard = React.lazy(()=> import("../containers/dashboard/main"));
const MoneyFlow = React.lazy(()=> import("../containers/moneyFlow"));
const StockMarket_Chart = React.lazy(()=> import("../containers/market/real/chart"));
const MarketChartX = React.lazy(()=> import("../containers/market/real/chartx"));
const MarketSixChart = React.lazy(()=> import("../containers/market/real/sixChart"));


export const privateRoute = [
  {
    path: "/marketvalues",
    component: Market_Values,
    layout: "private"
  },
  {
    path: "/extra/orderwatch",
    component: Order_Watch,
    layout: "private"
  },
  {
    path: "/tops",
    component: Tops,
    layout: "private"
  },
  {
    path: "/market/chart/:id",
    component: Market_Chart,
    layout: "private"
  },
  {
    path: "/extra/technowatch",
    component: TechnoWatch,
    layout: "private"
  },
  {
    path: "/extra/longmoneyflow",
    component: LongMoneyFlow,
    layout: "private"
  },
  {
    path: "/extra/pivotwatch",
    component: PivotWatch,
    layout: "private"
  },
  {
    path: "/extra/signalwatch",
    component: SignalWatch,
    layout: "private"
  },
  {
    path: "/extra/marketwatch/:id?",
    component: MarketWatch,
    layout: "private"
  },
  {
    path: "/extra/industrialwatch",
    component: IndustrialWatch,
    layout: "private"
  },
  {
    path: "/dashboard",
    component: Dashboard,
    layout: "private"
  },
  {
    path: "/moneyflow",
    component: MoneyFlow,
    layout: "private"
  },
  {
    path: "/market/real/chart/:id",
    component: StockMarket_Chart,
    layout: "private"
  },
  {
    path: "/market/real/chartx/:id",
    component: MarketChartX,
    layout: "private"
  },
  {
    path: "/market/real/sixChart/:id",
    component: MarketSixChart,
    layout: "private"
  }

]