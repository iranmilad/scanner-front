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
  Alert,
  Stack,
} from '@mantine/core';
import { connect } from 'react-redux';
import lodash from 'lodash';
import { setTechnoWatchFilter } from '../../../../redux/reducers/extra/technowatch';


class FilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: this.props.headers,
      selectedHeaders: [],
      items: [],
      errors: [],
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
    let items = this.state.items.filter((item, i) => i !== index);
    this.setState({
      items
    });
    this.props.TechnoWatchFilter(items);
    this.props.filter(items);
    if (this.state.items.length - 1 === 0){
      this.setState({ errors: [] })
      this.props.TechnoWatchFilter([]);
      this.props.filter([]);
    } ;
  };

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
  };

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
  };

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
  };

  Validate() {
    let errors = [];
    this.state.items.map((item, index) => {
      if (item.name === '') {
        errors.push('هیچ نام ستونی نباید خالی باشد');
      }

      if (item.min !== '' && item.max !== '') {
        if (+item.min > +item.max) {
          return errors.push('حداقل ستون باید کوچکتر از حداکثر ستون باشد');
        }
      }

      if (item.max !== '' && item.min === '') return;

      if (item.min !== '' && item.max === '') return;

      if (item.min === '' && item.max === '')
        errors.push('در یک فیلتر حداقل و حداکثر خالی میباشد');
    });
    // remove duplicates
    errors = lodash.uniq(errors);

    if (errors.length === 0) {

      // check doesnt two simliam items by name
      if (this.state.items.length > 1) {
        let items = this.state.items;
        let itemsByName = [];
        items.map((item) => itemsByName.push(item.name));
        let hasDuplicates = (arr) => new Set(arr).size != arr.length;
        if (hasDuplicates(itemsByName)) {
          errors.push('نام ستون ها نباید تکراری باشد');
          return this.setState({ errors });
        }
      }
      this.setState({ errors: [] });
      this.props.TechnoWatchFilter(this.state.items);
      this.props.filter(this.state.items);
    } 
    else {
      this.setState({ errors });
    }
  }

  clearAllFilters = () => {
    this.setState({ items: [],errors:[] });
    this.props.TechnoWatchFilter([]);
    this.props.filter();
  }

  componentDidMount() {
    this.setState({ items: this.props.filterParams });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState || this.props !== nextProps) {
      if (nextProps.opened !== this.props.opened) {
        this.setState({ items: this.props.filterParams });
      }
      return true;
    }
    return false;
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
        <Stack mb="md" spacing="xs">
          {this.state.errors.map((item, index) => (
            <Alert key={index} title={item} color="red" variant="filled" />
          ))}
        </Stack>
        <ScrollArea style={{ height: 400 }} dir="rtl">
          {this.state.items.length <= this.state.headers.length && (
            <>
              {this.state.items.map((item, index) => (
                <Grid key={index} className="w-full">
                  <Grid.Col span={4}>
                    {this.state.headers && (
                      <Select
                      onChange={(e) => this.UpdateName(index, e)}
                        zIndex={9999999999}
                        placeholder="نام ستون"
                        data={this.state.headers}
                        defaultValue={item.name}
                      />
                    )}
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Input
                      placeholder="حداقل"
                      value={item.min}
                      onChange={(e) => this.UpdateMin(index, e.target.value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Input
                      placeholder="حداکثر"
                      value={item.max}
                      onChange={(e) => this.UpdateMax(index, e.target.value)}
                    />
                  </Grid.Col>
                  <Grid.Col span={1} className="flex items-center">
                    <ActionIcon
                      color="red"
                      size="sm"
                      onClick={() => this.RemoveItem(index)}
                    >
                      <svg className='w-3 h-3 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
                    </ActionIcon>
                  </Grid.Col>
                </Grid>
              ))}
            </>
          )}
          <Center>
            {this.state.items.length < this.state.headers.length && (
              <Button
                onClick={() => this.AddNewItem()}
                mt="md"
                size="sm"
                color="blue"
                variant='filled'
                rightIcon={<svg className='w-3 h-3 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></svg>}
              >
                افزودن
              </Button>
            )}
          </Center>
        </ScrollArea>
        <Group position="apart">
          <Button size="sm" color="green" onClick={() => this.Validate()}>
            ثبت
          </Button>
          <Button
            size="sm"
            color="red"
            onClick={() => this.clearAllFilters()}
          >
            پاک کردن همه
          </Button>
        </Group>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  filterParams: state.technowatch.filterParams,
});

const mapDispatchToProps = (dispatch) => ({
  TechnoWatchFilter: (data) => dispatch(setTechnoWatchFilter(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
