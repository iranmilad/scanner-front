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
import swDev from './swDev';
import MockRunner from "./mock";

if (process.env.REACT_APP_ENV === 'dev') {
  MockRunner();
}

/**
 * Global ClearInterval
 * It is here because of cleaner code
 * in this method , doesnt need to make seperated method in each component
 * @return {void}
 */
React.Component.prototype.clearInterval = function(){
  let keys = Object.keys(this).filter(item => item.match(/Interval|interval/g));
  keys.map(item => clearInterval(this[item]));
}

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <MantineProvider
      theme={{...theme}}
      emotionOptions={{ key: 'rtl', stylisPlugins: [rtlPlugin] }}
    >
      <NotificationsProvider dir="rtl">
        <App />
      </NotificationsProvider>
    </MantineProvider>
  </Provider>,
  document.getElementById('root')
);

swDev()
