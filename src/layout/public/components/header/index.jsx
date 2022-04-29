import { ActionIcon, Autocomplete } from '@mantine/core';
import { headers } from '../../../../helper/fakeData';
import LogoWhite from '../../../../assets/images/logo-white.png';
import DesktopMenu from './desktopMenu';
import PrivateSection from './PrivateSection';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <div className=" bg-gray-100">
      <div
        className="flex flex-row justify-between items-center p-4 bg-slate-800 h-16 shadow-sm fixed top-0 w-full"
        style={{ zIndex: 99 }}
      >
        <div className="container flex flex-row justify-between items-center">
          <div className="block lg:hidden">
            <button
              onClick={() => props.setOpen()}
              className="py-2.5 px-3 flex justify-center items-center border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              <i className="fa-solid fa-bars text-lg"></i>
            </button>
          </div>
          <div className="hidden lg:block">
            <Link to='/'>
              <img src={LogoWhite} width="150" />
            </Link>
          </div>
          <div className="md:flex w-[70%] sm:w-60 md:w-80 lg:w-96 items-center bg-slate-700 rounded-md">
            <Autocomplete
              color="indigo"
              placeholder="جستجوی نماد / شرکت"
              rightSection={
                <ActionIcon variant="transparent">
                  <i className="fa-duotone fa-magnifying-glass text-slate-300 w[10%] mx-auto"></i>
                </ActionIcon>
              }
              data={[]}
              sx={(theme) => ({
                width: '100%',
                background: 'transparent',
                '& .mantine-Autocomplete-input': {
                  background: 'transparent',
                  color: 'white',
                  fontSize: '13px',
                },
                '& .mantine-Autocomplete-input:focus': {
                  borderColor: `${theme.colors.indigo[6]} !important`,
                },
              })}
              variant="filled"
            />
          </div>
          <PrivateSection />
        </div>
      </div>
      <div
        className="w-full bg-white hidden shadow-sm py-2 h-16 lg:flex justify-between fixed top-16"
        style={{ zIndex: 99 }}
      >
        <div className="container flex justify-between items-center flex-row bg-white ">
          <DesktopMenu data={headers} />
        </div>
      </div>
    </div>
  );
};

export default Header;
