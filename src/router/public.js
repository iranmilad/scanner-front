import React from "react";

const Home = React.lazy(()=> import("../containers/home"));
const Treemap = React.lazy(()=> import("../containers/treemap"));
const Industries = React.lazy(()=>import("../containers/industries"));
const Industry_History = React.lazy(()=> import("../containers/industries/history"));
const Daily_Chart = React.lazy(()=> import("../containers/chart/daily"));
const Report = React.lazy(()=> import("../containers/report"));
const Report_Chart = React.lazy(()=> import("../containers/report/chart"));
const Subscription = React.lazy(()=> import("../containers/subscription"));
const RealMarket = React.lazy(()=> import("../containers/market/real"));
const SHistory = React.lazy(()=> import("../containers/market/sHistory"));
const MoneyFlowAnalyser = React.lazy(()=> import("../containers/market/moneyflowAnalyser"));

export const publicRoute = [
  {
    path: "/",
    component: Home,
    layout: 'public'
  },
  {
    path: "/treemap",
    component: Treemap,
    layout: 'public'
  },
  {
    path: "/industries/:id",
    component: Industries,
    layout: 'public'
  },
  {
    path: "/industries/history/:id",
    component: Industry_History,
    layout: 'public'
  },
  {
    path: "/chart/daily/:id",
    component: Daily_Chart,
    layout: 'public'
  },
  {
    path: "/reports",
    component: Report,
    layout: 'public'
  },
  {
    path: "/reports/chart/:id",
    component: Report_Chart,
    layout: 'public'
  },
  {
    path: "/subscription",
    component: Subscription,
    layout: 'public'
  },
  {
    path: "/market/real/:id",
    component: RealMarket,
    layout: 'public'
  },
  {
    path: "/shistory/:id",
    component: SHistory,
    layout: 'public'
  },
  {
    path: "/market/moneyflowanalyser/:id",
    component: MoneyFlowAnalyser,
    layout: "public"
  }
]