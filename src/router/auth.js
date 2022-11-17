import React from 'react';

const Register = React.lazy(()=> import("../containers/auth/register"));
const Login = React.lazy(()=>import("../containers/auth/login"));
const ResetPassword = React.lazy(()=>import("../containers/auth/resetPassword"))

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
  {
    path: '/resetpassword',
    component: ResetPassword,
    layout: 'auth'
  }
]