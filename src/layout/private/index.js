import React, { Suspense,useEffect,useState } from 'react';
import BigLoading from '../../components/bigLoading';
import { Link } from 'react-router-dom';
import { Alert, Button, Center } from '@mantine/core';
import Header from '../public/components/header';
import Footer from '../public/components/footer';
import Sidebar from '../../layouts/sidebar';
import { useCookies } from 'react-cookie';

const Index = ({ Component, route ,props}) => {
  let [open, setopen] = useState(false);
  let closeMenu = () => setopen(false);
  let openMenu = () => setopen(true);
  const [cookies, setCookie] = useCookies(['token']);

  return (
    <>
      <Header setOpen={openMenu} />
      <Sidebar open={open} setOpen={closeMenu} />
      <div className="pt-16 lg:pt-[7rem] bg-gray-100 pb-20 min-h-screen">
        <div className="container pt-3">
          <div className="my-4 mt-10">
            <Suspense fallback={<BigLoading />}>
            <>
                  {cookies.token ? (
                    <Component route={route} />
                  ) : (
                    <Center sx={{ width: '100%' }}>
                      <Alert
                        variant="filled"
                        className="w-full flex flex-col items-center text-center"
                        color="red"
                        title="اجازه ورود به این صفحه را ندارید"
                      >
                        <Link to="/login">
                          <Button variant="light" color="red">
                            ورود
                          </Button>
                        </Link>
                      </Alert>
                    </Center>
                  )}
                </>
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};


export default Index;