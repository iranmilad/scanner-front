import React from "react";

const Home = React.lazy(()=> import("../containers/home"));
const Treemap = React.lazy(()=> import("../containers/treemap"));
const Industries = React.lazy(()=>import("../containers/industries"));
const Industry_History = React.lazy(()=> import("../containers/industries/history"));

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
  }
]