import React from 'react';
import ReactDOM from 'react-dom';
import rtlPlugin from 'stylis-plugin-rtl';
import { MantineProvider } from '@mantine/core';
import { theme } from './helper/theme';
import App from './containers/app';
import './assets/fonts/font.css';
import './assets/css/tailwind.css';
import './assets/css/all.min.css';
import configureStore from './redux/store';
import { Provider } from 'react-redux';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
        <MantineProvider 
    theme={theme}
    emotionOptions={{ key: 'mantine', stylisPlugins: [rtlPlugin] }}>
      <App />
    </MantineProvider>
  </Provider>,
  document.getElementById('root')
);
