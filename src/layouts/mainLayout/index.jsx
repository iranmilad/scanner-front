import React, { Component, useState } from 'react';
import DataTable from 'react-data-table-component';
import Header from '../header';

import { TableDesign } from '../../helper/theme';
import {firstChart} from '../../helper/fakeData'
import Sidebar from '../sidebar';
import Footer from '../footer';
import { Helmet } from 'react-helmet';
import {Title } from '@mantine/core';

class MainLayout extends Component{
  render(){
    return (
      <>
        <Header />
        <div className='mt-16 lg:mt-[8rem]'>
          <div className='container pt-7'>
            <Title  order={3}>{this.props.title}</Title>
            <div className='my-4'>
              {this.props.children}
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

// function MainLayout() {
//   let charts = [];
//   useEffect(()=>{
//     charts.push(firstChart)
//   },[])
  
//   return (
//     <>
//       <Helmet>
//         <title>صفحه خانه</title>
//       </Helmet>

//       <Header />
//       <div className="mt-16 lg:mt-[8rem]">
//         <div className="container pt-10">
//           <span className="text-slate-600 text-lg font-normal">صفحه خانه</span>

//           {/* FIRST CHART */}
//           <div className="shadow-sm bg-white p-3 rounded-md my-4">
//             <div className="flex flex-row justify-between mb-4 ">
//               <span className="text-base font-bold text-slate-500 w-full lg:w-auto">
//                 خلاصه معاملات خرد سهام و صندوق ها
//               </span>
//               <div className="flex items-center w-16 lg:w-auto">
//                 <span className="ml-3">تعدیل نشده</span>
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   name=""
//                   id=""
//                 />
//               </div>
//             </div>
//             <DataTable
//               customStyles={TableDesign}
//               columns={summaryOfRetailTable.header}
//               data={summaryOfRetailTable.data}
//             />
//           </div>
//           {/* FIRST CHARRT */}

//           {/* SECOND CHART */}
//           <div className="shadow-sm bg-white p-3 rounded-md my-4">
//             <div className="flex flex-row justify-between mb-4">
//               <span className="text-base font-bold text-slate-500">
//                 آمار تفکیک شده معاملات خرد
//               </span>
//             </div>
//             <DataTable
//               customStyles={TableDesign}
//               columns={Separated_statistics_micro_transactions.header}
//               data={Separated_statistics_micro_transactions.data}
//               className="-striped -highlight"
//             />
//           </div>
//           {/* SECOND CHARRT */}

//           {/* THIRD CHART */}
//           <div className="shadow-sm bg-white p-3 rounded-md my-4">
//             <div className="flex flex-row justify-between mb-4">
//               <span className="text-base font-bold text-slate-500">
//                 آمار تفکیک شده معاملات خرد
//               </span>
//             </div>
//             <DataTable
//               customStyles={TableDesign}
//               columns={Real_Legal.header}
//               data={Real_Legal.data}
//               className="-striped -highlight"
//             />
//           </div>
//           {/* THIRD CHARRT */}



//           <div className="shadow-sm bg-white p-3 rounded-md my-4">
//             <div className="flex flex-row justify-between mb-4">
//               <span className="text-base font-bold text-slate-500">
//                 خلاصه معاملات صنایع بورس
//               </span>
//             </div>
//             <DataTable
//               customStyles={TableDesign}
//               columns={Summary_exchanges.header}
//               data={Summary_exchanges.data}
//               className="custom-scroll"
//             />
//             <div className="px-4 py-2">
//               <Text className='inline-block ml-4'>برای مشاهده گروه های بیشتر به حساب کاربری خود وارد شوید</Text>
//               <Button color="indigo" size='xs'>ورود</Button>
//             </div>
//           </div>
//         </div>
//       </div>

//     </>
//   );
// }

export default MainLayout;
