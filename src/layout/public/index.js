import { Suspense, useEffect, useState } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import BigLoading from '../../components/bigLoading';
import Sidebar from '../../layouts/sidebar'
import { Container } from '@mantine/core';
import Cookies from 'js-cookie';
import axios from 'axios';

export default ({ Component, route }) => {
  let [open,setopen] = useState(false);
  let closeMenu = () => setopen(false); 
  let openMenu = () => setopen(true);

  let token = localStorage.getItem('token');
  let [authed, setAuthed] = useState(false);
  useEffect(async () => {
    if(token){
      try {
        let res = await axios.get('https://user.tseshow.com/api/home/data', {
          headers: { 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${token}`
          }
        })
        if (res.data.profile === null) localStorage.removeItem('token');
          
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  return (
    <>
      <Header setOpen={openMenu} />
      <Sidebar open={open} setOpen={closeMenu}  />
      <Container>
        
      </Container>
      <div className="pt-16 lg:pt-[7rem] bg-gray-100 pb-20 min-h-screen">
        <div className="container pt-3">
          <div className="my-4 mt-10">
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
