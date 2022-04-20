import { combineReducers } from "redux";
import mainReducer from '../reducers/main';
import configReducer from "../reducers/config";
import { connectRouter } from "connected-react-router";
import {History} from '../../helper/history';

export default combineReducers({
  main:mainReducer,
  config:configReducer,
})