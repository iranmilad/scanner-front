import { useState } from 'react';
import Header from '../header';
import Sidebar from '../sidebar';
import Footer from '../footer';
import {Title } from '@mantine/core';

const MainLayout = (props)=>{
  const [open,setOpen] = useState(false);
  const closeMenu = ()=>setOpen(!open);
  return (
    <>
      <Header setOpen={closeMenu} />
      <Sidebar open={open} setOpen={closeMenu}  />
      <div className='mt-16 lg:mt-[8rem] bg-gray-100 pb-20'>
        <div className='container pt-7'>
          <Title  order={3}>{props.title}</Title>
          <div className='my-4'>
            {props.children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default MainLayout;
