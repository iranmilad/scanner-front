import React from 'react';

const Register = React.lazy(()=> import("../containers/auth/register"));
const Login = React.lazy(()=>import("../containers/auth/login"));

export const authRoutes = [
  {
    path: '/login',
    component: Login,
    layout: 'auth'
  },
  {
    path: '/register',
    component: Register,
    layout: 'auth'
  },
]