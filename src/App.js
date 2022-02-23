import { MantineProvider } from '@mantine/core';
import rtlPlugin from 'stylis-plugin-rtl';
import {BrowserRouter,Routes, Route , Link} from 'react-router-dom';
import Home from './pages/home/index';
import Register from './pages/register'
import { theme } from './helper/theme';
import configureStore from './redux/store/index';
import {Provider} from 'react-redux'

const store = configureStore();

const App = ()=>{
  return (
    <Provider store={store}>
    <MantineProvider 
    theme={theme}
    emotionOptions={{ key: 'mantine', stylisPlugins: [rtlPlugin] }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </BrowserRouter>
    </MantineProvider>
    </Provider>
  )
}

export default App