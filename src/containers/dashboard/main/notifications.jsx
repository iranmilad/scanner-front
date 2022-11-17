import { Component } from 'react';
import {
  ActionIcon,
  Card,
  Center,
  Group,
  Loader,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import lodash from 'lodash';
import { setReportList } from '../../../redux/reducers/config';
import { connect } from 'react-redux';
import { getEveryUser, getEveryFeeder } from '../../../apis/main';
import { withRouter } from 'react-router-dom';
import { data } from 'autoprefixer';

class Notifications extends Component {
  state = {
    loading: true,
    data: [],
  };
  async getNotifications() {
    this.setState({ loading: true });
    getEveryUser('/user/member-lists', { token: true })
      .then((res) => {
        this.setState({
          data: res.data.data,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  stockInfo(id) {
    let items = this.props.reportList;
    let item = items.find((item) => item.id === id);
    return item;
  }

  /**
   *
   * @param {array} arry
   * @return
   */
  noStock(arry) {
    let count = 0;
    arry.map((item) => (!this.stockInfo(item.title) ? count++ : null));
    if (arry.length === count) return false;
    return true;
  }

  async componentDidMount() {
    this.getNotifications();
  }
  render() {
    return (
      <>
        <Text size="lg" weight="bold" mb="lg">
          اعلان های فعال شده
        </Text>
        {this.state.loading ? (
          <Center>
            <Loader variant="dots" />
          </Center>
        ) : (
          <>
            {lodash.isEmpty(this.state.data) ? (
              <Center>
                <Text>اعلانی فعال نشده</Text>
              </Center>
            ) : (
              <ScrollArea type="always" style={{ height: this.noStock ? 'auto' : 300 }}>
                <Stack>
                  {this.state.data.map((item, index) => {
                    if (this.stockInfo(item.title)) {
                      return (
                        <Card
                          sx={{ backgroundColor: '#f5f5f5' }}
                          dir="rtl"
                          radius="sm"
                          shadow="none"
                          withBorder
                          p="sm"
                          key={index}
                        >
                          <Group position="apart">
                            <Text size="md" color="#1e293b" weight="bolder">
                              {console.log(item.title)}
                              نام کوتاه :{this.stockInfo(item.title).label}
                            </Text>
                            <ActionIcon
                              size="sm"
                              color="dark"
                              variant="filled"
                              onClick={() =>
                                this.props.history.push(`/stock/${item.title}`)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 512"
                                className="fill-white w-4 h-4"
                              >
                                <path d="M173 131.5C229.2 75.27 320.3 75.27 376.5 131.5C430 185 432.9 270.9 383 327.9L377.7 334C368.9 344 353.8 345 343.8 336.3C333.8 327.6 332.8 312.4 341.5 302.4L346.9 296.3C380.1 258.3 378.2 201.1 342.5 165.4C305.1 127.1 244.4 127.1 206.1 165.4L93.63 278.7C56.19 316.2 56.19 376.9 93.63 414.3C129.3 449.1 186.6 451.9 224.5 418.7L230.7 413.3C240.6 404.6 255.8 405.6 264.5 415.6C273.3 425.5 272.2 440.7 262.3 449.4L256.1 454.8C199.1 504.6 113.2 501.8 59.69 448.2C3.505 392.1 3.505 300.1 59.69 244.8L173 131.5zM467 380.5C410.8 436.7 319.7 436.7 263.5 380.5C209.1 326.1 207.1 241.1 256.9 184.1L261.6 178.7C270.3 168.7 285.5 167.7 295.5 176.4C305.5 185.1 306.5 200.3 297.8 210.3L293.1 215.7C259.8 253.7 261.8 310.9 297.4 346.6C334.9 384 395.6 384 433.1 346.6L546.4 233.3C583.8 195.8 583.8 135.1 546.4 97.7C510.7 62.02 453.4 60.11 415.5 93.35L409.3 98.7C399.4 107.4 384.2 106.4 375.5 96.44C366.7 86.47 367.8 71.3 377.7 62.58L383.9 57.22C440.9 7.348 526.8 10.21 580.3 63.76C636.5 119.9 636.5 211 580.3 267.2L467 380.5z" />
                              </svg>
                            </ActionIcon>
                          </Group>
                        </Card>
                      );
                    }
                    if (this.noStock) {
                      return (
                        <Center>
                          <Text>اعلانی فعال نشده</Text>
                        </Center>
                      );
                    }
                  })}
                </Stack>
              </ScrollArea>
            )}
          </>
        )}
      </>
    );
  }
}

const maptStateToProps = (state) => ({
  reportList: state.config.reportList,
  chartAndtables: state.config.needs.chartAndtables,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchReportList: (data) => dispatch(setReportList(data)),
});

export default withRouter(
  connect(maptStateToProps, mapDispatchToProps)(Notifications)
);
