import { Group ,Text , Input} from '@mantine/core';
import {Component} from 'react';
import ITable from '../../components/ITable';
import {getEveryFeeder} from '../../apis/main';
import {marketValues} from '../../helper/statics';
import {matchSorter} from 'match-sorter'




class MarketValues extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      filteredData: []
    }
     this.paginationComponentOptions = {
      rowsPerPageText: 'تعداد نمایش',
      rangeSeparatorText: 'از',
      selectAllRowsItem: true,
  };
  }

  async getMarketValues(){
    try {
      let response = await getEveryFeeder('/marketValues')
      this.setState({data: response.data.data, filteredData: response.data.data})
    }
    catch (error) {
      console.log(error)
    }
  }

  FilterData(value){
    let filtered = matchSorter(this.state.data, value, {keys: ['n0','n1','n2','n3']});
    this.setState({filteredData: filtered})
  }

  componentDidMount(){
    this.getMarketValues()
  }

  render(){
    return (
      <>
        <Group position='apart'>
          <Text size="sm">فهرست شرکت ها بر اساس ارزش بازار</Text>
          {this.state.data.length > 0 && <Input onChange={(e)=>this.FilterData(e.target.value)} placeholder='جستجو در جدول' />}
        </Group>
        <ITable pagination fixedHeader fixedHeaderScrollHeight="70vh" data={this.state.filteredData} column={marketValues.header} />
      </>
    )
  }
}

export default MarketValues;