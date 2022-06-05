import React from 'react';

const Market_Values = React.lazy(()=>import("../containers/report/marketValues"));
const Order_Watch = React.lazy(()=> import("../containers/extra/orderWatch"));

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
  }
]