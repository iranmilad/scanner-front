import { useContext } from 'react';
import Logo from '../../assets/images/logo-white.png';
import { Disclosure, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { headers, marketHeader } from '../../helper/navbar';
import { connect } from 'react-redux';
import RoutesContext from '../../contexts/routes';

const Sidebar = ({ setOpen, open, props }) => {
  let { stockID, headerType } = useContext(RoutesContext);
  let marginRight;

  switch (open) {
    case true:
      marginRight = '';
      break;
    case false:
      marginRight = '-mr-[1000px]';
      break;
    case 'menu':
      marginRight = '';
      break;
    case 'search':
      marginRight = '';
    default:
      break;
  }

  let classes = ['sideMenu', marginRight].join(' ');
  return (
    <div className={classes} style={{ zIndex: 99999999 }}>
      <div className="w-full flex items-center justify-between h-16">
        <Link to="/">
          <img src={Logo} width="150" />
        </Link>
        <button
          onClick={() => setOpen()}
          className="py-2 px-3 lg:hidden text-slate-300 transition-all hover:bg-blue-50 rounded-md flex items-center justify-center"
        >
          <svg
            className="w-5 h-5 fill-slate-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
          </svg>
        </button>
      </div>
      <div className="mb-20 w-full mt-4">
        <div className="my-3 w-full">
          <div className="w-full">
            {headerType === 0 && (
              <>
                {headers.map((item, id) => (
                  <div key={id} className="py-3">
                    <NavMenu item={item} children={item.children} />
                  </div>
                ))}
              </>
            )}
            {headerType === 1 && (
              <>
                {marketHeader.map((item, id) => (
                  <div key={id} className="py-3">
                    <NavMenu
                      item={item}
                      children={item.children}
                      stockID={stockID}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function isValidImageData(string) {
  const pattern = /data/g;
  return pattern.test(string);
}

const NavMenu = ({ item, children, stockID = null, ...props }) => {
  return (
    <>
      {children ? (
        <>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button
                  {...props}
                  className={`hover:text-slate-200 border border-b-0 border-transparent flex justify-between items-center w-full px-4 transition-all text-sm font-medium text-left text-slate-400 rounded-md ${
                    open
                      ? 'bg-slate-700 rounded-b-none border-slate-500 pt-2'
                      : ''
                  }`}
                >
                  <div className="flex items-center ">
                    {'icon' in item && (
                      <>
                        {isValidImageData(item.icon) ? (
                          <img
                            src={item.icon}
                            className="w-4 ml-4 inline-block"
                          />
                        ) : (
                          <>
                            {typeof item.icon === 'string' ? (
                              <i className={`${item.icon} ml-3`}></i>
                            ) : (
                              <span className="ml-4">{item.icon}</span>
                            )}
                          </>
                        )}
                      </>
                    )}
                    <span className={`text-[13px] `}>{item.name}</span>
                  </div>
                  <svg
                    className={`w-3 h-3 fill-gray-600 transition-all  ${
                      open ? 'transform rotate-90' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z" />
                  </svg>
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 linear h-0"
                  enterFrom="h-0"
                  enterTo="h-auto"
                  leave="transition duration-100 ease-in"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Disclosure.Panel
                    className={`w-full flex flex-col items-start `}
                  >
                    <ul className="list-outside  bg-slate-700 px-6 w-full rounded-b-md border-t-0 border border-slate-500">
                      {children.map((child, id) => (
                        <li
                          key={id}
                          className={`text-slate-500 hover:text-slate-200 bg-slate-700  text-[13px]  flex items-center transition-all duration-200 hover:mr-1 ${
                            id === 0
                              ? 'mb-5 pt-5'
                              : 'my-6'
                          }`}
                        >
                          <Link to={`${child.link}${child.replace ? `/${stockID}` : ''}`}>{child.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        </>
      ) : (
        <Link
        to={`${item.link}${item.replace ? `/${stockID}` : ''}`}
          className="text-[13px] text-slate-400 hover:text-slate-200 px-5 py-4"
        >
          {'icon' in item && (
            <>
              {isValidImageData(item.icon) ? (
                <img src={item.icon} className="w-4 ml-4 inline-block" />
              ) : (
                <>
                  {typeof item.icon === 'string' ? (
                    <i className={`${item.icon} ml-3`}></i>
                  ) : (
                    <span className="ml-4 inline-block">{item.icon}</span>
                  )}
                </>
              )}
            </>
          )}
          <span>{item.name}</span>
        </Link>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  marketHeader: state.main.mainHeaders,
  marketId: state.main.marketId,
});

export default connect(mapStateToProps)(Sidebar);
