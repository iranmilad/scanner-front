import { useMemo } from 'react';
import { BrowserRouter, Switch, Route, HashRouter } from 'react-router-dom';
import { PublicLayout, AuthLayout, PrivateLayout } from '../../layout';
import Routes from '../../router';
import { withRouter } from 'react-router';
import NotFound from '../../components/notFound';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getEveryUser } from '../../apis/main/';
import { setConfig } from '../../redux/reducers/config';
import BigLoading from '../../components/bigLoading';
import { ActionIcon, Center, Text } from '@mantine/core';
import ScrollToTop from './scrollToTop';
import { CookiesProvider } from 'react-cookie';
import HandleRoutes from './handleRoutes';
import { useCookies } from 'react-cookie';
import RoutesContext from '../../contexts/routes';
import CheckInternet from '../../helper/checkInternet';
import TabActivation from '../../helper/tabActivation';

const App = () => {
  // dispatching states
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(false);
  let [stockID, setStockID] = useState(null);
  let [headerType, setHeaderType] = useState(0);
  const [cookies, setCookies,removeCookie] = useCookies(['token']);

  const layoutManager = (item, key) => {
    switch (item.layout) {
      case 'public':
        return (
          <Route
            key={key}
            exact={true}
            strict={true}
            path={item.path}
            render={withRouter((route) => (
              <PublicLayout
                route={route}
                Component={item.component}
                options={item.options || {}}
              />
            ))}
          />
        );
      case 'auth':
        return (
          <Route
            key={key}
            exact={true}
            strict={true}
            path={item.path}
            render={withRouter((route) => (
              <AuthLayout
                route={route}
                Component={item.component}
                options={item.options || {}}
              />
            ))}
          />
        );
      case 'private':
        return (
          <Route
            key={key}
            exact={true}
            strict={true}
            path={item.path}
            render={withRouter((route) => (
              <PrivateLayout
                route={route}
                Component={item.component}
                options={item.options || {}}
              />
            ))}
          />
        );
      default:
        return (
          <Route
            key={key}
            exact={true}
            path={item.path}
            component={item.component}
            options={item.options || {}}
          />
        );
    }
  };

  const contextValues = useMemo(
    () => ({
      stockID,
      setStockID,
      headerType,
      setHeaderType,
    }),
    [stockID, headerType]
  );

  /**
   * use router in a loop to render all routes
   * @returns {void}
   */
  const switchRoutes = () => {
    return Routes.map((route, key) => {
      return layoutManager(route, key);
    });
  };

  /**
   * send request to server every 2 second
   * get all configs for first time
   * set config to redux
   */
  useEffect(async () => {
    try {
      await getOriginalConfig();
    } catch (error) {
      console.log(error);
    }
  }, []);

  function getOriginalConfig() {
    setLoading(true);
    setError(false);
    // return new Promise((resolve,reject) => {
    //   axios.get("").then(res => {
    //     dispatch(setConfig(res.data));
    //     setLoading(false);
    //     setError(false);
    //     resolve(res.data);
    //   })
    // })
    return new Promise((resolve, reject) => {
      const token = cookies.token ? true : false;
      getEveryUser('/home/data',{token})
        .then((res) => {
          dispatch(setConfig(res.data));
          if(token && res.data.profile === null){
            removeCookie('token')
          }
          setLoading(false);
          setError(false);
          resolve(res.data);
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
          reject(err);
        });
    });
  }

  return (
    <>
      {loading ? (
        <BigLoading />
      ) : (
        <>
          {error ? (
            <Center
              sx={(theme) => ({
                height: '100vh',
                flexDirection: 'column',
                zIndex: 9999999999,
              })}
            >
              <Text color="blue" size="md">
                مشکلی پیش امده است ، مجدد امتحان کنید
              </Text>
              <div className="mt-5">
                <ActionIcon
                  size="lg"
                  variant="filled"
                  color="blue"
                  onClick={() => getOriginalConfig()}
                >
                  <svg
                    className="w-3 h-3 fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M496 48V192c0 17.69-14.31 32-32 32H320c-17.69 0-32-14.31-32-32s14.31-32 32-32h63.39c-29.97-39.7-77.25-63.78-127.6-63.78C167.7 96.22 96 167.9 96 256s71.69 159.8 159.8 159.8c34.88 0 68.03-11.03 95.88-31.94c14.22-10.53 34.22-7.75 44.81 6.375c10.59 14.16 7.75 34.22-6.375 44.81c-39.03 29.28-85.36 44.86-134.2 44.86C132.5 479.9 32 379.4 32 256s100.5-223.9 223.9-223.9c69.15 0 134 32.47 176.1 86.12V48c0-17.69 14.31-32 32-32S496 30.31 496 48z" />
                  </svg>
                </ActionIcon>
              </div>
            </Center>
          ) : (
            <RoutesContext.Provider value={contextValues}>
              <BrowserRouter>
                <CookiesProvider>
                  <ScrollToTop />
                  <HandleRoutes />
                  <CheckInternet />
                  <TabActivation />
                  <Switch>
                    {switchRoutes()}
                    <Route component={NotFound} />
                  </Switch>
                </CookiesProvider>
              </BrowserRouter>
            </RoutesContext.Provider>
          )}
        </>
      )}
    </>
  );
};

export default App;
