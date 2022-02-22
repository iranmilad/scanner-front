import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./assets/css/all.min.css";
if(process.env.NODE_ENV === 'production'){
    require('./assets/css/tailwind.css');
} 
else{
    require('./index.css');
}



ReactDOM.render(<App />, document.getElementById('root'));