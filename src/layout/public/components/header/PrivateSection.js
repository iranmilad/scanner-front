import React, { Component } from "react";
import {getLocalStorage} from '../../../../helper/localStorage';
import {Button} from '@mantine/core';
import {History} from '../../../../helper/history';


class PrivateSection extends React.PureComponent{
  render(){
    if(getLocalStorage('userToken')){
      return (
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
      )
    }
    return (
        <React.Fragment>
          <Button sx={{fontWeight:"normal"}} color="indigo" onClick={()=>History.push("/login")}>ورود</Button>
        </React.Fragment>
    )
  }
}

export default PrivateSection