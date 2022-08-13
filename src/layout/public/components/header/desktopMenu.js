import { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import chartLogo from '../../../../assets/images/treemap-chart.png';
import { Link } from 'react-router-dom';

const DesktopMenu = ({ data, props, marketid }) => {
  function isValidImageData(string) {
    const pattern = /data/g;
    return pattern.test(string);
  }

  return (
    <>
      {data.map((item, id) => (
        <div key={id} className="w-max flex">
          {item.children ? (
            <Menu key={id} as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex items-center hover:text-blue-500 text-slate-600 group">
                  {'icon' in item && (
                    <>
                      {isValidImageData(item.icon) ? (
                        <img src={item.icon} className="w-4 ml-2" />
                      ) : (
                        <>
                          {typeof item.icon === 'string' ? (
                            <i className={`${item.icon} ml-2`}></i>
                          ) : (
                            item.icon
                          )}
                        </>
                      )}
                    </>
                  )}
                  <span className="text-sm">{item.name}</span>
                  <svg className='w-3 h-3 fill-gray-600 mr-3 group-hover:fill-blue-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"/></svg>
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
                          <Link to={child.link}>
                            <button
                              className={`${
                                active
                                  ? 'bg-slate-700 text-white'
                                  : 'text-gray-900'
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm text-right my-1`}
                            >
                              {child.name}
                            </button>
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <Link
              className="w-max text-slate-600 hover:text-blue-500 text-sm flex items-center group"
              to={`${item.link}${item.replace ? `/${marketid}` : ''}`}
            >
              {'icon' in item && (
                <>
                  {isValidImageData(item.icon) ? (
                    <img src={item.icon} className="w-4 ml-2" />
                  ) : (
                    <>
                      {typeof item.icon === 'string' ? (
                        <i className={`${item.icon} ml-3`}></i>
                      ) : (
                        item.icon
                      )}
                    </>
                  )}
                </>
              )}
              <span>{item.name}</span>
            </Link>
          )}
        </div>
      ))}
    </>
  );
};

export default DesktopMenu;
