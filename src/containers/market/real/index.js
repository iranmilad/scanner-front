import { Component, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { setMainHeader, setMarketId } from '../../../redux/reducers/main';
import { Button, Group, Modal, Loader, Text } from '@mantine/core';
import StockInformation from './stockInformation';
import TraderSummary from './traderSummary';
import ClientSummary from './clientSummary';
import ITable from '../../../components/ITable';
import { header as clientSummaryHeader } from './clientSummary/header';
import { getEveryFeeder } from '../../../apis/main/main';
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

/**
 * @description Real Market means Sahm - صفحه سهم
 */

class RealMarket extends Component {
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
    navExist: false,
  };
  modalWorker = () => {
    this.setState({
      stockDetailsModalState: !this.state.stockDetailsModalState,
    });
  };

  ClientSummaryFetcher() {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolClientSummery');
    getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then((res) => {
      this.setState({ clientSummaryData: res.data.data });
    });

    this.ClientSummaryInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then((res) => {
        this.setState({ clientSummaryData: res.data.data });
      });
    }, thatItem.refresh_time * 1000);
  }

  TraderSummaryFetcher() {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolTradeSummery');
    getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then((res) => {
      this.setState({ traderSummaryData: res.data.data });
    });

    this.TraderSummaryInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then((res) => {
        this.setState({ traderSummaryData: res.data.data });
      });
    }, thatItem.refresh_time * 1000);
  }

  BookMarkSummaryFetcher() {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolBookMarkSummery');
    getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then((res) => {
      this.setState({ bookMarkSummaryData: res.data.data });
    });

    this.BookMarkSummaryInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then((res) => {
        this.setState({ bookMarkSummaryData: res.data.data });
      });
    }, thatItem.refresh_time * 1000);
  }

  TotlaBookMarkSummaryFetcher() {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find(
      (item) => item.key === 'symboltotalBookMarkSummery'
    );
    getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then((res) => {
      this.setState({ totlaBookMarkSummaryData: res.data.data });
    });

    this.TotlaBookMarkSummaryInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then((res) => {
        this.setState({ totlaBookMarkSummaryData: res.data.data });
      });
    }, thatItem.refresh_time * 1000);
  }

  totalClientSummaryFetcher() {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolTotalClientSummery');
    getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then((res) => {
      this.setState({ totalClientSummaryData: res.data.data });
    });

    this.totalClientSummaryInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then((res) => {
        this.setState({ totalClientSummaryData: res.data.data });
      });
    }, thatItem.refresh_time * 1000);
  }

  statementPerdiodFetcher() {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolStatmentPeriod');
    getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then((res) => {
      this.setState({ statementPerdiodData: res.data.data });
    });

    this.statementPerdiodInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then((res) => {
        this.setState({ statementPerdiodData: res.data.data });
      });
    }, thatItem.refresh_time * 1000);
  }

  SupportResistanceFetcher() {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolSupportResistance');
    getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then((res) => {
      this.setState({ supportResistanceData: res.data.data });
    });

    this.SupportResistanceInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then((res) => {
        this.setState({ supportResistanceData: res.data.data });
      });
    }, thatItem.refresh_time * 1000);
  }

  technicalValueFetcher() {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolTechnicalValue');
    getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then((res) => {
      this.setState({ technicalValueData: res.data.data });
    });

    this.technicalValueInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then((res) => {
        this.setState({ technicalValueData: res.data.data });
      });
    }, thatItem.refresh_time * 1000);
  }

  ChangePerfomanceFetcher() {
    if (this.state.navExist) {
      let thatItem = this.props.chartAndtables;
      thatItem = thatItem.find((item) => item.key === 'symbolChangePerfomance');
      getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then((res) => {
        this.setState({ ChangePerfomanceData: res.data.data });
      });

      this.ChangePerfomance = setInterval(() => {
        getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then(
          (res) => {
            this.setState({ ChangePerfomanceData: res.data.data });
          }
        );
      }, thatItem.refresh_time * 1000);
    }
  }

  CombinationAssetsFetcher() {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolCombinationAssets');
    getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then((res) => {
      this.setState({ CombinationAssetsData: res.data.data });
    });

    this.CombinationAssetsInterval = setInterval(() => {
      getEveryFeeder(`${thatItem.feeder_url}/${this.state.id}`).then((res) => {
        this.setState({ CombinationAssetsData: res.data.data });
      });
    }, thatItem.refresh_time * 1000);
  }

  async getInformation() {
    let thatItem = this.props.chartAndtables;
    thatItem = thatItem.find((item) => item.key === 'symbolInfo');
    try {
      let response = await getEveryFeeder(
        `${thatItem.feeder_url}/${this.state.id}`
      );
      this.setState({ stockInfo: response.data.data });
    } catch (error) {
      console.log(error);
    }
  }

  checkNavExist() {
    return new Promise(async (reseolve, reject) => {
      let thatItem = this.props.chartAndtables;
      thatItem = thatItem.find((item) => item.key === 'symbolChart');
      try {
        let response = await getEveryFeeder(
          `${thatItem.feeder_url}/${this.state.id}`
        );
        if (response.data.fund) {
          this.setState({ navExist: true });
        } else {
          this.setState({ navExist: false });
        }
        reseolve(response.data.fund);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  async componentDidMount() {
    this.props.setMarketId(this.state.id);
    this.props.setMainHeader(1);
    try {
      await this.checkNavExist();
      this.getInformation();
      this.ClientSummaryFetcher();
      this.TraderSummaryFetcher();
      this.BookMarkSummaryFetcher();
      this.TotlaBookMarkSummaryFetcher();
      this.totalClientSummaryFetcher();
      this.statementPerdiodFetcher();
      this.SupportResistanceFetcher();
      this.technicalValueFetcher();
      this.ChangePerfomanceFetcher();
      this.CombinationAssetsFetcher();
    } catch (error) {
      console.log(error);
    }

    this.props.history.listen(async (location) => {
      let { pathname } = location;
      let id = pathname.split('/')[3];
      this.setState({ id });
      this.props.setMarketId(id);
      try {
        await this.checkNavExist();
        this.getInformation();
        this.ClientSummaryFetcher();
        this.TraderSummaryFetcher();
        this.BookMarkSummaryFetcher();
        this.TotlaBookMarkSummaryFetcher();
        this.totalClientSummaryFetcher();
        this.statementPerdiodFetcher();
        this.SupportResistanceFetcher();
        this.technicalValueFetcher();
        this.ChangePerfomanceFetcher();
        this.CombinationAssetsFetcher();
      } catch (error) {
        console.log(error);
      }
    });
  }
  componentWillUnmount() {
    this.props.setMainHeader(0);
    clearInterval(this.ClientSummaryInterval);
    clearInterval(this.TraderSummaryInterval);
    clearInterval(this.BookMarkSummaryInterval);
    clearInterval(this.TotlaBookMarkSummaryInterval);
    clearInterval(this.totalClientSummaryInterval);
    clearInterval(this.statementPerdiodInterval);
    clearInterval(this.SupportResistanceInterval);
    clearInterval(this.technicalValueInterval);
    clearInterval(this.ChangePerfomance);
    clearInterval(this.CombinationAssetsInterval);
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
        <Paper p="xl" radius="md" shadow="xs" mt="xl">
          <Text size="sm">
            حمایت ها و مقاومت های پیش روی {this.state.stockInfo.name || ''}
          </Text>
          <Grid mt="md">
            {this.state.supportResistanceData.map((item, index) => (
              <>
                <Grid.Col sm={12} md={6}>
                  <Box
                    className="rounded-sm"
                    p="md"
                    style={{ background: colors.sky[500] }}
                  >
                    <Text size="sm" color="white">
                      {item['n0']}
                    </Text>
                  </Box>
                </Grid.Col>
                <Grid.Col sm={12} md={6}>
                  <Box
                    className="rounded-sm"
                    p="md"
                    style={{ background: colors.indigo[500] }}
                  >
                    <Text size="sm" color="white">
                      {item['n1']}
                    </Text>
                  </Box>
                </Grid.Col>
              </>
            ))}
          </Grid>
        </Paper>
        <Paper p="xl" radius="md" shadow="xs" mt="xl">
          <Text size="sm">اندیکاتور های نماد {this.state.stockInfo.name || ''}</Text>
          <Grid mt="md">
            {this.state.technicalValueData.map((item, index) => (
              <>
                <Grid.Col sm={12} md={3}>
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

const mapDispatchToProps = (dispatch) => ({
  setMarketId: (marketId) => dispatch(setMarketId(marketId)),
  setMainHeader: (id) => dispatch(setMainHeader(id)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RealMarket)
);
