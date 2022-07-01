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
import { BsPlusLg, BsXLg } from 'react-icons/bs';
import { connect } from 'react-redux';
import lodash from 'lodash';
import { setTechnoWatchFilter } from '../../../../redux/reducers/extra/technowatch';


class FilterModal extends Component {
  constructor(props) {
    super(props);

    /**
     * All of headers without any filter
     * @type {Array}
     */
    let headers = this.props.headers;
    headers = headers.filter((item, index) => index !== 0);

    /**
     * export all headers by their name
     * @type {Array}
     */
    let headersByName = [];
    headers.map((item, index) =>
      headersByName.push({ value: `n${index + 1}`, label: item.name })
    );
    this.state = {
      headers: headersByName,
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
                      <BsXLg />
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
                rightIcon={<BsPlusLg />}
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
