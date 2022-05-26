import { combineReducers } from "redux";
import mainReducer from '../reducers/main';
import configReducer from "../reducers/config";

export default combineReducers({
  main:mainReducer,
  config:configReducer,
})