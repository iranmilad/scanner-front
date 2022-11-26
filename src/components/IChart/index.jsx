import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useData } from '../../helper';
import { setChart, setModal } from '../../redux/reducers/chartable/chart';
import Chart from "../Chart";

const IChart = (props) => {
  useEffect(()=>{
    window['chartable'] = {
      setModal: props.setModal,
      setChart: props.setChart,
    };
  },[])

  let item = useData(props?.item);

  return (
    <Chart  />
  )
};

// a function for generate clock time from 9:00 to 14:00 with every 1 min
export const clockTime = () => {
  let arr = [];
  for (let i = 9; i < 15; i++) {
    for (let j = 0; j < 60; j++) {
      arr.push(`${i}:${j}`);
    }
  }
  return arr;
};

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
});

/**
 * Dispatch to props
 */
const mapDispatchToProps = (dispatch) => ({
  setModal: (data) => dispatch(setModal(data)),
  setChart: (data) => dispatch(setChart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IChart);
