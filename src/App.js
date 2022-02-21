import { MantineProvider } from '@mantine/core';
import rtlPlugin from 'stylis-plugin-rtl';
import {BrowserRouter,Routes, Route , Link} from 'react-router-dom';
import Home from './pages/home/index';
import { theme } from './helper/theme';



const App = ()=>{
  return (
    <MantineProvider 
    theme={theme}
    emotionOptions={{ key: 'mantine', stylisPlugins: [rtlPlugin] }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="gg" element={
                <div>
                  <Link to="/"><a>Home</a></Link>
                </div>
              } />
            </Routes>
          </BrowserRouter>
    </MantineProvider>
  )
}

export default App