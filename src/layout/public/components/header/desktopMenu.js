import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import chartLogo from '../../../../assets/images/treemap-chart.png';

const DesktopMenu = ({ data }) => {
  return (
    <>
      {data.map((item, id) => (
        <div key={id} className="w-full">
          {item.children ? (
            <Menu key={id} as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex items-center hover:text-indigo-500 text-slate-600">
                  <i className={`${item.icon} ml-2`}></i>
                  <span className="">{item.name}</span>
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
              {id === 5 ? (
                <img src={chartLogo} className="w-4 ml-2" />
              ) : (
                <i className={`${item.icon} ml-3`}></i>
              )}
              <span>{item.name}</span>
            </button>
          )}
        </div>
      ))}
    </>
  );
};

export default DesktopMenu