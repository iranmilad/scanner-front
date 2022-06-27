import { Component } from 'react';
import {Modal,Text,Group,Input,Button} from '@mantine/core'
import { Helmet } from 'react-helmet';
import ITable from '../../../components/ITable';
import {matchSorter} from 'match-sorter';
import FilterModal from './components/filterModal';
import {header} from './headers'

/**
 * All industries in Table with filter them
 * @extends Component
 */
class TechnoWatch extends Component{
  state = {
    fullData: [],
    filteredData: [],
    openedModal: false,
  }

  /**
   * Filter Table by name
   * @param {string} value 
   */
  FilterDataByName = (value) => {
    let filter = matchSorter(this.state.fullData,value,{keys: ['n0']});
    this.setState({filteredData: filter})
  }

  /**
   * set filtered data to state
   * @param {*} value 
   */
  filterByAllHeaders = (value) => {
    this.setState({filteredData: value});
  }

  /**
   * Modal Action Worker - Open or Close Modal
   */
  ModalAction = () => {
    this.setState({openedModal: !this.state.openedModal})
  }
  render(){
    return (
      <>
        <Helmet>
          <title>دیده بان تکنیکال</title>
        </Helmet>
        <Text size="sm">دیده بان تکنیکال</Text>
        <Group position='apart' mt="lg">
          <Input type="text" placeholder='جستجو در نماد ها' />
          <Button size='sm' onClick={()=> this.ModalAction()}>فیلتر</Button>
        </Group>
        <FilterModal headers={header} opened={this.state.openedModal} ModalAction={this.ModalAction} />
      </>
    )
  }
}

export default TechnoWatch;