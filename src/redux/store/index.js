import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';

export default function () {
  return configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
  });
}
