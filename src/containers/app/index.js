import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PublicLayout, AuthLayout, PrivateLayout } from '../../layout';
import Routes from '../../router';
import { withRouter } from 'react-router';
import NotFound from '../../components/notFound';
import { getLocalStorage } from '../../helper/localStorage';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getConfig } from '../../apis/main/main';
import { setConfig } from '../../redux/reducers/config';
import BigLoading from '../../components/bigLoading';
import { ActionIcon, Center, Text } from '@mantine/core';
import { BsArrowClockwise } from 'react-icons/bs';
import { getIndustry } from '../../apis/tables';
import { setIndustries } from '../../redux/reducers/config';
import ScrollToTop from './scrollToTop';
import ls from 'localstorage-slim';

const App = () => {
  // dispatching states
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(false);

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
    let mainConfigExist = ls.get('mainConfig');
    if (mainConfigExist === null || mainConfigExist === undefined) {
      setLoading(true);
      try {
        let response = await getConfig('/home/data');
        dispatch(setConfig(response.data));
        // expire config after 1 day
        ls.set('config', response.data, { ttl: 60 * 60 * 24 });
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
  }, []);

  async function mainConfig() {
    setLoading(true);
    await getConfig('/home/data')
      .then((res) => {})
      .catch((err) => {});
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
                  // onClick={() => mainConfig()}
                >
                  <BsArrowClockwise />
                </ActionIcon>
              </div>
            </Center>
          ) : (
            <BrowserRouter>
              <ScrollToTop />
              <Switch>
                {switchRoutes()}
                <Route component={NotFound} />
              </Switch>
            </BrowserRouter>
          )}
        </>
      )}
    </>
  );
};

export default App;
