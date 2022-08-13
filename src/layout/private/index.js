import Cookies from 'js-cookie';
import React, { Suspense, useEffect, useState } from 'react';
import BigLoading from '../../components/bigLoading';
import { authUser } from '../../apis/auth';
import { Link } from 'react-router-dom';
import { Alert, Button, Center } from '@mantine/core';
import Header from '../public/components/header';
import Footer from '../public/components/footer';
import Sidebar from '../../layouts/sidebar';
import axios from 'axios';
import {setConfig} from '../../redux/reducers/config';
import { useDispatch } from 'react-redux';
import ls from 'localstorage-slim'

export default ({ Component, route }) => {
  let [open, setopen] = useState(false);
  let [loading, setLoading] = useState(true);
  let closeMenu = () => setopen(false);
  let openMenu = () => setopen(true);
  const dispatch = useDispatch();

  let token = localStorage.getItem('token');
  let [authed, setAuthed] = React.useState(false);
  useEffect(async () => {
    try {
      let res = await axios.get('https://user.tseshow.com/api/home/data', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.profile !== null) {
        dispatch(setConfig(res.data));
        setAuthed(true);
        setLoading(false);
      } else {
        localStorage.removeItem('token');
        setAuthed(false);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <>
      <Header setOpen={openMenu} />
      <Sidebar open={open} setOpen={closeMenu} />
      <div className="pt-16 lg:pt-[7rem] bg-gray-100 pb-20 min-h-screen">
        <div className="container pt-3">
          <div className="my-4 mt-10">
            <Suspense fallback={<BigLoading />}>
              {loading ? (
                <Center>
                  <BigLoading />
                </Center>
              ) : (
                <>
                  {authed ? (
                    <Component route={route} />
                  ) : (
                    <Center sx={{ width: '100%' }}>
                      <Alert
                        variant="filled"
                        className="w-full flex flex-col items-center text-center"
                        color="red"
                        title="شما اجازه ورود به این صفحه را ندارید"
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
              )}
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
