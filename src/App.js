import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home/index';
import Register from './pages/register';
import configureStore from './redux/store/index';


const store = configureStore();

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
