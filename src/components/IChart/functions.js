import { barChart, polarAreaChart ,areaChart , lineChart} from './charts';
import {Map} from 'immutable';
import ChartData from './chartData';


export const chartType = (special)=>{
  let chartType = ChartData[special];
  let options = Map();
  switch (chartType.type) {
    case 'bar':
      options = options.merge(barChart);
      break;
    case 'polarArea':
      options = options.merge(polarAreaChart);
      break;
    case 'area':
      options = options.merge(areaChart);
      break;
    case 'line': 
      options = options.merge(lineChart);
    default:
      break;
  }

  let immutableOptions = options.get('options');
  let optionsCopy = Object.assign({},immutableOptions,ChartData[special].options);
  return optionsCopy
}