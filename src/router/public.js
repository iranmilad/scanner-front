import React from "react";

const Home = React.lazy(()=> import("../containers/home"));
const Treemap = React.lazy(()=> import("../containers/treemap"));
const Industries = React.lazy(()=>import("../containers/industries"))

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
  }
]