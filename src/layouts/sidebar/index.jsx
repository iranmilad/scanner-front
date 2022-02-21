import Logo from '../../assets/images/logo.png';
import {Disclosure,Transition} from '@headlessui/react'
import { Link } from 'react-router-dom';
import {headers } from '../../helper/fakeData';

const recentSearch = [
  {
    title: "فولاژ",
    subTitle: "فولاد آلیاژی ایران"
  },
  {
    title: "فولاژ",
    subTitle: "فولاد آلیاژی ایران"
  },
]

const Sidebar = ({onClose,open})=>{
  const onCloseDrawer = ()=>{
    onClose(false)
  }
  let marginRight;

  switch (open){
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


  let classes = [
    'sideMenu',
    marginRight
  ].join(" ");
  return (
    <div className={classes}>
      <div className='w-full flex items-center justify-between h-16'>
      <img src={Logo}  width="150" />
        <button onClick={onCloseDrawer} className="py-2 px-3 lg:hidden text-slate-300 transition-all hover:bg-indigo-50 rounded-md flex items-center justify-center">
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>
      </div>
      <div className='mb-20 w-full mt-4'>
      {open === 'search' ? <SearchMenu recentSearch={recentSearch} /> : (
        <div className='my-3 w-full'>

          <div className='w-full'>
            <span className='text-[12px] text-gray-400 px-5 mt-5 mb-3 flex'>منو</span>
            {headers.map((item,id)=> <div key={id} className='py-1'><NavMenu item={item} children={item.children} /></div>)}
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

// Search menu
const SearchMenu = ({recentSearch})=>{
  return (
    <div className='w-full mt-9'>
      <div className="w-full flex justify-between items-center bg-slate-800 rounded-md pl-2 border-2 border-transparent focus-within:border-indigo-600 transition-all">
        <input type="text" placeholder="جستجوی نماد / شرکت" className="p-2 bg-slate-800 rounded-md text-sm w-80 outline-none placeholder:text-gray-400 " />
        <i className="fa-duotone fa-magnifying-glass text-indigo-500"></i>
      </div>

      <div className='w-full mt-10 flex items-center justify-between'>
        <span className='text-base text-slate-500 font-bold'>جستجوی اخیر : </span>
        <i className="fa-duotone fa-clock-rotate-left text-lg"></i>
      </div>


        {recentSearch.map((item,index)=>(
          <div key={index} className='bg-slate-800 p-2 py-3 flex flex-row items-center justify-between rounded-md mt-3'>
            <div className='flex flex-col'>
              <span className='font-bold text-sm text-slate-300'>{item.title}</span>
              <span className='text-xs mt-1 text-slate-400'>{item.subTitle}</span>
            </div>
            <button className='py-2 px-3 text-rose-500 rounded-md'>
              <i className="fa-solid fa-trash-can text-base"></i>
            </button>
          </div>
        ))}

    </div>
  )
}

const NavMenu = ({item,children,...props})=>{
  return (
    <>
      {children ? (
        <>
          <Disclosure >
            {({open})=>(
              <>
                <Disclosure.Button {...props} className={`hover:text-slate-200 border border-transparent flex justify-between items-center w-full px-4 py-2 transition-all text-sm font-medium text-left text-slate-400 rounded-md ${open ? 'bg-slate-700 rounded-b-none border border-b-0 border-slate-500' : ''}`}>
                  <div className='flex items-center '>
                    <i className={`${item.icon} text-lg ml-4`}></i>
                    <span className={`text-[13px] `}>{item.name}</span>
                  </div>
                  <i className={`fa-solid fa-chevron-right text-[9px] transition-all ${open ? 'transform -rotate-90' : ''}`}></i>
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 linear h-0"
                enterFrom="h-0"
                enterTo="h-auto"
                leave="transition duration-100 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Disclosure.Panel className={`w-full flex flex-col items-start `}>
                  <ul className='list-outside  bg-slate-700 px-6 w-full rounded-b-md border-t-0 border border-slate-500'>
                    {children.map((child,id)=> <li key={id} className={`hover:text-slate-200 bg-slate-700  text-[13px]  flex items-center transition-all duration-200 hover:mr-1 ${child.account ? 'text-gray-500' : 'text-gray-400'} ${id === 0 ? 'mb-5 border-t pt-5 border-slate-500' : 'my-6'}`}>{child.account ? <i className="fa-solid fa-lock-keyhole ml-3"></i> : <i className="fa-solid fa-arrow-left ml-3"></i>}<Link to={child.link}>{child.name}</Link></li>)}
                  </ul>
                </Disclosure.Panel>
              </Transition>
              
              </>
            )}
          </Disclosure>
        </>
      ) :
       <Link to={item.link} className="text-[13px] text-slate-400 hover:text-slate-200 px-5 py-2">
         <i className={`${item.icon} text-lg ml-4 py-2`}></i>
         {item.name}
        </Link>}
    </>
  )
}

export default Sidebar