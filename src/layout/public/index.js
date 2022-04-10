import { Suspense } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import BigLoading from '../../components/bigLoading';

export default ({ Component, route }) => {
  return (
    <>
      <Header />
      {/* <Sidebar open={open} setOpen={closeMenu}  /> */}
      <button onClick={()=> History.push('/register')}>Register Page</button>
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
