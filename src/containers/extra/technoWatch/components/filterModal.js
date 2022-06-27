import { Component } from 'react';
import {
  Group,
  Modal,
  Button,
  ScrollArea,
  Grid,
  Input,
  Center,
  ActionIcon,
  Select,
} from '@mantine/core';
import { BsPlusLg, BsXLg } from 'react-icons/bs';

class FilterModal extends Component {
  constructor(props) {
    super(props);

    /**
     * All of headers without any filter
     * @type {Array}
     */
    let headers = this.props.headers;
    headers = headers.filter((item,index) => index !== 0);

    /**
     * export all headers by their name
     * @type {Array}
     */
    let headersByName = [];

    headers.map((item,index) => headersByName.push({value: index, label: item.name}));
    this.state = {
      headers: headersByName,
      selectedHeaders: [],
      items: [],
    };
  }

  /**
   * Add Empty Item
   */
  AddNewItem = () => {
    this.setState({
      items: [
        ...this.state.items,
        {
          name: '',
          max: '',
          min: '',
        },
      ],
    });
  };

  /**
   * Remove Item by index
   * @param {number} index 
   */
  RemoveItem = (index) => {
    this.setState({
      items: this.state.items.filter((item, i) => i !== index),
    });
  }

    /**
   * Update Item max value
   * @param {number} index 
   * @param {string} value 
   */
     UpdateMax = (index, value) => {
      this.setState({
        items: this.state.items.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              max: value,
            };
          }
          return item;
        }),
      });
    } 

  /**
   * Update Item min value
   * @param {number} index 
   * @param {string} value 
   */
  UpdateMin = (index, value) => {
    this.setState({
      items: this.state.items.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            min: value,
          };
        }
        return item;
      }),
    });
  } 

    /**
   * Update Item name value
   * @param {number} index 
   * @param {string} value 
   */
     UpdateName = (index, value) => {
      this.setState({
        items: this.state.items.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              name: value,
            };
          }
          return item;
        }),
      });
    } 

    RemoveExistHeader = (index) => {
      
    }


  render() {
    return (
      <Modal
        opened={this.props.opened}
        zIndex={9999999999}
        onClose={() => this.props.ModalAction()}
        size="lg"
        title="فیلتر جدول"
        sx={(theme) => ({ '.mantine-Modal-body': { position: 'relative' } })}
      >
        <ScrollArea style={{ height: 400 }} dir="rtl" >
          {this.state.items.map((item, index) => (
            <Grid key={index}>
              <Grid.Col span={4}>
                <Select 
                zIndex={9999999999}
                placeholder='واحد'
                  data={this.state.headers}
                  onChange={(e)=>this.UpdateName(index,e)}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Input placeholder="حداقل" onChange={(e)=>this.UpdateMax(index,e.target.value)}  />
              </Grid.Col>
              <Grid.Col span={3}>
                <Input placeholder="حداکثر" onChange={(e)=>this.UpdateMin(index,e.target.value)} />
              </Grid.Col>
              <Grid.Col span={1} className="flex items-center">
                <ActionIcon color="red" size="sm" onClick={()=> this.RemoveItem(index)}>
                  <BsXLg />
                </ActionIcon>
              </Grid.Col>
            </Grid>
          ))}
          <Center>
            <Button
              onClick={() => this.AddNewItem()}
              mt="md"
              size="sm"
              rightIcon={<BsPlusLg />}
            >
              افزودن
            </Button>
          </Center>
        </ScrollArea>
        <Group position="apart">
          <Button size="sm" color="green" onClick={()=>console.log(this.state.items)}>
            ثبت
          </Button>
          <Button size="sm" color="red">
            پاک کردن
          </Button>
        </Group>
      </Modal>
    );
  }
}

export default FilterModal;
