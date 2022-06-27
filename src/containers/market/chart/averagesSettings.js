import { Component } from 'react';
import { MultiSelect } from '@mantine/core';
import { connect } from 'react-redux';
import { getEveryFeeder } from '../../../apis/main/main';
import {setMarket} from "../../../redux/reducers/market";
import lodash from 'lodash'

class AverageSettings extends Component {

  async getAverages(id = this.props.group) {
    let market = this.props.averages;
    let find = market.find((item) => item.id === id);
    console.log(find)
    if ('averages' in find === false) {
      try {
        let shortterm = await getEveryFeeder(
          `/market/movingAveragePrice/${id}/10`
        );
        let midterm = await getEveryFeeder(
          `/market/movingAveragePrice/${id}/20`
        );
        let longterm = await getEveryFeeder(
          `/market/movingAveragePrice/${id}/50`
        );
        let shortmovingterm = await getEveryFeeder(
          `/market/movingAveragePrice/${id}/10`
        );
        let midtmovingterm = await getEveryFeeder(
          `/market/movingAveragePrice/${id}/20`
        );
        let longtmovingterm = await getEveryFeeder(
          `/market/movingAveragePrice/${id}/50`
        );
        this.props.setAverages({
          id: this.props.group,
          averages: {
            shortterm: shortterm.data.data,
            midterm: midterm.data.data,
            longterm: longterm.data.data,
            shortmovingterm: shortmovingterm.data.data,
            midtmovingterm: midtmovingterm.data.data,
            longtmovingterm: longtmovingterm.data.data,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(lodash.isEqual(nextProps, this.props)){
      return false
    }
    else {
      this.getAverages();
      return true
    }
  }

  componentDidMount(){
    this.getAverages();
  }


  render() {
    return (
      <div className="relative">
        <MultiSelect
          clearable
          placeholder="انتخاب کنید"
          label="میانگین ها"
          // onChange={(e) => this.averagesDisplaySettings(e)}
          data={[
            { value: '0', label: 'کوتاه مدت' },
            { value: '1', label: 'میان مدت' },
            { value: '2', label: 'بلند مدت' },
            { value: '3', label: 'متحرک کوتاه مدت' },
            { value: '4', label: 'متحرک میان مدت' },
            { value: '5', label: 'متحرک بلند مدت' },
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  averages: state.market,
});

const mapDispatchToProps = (dispatch) => ({
  setAverages: (data) => dispatch(setMarket(data)),
})

export default connect(mapStateToProps,mapDispatchToProps)(AverageSettings);
