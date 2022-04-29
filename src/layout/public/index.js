import { Suspense, useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import BigLoading from '../../components/bigLoading';
import Sidebar from '../../layouts/sidebar'
import { Container } from '@mantine/core';

export default ({ Component, route }) => {
  let [open,setopen] = useState(false);
  let closeMenu = () => setopen(false); 
  let openMenu = () => setopen(true);
  return (
    <>
      <Header setOpen={openMenu} />
      <Sidebar open={open} setOpen={closeMenu}  />
      <button onClick={()=> History.push('/register')}>Register Page</button>
      <Container>
        
      </Container>
      <div className="pt-16 lg:pt-[7rem] bg-gray-100 pb-20">
        <div className="container pt-3">
          <div className="my-4">
            <Suspense fallback={<BigLoading />}>
              <Component route={route} />
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
