import './assets/fonts/font.css';
import './assets/css/tailwind.css';
import React from 'react';
import ReactDOM from 'react-dom';
import rtlPlugin from 'stylis-plugin-rtl';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { theme } from './helper/theme';
import App from './containers/app';
import configureStore from './redux/store';
import { Provider } from 'react-redux';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <MantineProvider
      theme={theme}
      emotionOptions={{ key: 'rtl', stylisPlugins: [rtlPlugin] }}
    >
      <NotificationsProvider dir="rtl">
        <App />
      </NotificationsProvider>
    </MantineProvider>
  </Provider>,
  document.getElementById('root')
);
