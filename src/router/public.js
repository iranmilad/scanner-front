import React from "react";

const Home = React.lazy(()=> import("../containers/home"));

export const publicRoute = [
  {
    path: "/home",
    component: Home,
    layout: 'public'
  }
]