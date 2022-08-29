import TechnoWatch from '../technoWatch';
import { header } from './header';

class SignalWatch extends TechnoWatch {
  constructor(props) {
    super(props);
    this.state = {
      fullData: [],
      filteredData: [],
      openedModal: false,
      header: header,
      title: 'دیده بان جریانات نقدینگی بلندمدت',
      requestURL: 'https://feed.tseshow.com/api/SignalWatch',
    };
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
    headers = headers.filter((item, index) => index > 7 && index < 23);

    /**
     * export all headers by their name
     * @type {Array}
     */
     let headersByName = [];
     headers.map((item, index) =>
       headersByName.push({ value: `n${index + 8}`, label: item.name })
     );
     return headersByName;
  }
}

export default SignalWatch;
