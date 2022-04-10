import React from "react";

const Home = React.lazy(()=> import("../containers/home"));
const Treemap = React.lazy(()=> import("../containers/treemap"));

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
  }
]