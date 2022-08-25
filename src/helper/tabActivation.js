import { useEffect } from 'react';

const TabActivation = () => {
  useEffect(() => {
    document.addEventListener('visibilitychange', () => {
      window['tabActivation'] =
        document.visibilityState === 'visible' ? true : false;
    });
  }, []);
  return <></>;
};

export default TabActivation;
