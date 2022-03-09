import { combineReducers } from "redux";
import mainReducer from '../reducers/main';
import { connectRouter } from "connected-react-router";
import {History} from '../../helper/history';

export default combineReducers({
  main:mainReducer
})