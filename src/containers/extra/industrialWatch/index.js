import { connect } from "react-redux";
import TechnoWatch from "../technoWatch";
import {header} from './header';


class IndustrialWatch extends TechnoWatch{
  constructor(props){
    super(props);
    this.state = {
      fullData: [],
      filteredData: [],
      openedModal: false,
      header: header,
      title: 'دیده بان گروه های صنعت',
      requestURL: 'https://feed.tseshow.com/api/IndustriesWatch',
    }
  }

    /**
   * remove first index of array
   * export array to a select type of data
   * @returns {Array}
   */
     HeadersByName() {
      /**
       * All of headers without any filter
       * @type {Array}
       */
      let headers = this.state.header;
      headers = headers.filter((item, index) => index !== 0 && index !== 1);
  
      /**
       * export all headers by their name
       * @type {Array}
       */
      let headersByName = [];
      headers.map((item, index) =>
        headersByName.push({ value: `n${index + 1}`, label: item.name })
      );
      return headersByName;
    }
}

const mapStateToProps = state => ({
  chartAndtables: state.config.needs.chartAndtables
})

export default connect(mapStateToProps)(IndustrialWatch);