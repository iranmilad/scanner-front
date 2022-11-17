import { combineReducers } from "redux";
import mainReducer from '../reducers/main';
import configReducer from "../reducers/config";
import marketReducer from "../reducers/market";
import technowatch from '../reducers/extra/technowatch';
import chartable_chart from "../reducers/chartable/chart"

export default combineReducers({
  main:mainReducer,
  config:configReducer,
  market:marketReducer,
  technowatch,
  chartable_chart
})