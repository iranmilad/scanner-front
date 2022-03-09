import React from "react";

const Home = React.lazy(()=> import("../containers/home"));

export const publicRoute = [
  {
    path: "/",
    component: Home,
    layout: 'public'
  }
]