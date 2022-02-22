import { Fragment ,useState} from 'react';
import { Menu ,Transition} from '@headlessui/react';
import { headers } from '../../helper/fakeData';
import Logo from '../../assets/images/logo.png';
import chartLogo from '../../assets/images/treemap-chart.png';

const Header = (props) => {
  return (
    <div className=" bg-gray-100">
      <div className="flex flex-row justify-between items-center p-4 bg-slate-800 h-16 shadow-sm fixed top-0 w-full" style={{zIndex: 99}}>
        <div
          className="container flex flex-row justify-between items-center"
        >
          <div className="block lg:hidden">
            <button
              onClick={()=>props.setOpen()}
              className="py-2.5 px-3 flex justify-center items-center border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              <i className="fa-solid fa-bars text-lg"></i>
            </button>
          </div>
          <div className='hidden lg:block'>
            <img src={Logo}  width="150" />
          </div>
          <div className="md:flex w-[70%] sm:w-60 md:w-80 lg:w-96 items-center bg-slate-700 rounded-md  border-2 border-transparent focus-within:border-indigo-600 transition-all">
            <input
              type="text"
              placeholder="جستجوی نماد / شرکت"
              className="p-2 bg-slate-700 rounded-md w-[90%] text-sm outline-none text-slate-200 placeholder:text-gray-400 "
            />
            <i className="fa-duotone fa-magnifying-glass text-slate-300 w[10%] mx-auto"></i>
          </div>


          <div className="flex flex-row ">
            <button className="hidden sm:flex py-2 px-3 bg-slate-700 text-slate-300 transition-all hover:bg-slate-600 rounded-md ml-3 items-center justify-center">
              <i className="fa-duotone fa-expand"></i>
            </button>
            <button className="hidden sm:flex py-2 px-3 bg-slate-700 text-slate-300 transition-all hover:bg-slate-600 rounded-md ml-3 items-center justify-center">
              <i className="fa-duotone fa-brightness"></i>
            </button>
            <button className="hidden sm:flex py-2 px-3 bg-slate-700 text-slate-300 transition-all hover:bg-slate-600 rounded-md ml-3 lg:ml-8 items-center justify-center">
              <i className="fa-duotone fa-bell"></i>
            </button>
            <button className="w-10 h-10 rounded-md">
              <img
                src="https://randomuser.me/api/portraits/men/9.jpg"
                className="w-full rounded-md"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full bg-white hidden shadow-sm py-2 h-16 lg:flex justify-between fixed top-16" style={{zIndex: 99}}>
        <div className="container flex justify-between items-center flex-row bg-white ">
          <DesktopMenu data={headers} />
        </div>
      </div>

    </div>
  );
};

const DesktopMenu = ({data}) => {
  return (
    <>
      {data.map((item, id) => (
        <div key={id} className="w-full">
          {item.children ? (
            <Menu key={id} as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex items-center hover:text-indigo-500 text-slate-600">
                  <i className={`${item.icon} ml-2`}></i>
                  <span className=''>{item.name}</span>
                  <i className="fa-solid fa-chevron-down text-xs text-slate-600 mr-3"></i>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    {item.children.map((child, id) => (
                      <Menu.Item key={id}>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? 'bg-slate-700 text-white'
                                : 'text-gray-900'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm text-right my-1`}
                          >
                            {child.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <button className="py-2 px-3 text-slate-600 hover:text-indigo-500 text-sm flex items-center">
              {id === 5 ? <img src={chartLogo} className='w-4 ml-2' /> : <i className={`${item.icon} ml-3`}></i>}
              <span>{item.name}</span>
            </button>
          )}
        </div>
      ))}
    </>
  );
};

export default Header;
