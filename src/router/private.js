import React from 'react';

const Market_Values = React.lazy(()=>import("../containers/report/marketValues"));
const Order_Watch = React.lazy(()=> import("../containers/extra/orderWatch"));
const Tops = React.lazy(()=> import("../containers/tops"));
const Market_Chart = React.lazy(()=> import("../containers/market/chart"));
const TechnoWatch = React.lazy(()=> import("../containers/extra/technoWatch"));

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
  }
]