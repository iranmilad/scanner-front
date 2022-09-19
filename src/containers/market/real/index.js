import { Component, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { setMainHeader, setMarketId } from '../../../redux/reducers/main';
import {
  Button,
  Group,
  Modal,
  Loader,
  Text,
  ActionIcon,
  Tooltip,
  LoadingOverlay,
} from '@mantine/core';
import StockInformation from './stockInformation';
import TraderSummary from './traderSummary';
import ClientSummary from './clientSummary';
import ITable from '../../../components/ITable';
import { header as clientSummaryHeader } from './clientSummary/header';
import { getEveryFeeder, getEveryUser } from '../../../apis/main';
import { header as traderSummaryHeader } from './traderSummary/header';
import {
  bookMarkSummary,
  totlaBookMarkSummary,
  totalClientSummary,
  statementPerdiod,
  changePerfomance,
  combinationAssets,
} from './headers';
import { Paper } from '@mantine/core';
import { Title } from '@mantine/core';
import { Grid } from '@mantine/core';
import { Box } from '@mantine/core';
import colors from 'tailwindcss/colors';
import InstantCharts from './instantCharts';
import LightChart from './lightChart';
import { withRouter } from 'react-router-dom';
import RoutesContext from '../../../contexts/routes';
import { withCookies } from 'react-cookie';
import lodash from 'lodash';

/**
 * @description Real Market means Sahm - صفحه سهم
 */
class RealMarket extends Component {
  static contextType = RoutesContext;
  state = {
    marketId: this.props.route.match.params.id,
    title: '',
    stockDetails: [],
    stockDetailsModalState: false,
    id: this.props.route.match.params.id,
    stockInfo: [],
    clientSummaryData: [],
    traderSummaryData: [],
    bookMarkSummaryData: [],
    totlaBookMarkSummaryData: [],
    totalClientSummaryData: [],
    statementPerdiodData: [],
    supportResistanceData: [],
    technicalValueData: [],
    ChangePerfomanceData: [],
    CombinationAssetsData: [],
    allMembmerList: [],
    allUserMemberList: [],
    memberListLoading: false,
    navExist: false,
  };
  modalWorker = () => {
    this.setState({
      stockDetailsModalState: !this.state.stockDetailsModalState,
    });
  };

  ClientSummaryFetcher(id = this.state.id) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolClientSummery');
    getEveryFeeder(`${thatItem.feeder_url}/${id}`).then((res) => {
      this.setState({ clientSummaryData: res.data.data });
    });

    this.ClientSummaryInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${id}`).then((res) => {
        this.setState({ clientSummaryData: res.data.data });
      });
    }, thatItem.refresh_time * 1000);
  }

  TraderSummaryFetcher(id = this.state.id) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolTradeSummery');
    getEveryFeeder(`${thatItem.feeder_url}/${id}`).then((res) => {
      this.setState({ traderSummaryData: res.data.data });
    });

    this.TraderSummaryInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${id}`).then((res) => {
        this.setState({ traderSummaryData: res.data.data });
      });
    }, thatItem.refresh_time * 1000);
  }

  BookMarkSummaryFetcher(id = this.state.id) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolBookMarkSummery');
    getEveryFeeder(`${thatItem.feeder_url}/${id}`).then((res) => {
      this.setState({ bookMarkSummaryData: res.data.data });
    });

    this.BookMarkSummaryInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${id}`).then((res) => {
        this.setState({ bookMarkSummaryData: res.data.data });
      });
    }, thatItem.refresh_time * 1000);
  }

  TotlaBookMarkSummaryFetcher(id = this.state.id) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find(
      (item) => item.key === 'symboltotalBookMarkSummery'
    );
    getEveryFeeder(`${thatItem.feeder_url}/${id}`).then((res) => {
      this.setState({ totlaBookMarkSummaryData: res.data.data });
    });

    this.TotlaBookMarkSummaryInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${id}`).then((res) => {
        this.setState({ totlaBookMarkSummaryData: res.data.data });
      });
    }, thatItem.refresh_time * 1000);
  }

  totalClientSummaryFetcher(id = this.state.id) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolTotalClientSummery');
    getEveryFeeder(`${thatItem.feeder_url}/${id}`).then((res) => {
      this.setState({ totalClientSummaryData: res.data.data });
    });

    this.totalClientSummaryInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${id}`).then((res) => {
        this.setState({ totalClientSummaryData: res.data.data });
      });
    }, thatItem.refresh_time * 1000);
  }

  statementPerdiodFetcher(id = this.state.id) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolStatmentPeriod');
    getEveryFeeder(`${thatItem.feeder_url}/${id}`).then((res) => {
      this.setState({ statementPerdiodData: res.data.data });
    });

    this.statementPerdiodInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${id}`).then((res) => {
        this.setState({ statementPerdiodData: res.data.data });
      });
    }, thatItem.refresh_time * 1000);
  }

  SupportResistanceFetcher(id = this.state.id) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolSupportResistance');
    getEveryFeeder(`${thatItem.feeder_url}/${id}`).then((res) => {
      this.setState({ supportResistanceData: res.data.data });
    });

    this.SupportResistanceInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${id}`).then((res) => {
        this.setState({ supportResistanceData: res.data.data });
      });
    }, thatItem.refresh_time * 1000);
  }

  technicalValueFetcher(id = this.state.id) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolTechnicalValue');
    getEveryFeeder(`${thatItem.feeder_url}/${id}`).then((res) => {
      this.setState({ technicalValueData: res.data.data });
    });

    this.technicalValueInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${id}`).then((res) => {
        this.setState({ technicalValueData: res.data.data });
      });
    }, thatItem.refresh_time * 1000);
  }

  ChangePerfomanceFetcher(id = this.state.id) {
    if (this.state.navExist) {
      let thatItem = this.props.chartAndtables;
      thatItem = thatItem.find((item) => item.key === 'symbolChangePerfomance');
      getEveryFeeder(`${thatItem.feeder_url}/${id}`).then((res) => {
        this.setState({ ChangePerfomanceData: res.data.data });
      });

      this.ChangePerfomance = setInterval(() => {
        getEveryFeeder(`${thatItem.feeder_url}/${id}`).then((res) => {
          this.setState({ ChangePerfomanceData: res.data.data });
        });
      }, thatItem.refresh_time * 1000);
    }
  }

  CombinationAssetsFetcher(id = this.state.id) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolCombinationAssets');
    getEveryFeeder(`${thatItem.feeder_url}/${id}`).then((res) => {
      this.setState({ CombinationAssetsData: res.data.data });
    });

    this.CombinationAssetsInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${id}`).then((res) => {
        this.setState({ CombinationAssetsData: res.data.data });
      });
    }, thatItem.refresh_time * 1000);
  }

  async AllMemberList(id = this.state.id) {
    const { cookies } = this.props;
    if (!cookies.get('token')) {
      this.setState({ allowMemberList: false });
      return false;
    }
    /**
     * Fetch member lists
     */
    return new Promise(async (resolve, reject) => {
      try {
        let response = await getEveryUser('/member-lists', {
          token: cookies.get('token'),
        });
        this.setState({ allMembmerList: response.data.message });
        resolve(true);
      } catch (error) {
        console.log(error);
        reject(false);
      }
    });
  }

  AllUserMemberList() {
    const { cookies } = this.props;
    if (!cookies.get('token')) {
      return false;
    }
    return new Promise(async (resolve, reject) => {
      try {
        let response = await getEveryUser('/user/member-lists', {
          token: cookies.get('token'),
        });
        this.setState({ allUserMemberList: response.data.data });
        resolve(true);
      } catch (error) {
        console.log(error);
        reject(false);
      }
    });
  }

  /**
   *
   * @param {string} title
   * @param {string} description
   * @returns
   */
  CheckMemberListExist(title, description) {
    if (!description) return null;
    if (lodash.isEmpty(this.state.allMembmerList)) return null;
    let item = this.state.allMembmerList.find(
      (item) => item.title === title && item.description === description
    );
    if (lodash.isEmpty(item)) return null;

    if (item.active === false) {
      return { id: item.id, type: 'DISABLE' };
    }
    if (lodash.isEmpty(this.state.allUserMemberList)) {
      return { id: item.id, type: 'ADD' };
    }
    let existItemInUserMemberList = this.state.allUserMemberList.find(
      (item) => item.title === title && item.description === description
    );
    if (existItemInUserMemberList)
      return { id: existItemInUserMemberList.member_list_id, type: 'REMOVE' };

    return { id: item.id, type: 'ADD' };
  }

  createNotification(id) {
    if (!id) return null;
    this.setState({ memberListLoading: true });
    getEveryUser('/user/member-lists/create', {
      token: true,
      method: 'post',
      data: {
        member_list_id: id,
      },
    })
      .then((res) => {
        this.AllUserMemberList().then((res) => {
          this.setState({ memberListLoading: false });
        });
      })
      .catch((err) => {
        this.setState({ memberListLoading: false });
      });
  }

  removeNotification(id) {
    if (!id) return null;
    this.setState({ memberListLoading: true });
    getEveryUser('/user/member-lists/delete', {
      token: true,
      method: 'post',
      data: {
        member_list_id: id,
      },
    })
      .then((res) => {
        this.AllUserMemberList().then((res) => {
          this.setState({ memberListLoading: false });
        });
      })
      .catch((err) => {
        this.setState({ memberListLoading: false });
      });
  }

  /**
   * Get Information of a stock
   * @param {string} id
   */
  async getInformation(id = this.state.id) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolInfo');
    try {
      let response = await getEveryFeeder(`${thatItem.feeder_url}/${id}`);
      this.setState({ stockInfo: response.data.data });
    } catch (error) {
      console.log(error);
    }
  }

  async checkNavExist(id = this.state.id) {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolChart');
    try {
      let response = await getEveryFeeder(`${thatItem.feeder_url}/${id}`);
      if (response.data.fund) {
        this.setState({ navExist: true });
      } else {
        this.setState({ navExist: false });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    try {
      await this.AllUserMemberList();
      await this.AllMemberList();
      this.checkNavExist();
      this.getInformation();
      this.SupportResistanceFetcher();
      this.ClientSummaryFetcher();
      this.TraderSummaryFetcher();
      this.BookMarkSummaryFetcher();
      this.TotlaBookMarkSummaryFetcher();
      this.totalClientSummaryFetcher();
      this.statementPerdiodFetcher();
      this.technicalValueFetcher();
      this.ChangePerfomanceFetcher();
      this.CombinationAssetsFetcher();
    } catch (error) {
      console.log(error);
    }

    this.props.history.listen(async (location) => {
    this.clearInterval();
      try {
        await this.checkNavExist(this.context.stockID);
        this.getInformation(this.context.stockID);
        this.ClientSummaryFetcher(this.context.stockID);
        this.TraderSummaryFetcher(this.context.stockID);
        this.BookMarkSummaryFetcher(this.context.stockID);
        this.TotlaBookMarkSummaryFetcher(this.context.stockID);
        this.totalClientSummaryFetcher(this.context.stockID);
        this.statementPerdiodFetcher(this.context.stockID);
        this.SupportResistanceFetcher(this.context.stockID);
        this.technicalValueFetcher(this.context.stockID);
        this.ChangePerfomanceFetcher(this.context.stockID);
        this.CombinationAssetsFetcher(this.context.stockID);
      } catch (error) {
        console.log(error);
      }
    });
  }
  componentWillUnmount() {
    this.clearInterval();
  }
  render() {
    return (
      <>
        <Helmet>
          <title>{this.state.stockInfo.name}</title>
        </Helmet>
        <Group position="apart">
          <Text>{this.state.stockInfo.name}</Text>
          <Button onClick={() => this.modalWorker()}>اطلاعات نماد</Button>
        </Group>
        <StockInformation
          opended={this.state.stockDetailsModalState}
          onClose={this.modalWorker}
          stockId={this.state.id}
          fullData={this.state.stockInfo}
        />
        <ITable
          data={this.state.traderSummaryData}
          column={traderSummaryHeader}
          title="خلاصه معاملات"
        />
        <ITable
          data={this.state.clientSummaryData}
          column={clientSummaryHeader}
          title="خلاصه معاملات اشخاص حقیقی"
        />
        <ITable
          data={this.state.bookMarkSummaryData}
          column={bookMarkSummary}
          title="سفارش های خرید و فروش"
        />
        <ITable
          data={this.state.totlaBookMarkSummaryData}
          column={totlaBookMarkSummary}
          title="خلاصه سفارش ها"
        />
        <ITable
          data={this.state.totalClientSummaryData}
          column={totalClientSummary}
          title="معاملات تفکیکی اشخاص حقیقی و حقوقی"
        />
        <ITable
          data={this.state.statementPerdiodData}
          column={statementPerdiod}
          title={`آمار های دوره ای ${this.state.stockInfo.name || ''}`}
        />
        {this.state.navExist && (
          <ITable
            data={this.state.ChangePerfomanceData}
            column={changePerfomance}
            title={`تغییر عملکرد و قیمت ${this.state.stockInfo.name || ''}`}
          />
        )}
        <ITable
          data={this.state.CombinationAssetsData}
          column={combinationAssets}
          title={`ترکیب دارایی های ${this.state.stockInfo.name || ''}`}
        />
        <LightChart stockId={this.state.id} />
        <InstantCharts stockId={this.state.id} />
        <Paper p="xl" radius="md" shadow="xs" mt="xl" className="relative">
          <LoadingOverlay
            visible={this.state.memberListLoading}
            loaderProps={{ variant: 'dots' }}
          />
          <Text size="sm">
            حمایت ها و مقاومت های پیش روی {this.state.stockInfo.name || ''}
          </Text>
          <Grid mt="md" align="stretch">
            {this.state.supportResistanceData.map((item, index) => (
              <>
                <>
                  <Grid.Col sm={12} md={6} key={index}>
                    <Box
                      className="rounded-sm"
                      p="md"
                      style={{ background: colors.sky[500], height: '100%' }}
                    >
                      <Group position="apart">
                        <Text size="sm" color="white">
                          {item['n0'].label}
                        </Text>
                        {this.state.allMembmerList.length > 0 ? (
                          <>
                            {this.CheckMemberListExist(
                              this.state.id,
                              item['n0'].id
                            ) !== null
                              ? this.CheckMemberListExist(
                                  this.state.id,
                                  item['n0'].id
                                ).type === 'ADD' && (
                                  <Tooltip
                                    withArrow
                                    color="teal"
                                    label="فعال کردن اعلان"
                                    openDelay={500}
                                  >
                                    <ActionIcon
                                      variant="filled"
                                      color="teal"
                                      onClick={() =>
                                        this.createNotification(
                                          this.CheckMemberListExist(
                                            this.state.id,
                                            item['n0'].id
                                          ).id
                                        )
                                      }
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                        className="fill-white w-4 h-4"
                                      >
                                        <path d="M256 32V51.2C329 66.03 384 130.6 384 208V226.8C384 273.9 401.3 319.2 432.5 354.4L439.9 362.7C448.3 372.2 450.4 385.6 445.2 397.1C440 408.6 428.6 416 416 416H32C19.4 416 7.971 408.6 2.809 397.1C-2.353 385.6-.2883 372.2 8.084 362.7L15.5 354.4C46.74 319.2 64 273.9 64 226.8V208C64 130.6 118.1 66.03 192 51.2V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32H256zM224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512z" />
                                      </svg>
                                    </ActionIcon>
                                  </Tooltip>
                                )
                              : ""}

                            {this.CheckMemberListExist(
                              this.state.id,
                              item['n0'].id
                            ) !== null
                              ? this.CheckMemberListExist(
                                  this.state.id,
                                  item['n0'].id
                                ).type === 'REMOVE' && (
                                  <Tooltip
                                    withArrow
                                    color="red"
                                    label="غیر فعال کردن اعلان"
                                    openDelay={500}
                                  >
                                    <ActionIcon
                                      variant="filled"
                                      color="red"
                                      onClick={() =>
                                        this.removeNotification(
                                          this.CheckMemberListExist(
                                            this.state.id,
                                            item['n0'].id
                                          ).id
                                        )
                                      }
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                        className="fill-white w-4 h-4"
                                      >
                                        <path d="M256 32V51.2C329 66.03 384 130.6 384 208V226.8C384 273.9 401.3 319.2 432.5 354.4L439.9 362.7C448.3 372.2 450.4 385.6 445.2 397.1C440 408.6 428.6 416 416 416H32C19.4 416 7.971 408.6 2.809 397.1C-2.353 385.6-.2883 372.2 8.084 362.7L15.5 354.4C46.74 319.2 64 273.9 64 226.8V208C64 130.6 118.1 66.03 192 51.2V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32H256zM224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512z" />
                                      </svg>
                                    </ActionIcon>
                                  </Tooltip>
                                )
                              : ""}
                            {this.CheckMemberListExist(
                              this.state.id,
                              item['n0'].id
                            ) !== null
                              ? this.CheckMemberListExist(
                                  this.state.id,
                                  item['n0'].id
                                ).type === 'DISABLE' && (
                                  <Tooltip
                                    withArrow
                                    color="gray"
                                    label="اعلان در دسترس نیست"
                                    openDelay={500}
                                  >
                                    <ActionIcon
                                      variant="filled"
                                      color="red"
                                      disabled
                                    >
                                      #
                                    </ActionIcon>
                                  </Tooltip>
                                )
                              : ""}
                          </>
                        ) : null}
                      </Group>
                    </Box>
                  </Grid.Col>
                  <Grid.Col sm={12} md={6}>
                    <Box
                      className="rounded-sm"
                      p="md"
                      style={{
                        background: colors.indigo[500],
                        height: '100%',
                      }}
                    >
                      <Group position="apart">
                        <Text size="sm" color="white">
                          {item['n1'].label}
                        </Text>
                        {this.state.allMembmerList.length > 0 ? (
                          <>
                            {this.CheckMemberListExist(
                              this.state.id,
                              item['n1'].id
                            ) !== null
                              ? this.CheckMemberListExist(
                                  this.state.id,
                                  item['n1'].id
                                ).type === 'ADD' && (
                                  <Tooltip
                                    withArrow
                                    color="teal"
                                    label="فعال کردن اعلان"
                                    openDelay={500}
                                  >
                                    <ActionIcon
                                      variant="filled"
                                      color="teal"
                                      onClick={() =>
                                        this.createNotification(
                                          this.CheckMemberListExist(
                                            this.state.id,
                                            item['n1'].id
                                          ).id
                                        )
                                      }
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                        className="fill-white w-4 h-4"
                                      >
                                        <path d="M256 32V51.2C329 66.03 384 130.6 384 208V226.8C384 273.9 401.3 319.2 432.5 354.4L439.9 362.7C448.3 372.2 450.4 385.6 445.2 397.1C440 408.6 428.6 416 416 416H32C19.4 416 7.971 408.6 2.809 397.1C-2.353 385.6-.2883 372.2 8.084 362.7L15.5 354.4C46.74 319.2 64 273.9 64 226.8V208C64 130.6 118.1 66.03 192 51.2V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32H256zM224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512z" />
                                      </svg>
                                    </ActionIcon>
                                  </Tooltip>
                                )
                              : ""}

                            {this.CheckMemberListExist(
                              this.state.id,
                              item['n1'].id
                            ) !== null
                              ? this.CheckMemberListExist(
                                  this.state.id,
                                  item['n1'].id
                                ).type === 'REMOVE' && (
                                  <Tooltip
                                    withArrow
                                    color="red"
                                    label="غیر فعال کردن اعلان"
                                    openDelay={500}
                                  >
                                    <ActionIcon
                                      variant="filled"
                                      color="red"
                                      onClick={() =>
                                        this.removeNotification(
                                          this.CheckMemberListExist(
                                            this.state.id,
                                            item['n1'].id
                                          ).id
                                        )
                                      }
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                        className="fill-white w-4 h-4"
                                      >
                                        <path d="M256 32V51.2C329 66.03 384 130.6 384 208V226.8C384 273.9 401.3 319.2 432.5 354.4L439.9 362.7C448.3 372.2 450.4 385.6 445.2 397.1C440 408.6 428.6 416 416 416H32C19.4 416 7.971 408.6 2.809 397.1C-2.353 385.6-.2883 372.2 8.084 362.7L15.5 354.4C46.74 319.2 64 273.9 64 226.8V208C64 130.6 118.1 66.03 192 51.2V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32H256zM224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512z" />
                                      </svg>
                                    </ActionIcon>
                                  </Tooltip>
                                )
                              : null}
                            {this.CheckMemberListExist(
                              this.state.id,
                              item['n1'].id
                            ) !== null
                              ? this.CheckMemberListExist(
                                  this.state.id,
                                  item['n1'].id
                                ).type === 'DISABLE' && (
                                  <Tooltip
                                    withArrow
                                    color="gray"
                                    label="اعلان در دسترس نیست"
                                    openDelay={500}
                                  >
                                    <ActionIcon
                                      variant="filled"
                                      color="gray"
                                      disabled
                                    >
                                      #
                                    </ActionIcon>
                                  </Tooltip>
                                )
                              : null}
                          </>
                        ) : null}
                      </Group>
                    </Box>
                  </Grid.Col>
                </>
              </>
            ))}
          </Grid>
        </Paper>
        <Paper p="xl" radius="md" shadow="xs" mt="xl">
          <Text size="sm">
            اندیکاتور های نماد {this.state.stockInfo.name || ''}
          </Text>
          <Grid mt="md">
            {this.state.technicalValueData.map((item, index) => (
              <>
                <Grid.Col sm={12} md={3} key={index}>
                  <Box
                    dir="ltr"
                    className="rounded-sm"
                    p="md"
                    style={{ background: colors.slate[200] }}
                  >
                    <Text size="sm" color="black">
                      {item['n0']}
                    </Text>
                  </Box>
                </Grid.Col>
                <Grid.Col sm={12} md={3}>
                  <Box
                    dir="ltr"
                    className="rounded-sm"
                    p="md"
                    style={{ background: colors.slate[200] }}
                  >
                    <Text size="sm" color="black">
                      {item['n1']}
                    </Text>
                  </Box>
                </Grid.Col>
                <Grid.Col sm={12} md={3}>
                  <Box
                    dir="ltr"
                    className="rounded-sm"
                    p="md"
                    style={{ background: colors.slate[200] }}
                  >
                    <Text size="sm" color="black">
                      {item['n2']}
                    </Text>
                  </Box>
                </Grid.Col>
                <Grid.Col sm={12} md={3}>
                  <Box
                    dir="ltr"
                    className="rounded-sm"
                    p="md"
                    style={{ background: colors.slate[200] }}
                  >
                    <Text size="sm" color="black">
                      {item['n3']}
                    </Text>
                  </Box>
                </Grid.Col>
              </>
            ))}
          </Grid>
        </Paper>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
});

export default withRouter(withCookies(connect(mapStateToProps)(RealMarket)));
