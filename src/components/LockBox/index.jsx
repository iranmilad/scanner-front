import React from 'react';

function Lockbox({image}) {
  return (
    <div className='relative h-56'>
      <img src={image} className="w-96 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className='bg-slate-700 bg-opacity-80 px-5 space-y-3 rounded-lg absolute left-0 top-0 w-full h-full flex items-center justify-center flex-col'>
      <i className="fa-solid fa-lock-keyhole text-3xl text-white md:text-lg lg:text-3xl "></i>
        <p className='text-sm text-center text-white md:text-xs lg:text-sm'>برای استفاده از این قابلیت به حساب کاربری خود وارد شوید</p>
        <button className='px-4 py-2 bg-indigo-500 text-white rounded-md text-sm md:text-xs lg:text-sm'>ورود </button>
      </div>
    </div>
  );
}

export default Lockbox;
