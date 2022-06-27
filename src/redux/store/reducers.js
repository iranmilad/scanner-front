import { combineReducers } from "redux";
import mainReducer from '../reducers/main';
import configReducer from "../reducers/config";
import marketReducer from "../reducers/market";

export default combineReducers({
  main:mainReducer,
  config:configReducer,
  market:marketReducer
})