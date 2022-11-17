import React from 'react';
import { Button } from '@mantine/core';
import { Text } from '@mantine/core';
import { Link } from 'react-router-dom';

function Lockbox({ image, title }) {
  return (
    <div className="h-full z-10">
      <img
        src={image}
        className="w-96 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        alt='Logo'
      />
      <div className="bg-slate-700 bg-opacity-80 px-5 space-y-3 rounded-lg absolute left-0 top-0 w-full h-full flex items-center justify-center flex-col z-10">
      <Text size="sm" mb="lg" sx={{zIndex:50}} color="white" className='top-4 right-5 absolute'>
        {title}
      </Text>
        <i className="fa-solid fa-lock-keyhole text-3xl text-white md:text-lg lg:text-3xl "></i>
        <Text color="white" size="sm">
          برای استفاده از این قابلیت به حساب کاربری خود وارد شوید
        </Text>
        <Link to="/login">
          <Button color="blue" sx={{ fontWeight: 'normal' }}>
            ورود
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Lockbox;
