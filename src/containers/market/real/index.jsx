import { Component, useEffect, useState } from 'react';
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
  Center,
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
import { useParams, withRouter } from 'react-router-dom';
import RoutesContext from '../../../contexts/routes';
import { withCookies } from 'react-cookie';
import lodash from 'lodash';
import { findConfig, useData } from '../../../helper';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

/**
 * @description Real Market means Sahm - صفحه سهم
 */
// class RealMarket extends Component {
//   static contextType = RoutesContext;
//   state = {
//     marketId: this.props.route.match.params.id,
//     title: '',
//     stockDetails: [],
//     stockDetailsModalState: false,
//     id: this.props.route.match.params.id,
//     stockInfo: [],
//     clientSummaryData: [],
//     traderSummaryData: [],
//     bookMarkSummaryData: [],
//     totlaBookMarkSummaryData: [],
//     totalClientSummaryData: [],
//     statementPerdiodData: [],
//     supportResistanceData: [],
//     technicalValueData: [],
//     ChangePerfomanceData: [],
//     CombinationAssetsData: [],
//     allMembmerList: [],
//     allUserMemberList: [],
//     memberListLoading: false,
//     navExist: false,
//   };
//   modalWorker = () => {
//     this.setState({
//       stockDetailsModalState: !this.state.stockDetailsModalState,
//     });
//   };

//   async AllMemberList(id = this.state.id) {
//     const { cookies } = this.props;
//     if (!cookies.get('token')) {
//       this.setState({ allowMemberList: false });
//       return false;
//     }
//     /**
//      * Fetch member lists
//      */
//     return new Promise(async (resolve, reject) => {
//       try {
//         let response = await getEveryUser('/member-lists', {
//           token: cookies.get('token'),
//         });
//         this.setState({ allMembmerList: response.data.message });
//         resolve(true);
//       } catch (error) {
//         console.log(error);
//         reject(false);
//       }
//     });
//   }

//   AllUserMemberList() {
//     const { cookies } = this.props;
//     if (!cookies.get('token')) {
//       return false;
//     }
//     return new Promise(async (resolve, reject) => {
//       try {
//         let response = await getEveryUser('/user/member-lists', {
//           token: true,
//         });
//         console.log(response);
//         this.setState({ allUserMemberList: response.data.data });
//         resolve(true);
//       } catch (error) {
//         console.log(error);
//         reject(false);
//       }
//     });
//   }

//   /**
//    *
//    * @param {string} title
//    * @param {string} description
//    * @returns
//    */
//   CheckMemberListExist(title, description) {
//     if (!description) return null;
//     if (lodash.isEmpty(this.state.allMembmerList)) return null;
//     let item = this.state.allMembmerList.find(
//       (item) => item.title === title && item.description === description
//     );
//     if (lodash.isEmpty(item)) return null;

//     if (item.active === false) {
//       return { id: item.id, type: 'DISABLE' };
//     }
//     if (lodash.isEmpty(this.state.allUserMemberList)) {
//       return { id: item.id, type: 'ADD' };
//     }
//     let existItemInUserMemberList = this.state.allUserMemberList.find(
//       (item) => item.title === title && item.description === description
//     );
//     if (existItemInUserMemberList)
//       return { id: existItemInUserMemberList.member_list_id, type: 'REMOVE' };

//     return { id: item.id, type: 'ADD' };
//   }

//   /**
//    * Get Information of a stock
//    * @param {string} id
//    */
//   async getInformation(id = this.state.id) {
//     let thatItem = this.props.chartAndtables;
//     thatItem = thatItem.find((item) => item.key === 'symbolInfo');
//     try {
//       let response = await getEveryFeeder(`${thatItem.feeder_url}/${id}`);
//       this.setState({ stockInfo: response.data.data });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async checkNavExist(id = this.state.id) {
//     let thatItem = this.props.chartAndtables;
//     thatItem = thatItem.find((item) => item.key === 'symbolChart');
//     try {
//       let response = await getEveryFeeder(`${thatItem.feeder_url}/${id}`);
//       if (response.data.fund) {
//         this.setState({ navExist: true });
//       } else {
//         this.setState({ navExist: false });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async componentDidMount() {
//     try {
//       await this.AllUserMemberList();
//       await this.AllMemberList();
//       this.checkNavExist();
//       this.getInformation();
//       this.SupportResistanceFetcher();
//       this.ClientSummaryFetcher();
//       this.TraderSummaryFetcher();
//       this.BookMarkSummaryFetcher();
//       this.TotlaBookMarkSummaryFetcher();
//       this.totalClientSummaryFetcher();
//       this.statementPerdiodFetcher();
//       this.technicalValueFetcher();
//       this.ChangePerfomanceFetcher();
//       this.CombinationAssetsFetcher();
//     } catch (error) {
//       console.log(error);
//     }

//     this.props.history.listen(async (location) => {
//       this.clearInterval();
//       try {
//         await this.checkNavExist(this.context.stockID);
//         this.getInformation(this.context.stockID);
//         this.ClientSummaryFetcher(this.context.stockID);
//         this.TraderSummaryFetcher(this.context.stockID);
//         this.BookMarkSummaryFetcher(this.context.stockID);
//         this.TotlaBookMarkSummaryFetcher(this.context.stockID);
//         this.totalClientSummaryFetcher(this.context.stockID);
//         this.statementPerdiodFetcher(this.context.stockID);
//         this.SupportResistanceFetcher(this.context.stockID);
//         this.technicalValueFetcher(this.context.stockID);
//         this.ChangePerfomanceFetcher(this.context.stockID);
//         this.CombinationAssetsFetcher(this.context.stockID);
//       } catch (error) {
//         console.log(error);
//       }
//     });
//   }
//   componentWillUnmount() {
//     this.clearInterval();
//   }
//   render() {
//     return (
//       <>
//         <Helmet>
//           <title>{this.state.stockInfo.name}</title>
//         </Helmet>
//         <Group position="apart">
//           <Text>{this.state.stockInfo.name}</Text>
//           <Button onClick={() => this.modalWorker()}>اطلاعات نماد</Button>
//         </Group>

//         <LightChart stockId={this.state.id} />
//         <InstantCharts stockId={this.state.id} />
//         <Paper p="xl" radius="md" shadow="xs" mt="xl" className="relative">
//           <LoadingOverlay
//             visible={this.state.memberListLoading}
//             loaderProps={{ variant: 'dots' }}
//           />
//           <Text size="sm">
//             حمایت ها و مقاومت های پیش روی {this.state.stockInfo.name || ''}
//           </Text>
//           <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {/* Right Section */}
//             <div className="w-full space-y-3">
//               {'n0' in this.state.supportResistanceData
//                 ? this.state.supportResistanceData.n0.map((item, index) => {
//                     return (
//                       <div className="w-full h-12">
//                         <SupportBox
//                           allow={
//                             this.state.allMembmerList.length > 0 ? true : false
//                           }
//                           CheckMemberListExist={this.CheckMemberListExist.bind(
//                             this
//                           )}
//                           id={this.state.id}
//                           key={index}
//                           add={this.createNotification}
//                           remove={this.removeNotification}
//                           item={item}
//                           bg={colors.sky[500]}
//                         />
//                       </div>
//                     );
//                   })
//                 : null}
//             </div>
//             {/* Left section */}
//             <div className="w-full space-y-3">
//               {'n1' in this.state.supportResistanceData
//                 ? this.state.supportResistanceData.n1.map((item, index) => {
//                     return (
//                       <div className="w-full h-12">
//                         <SupportBox
//                           item={item}
//                           allow={
//                             this.state.allMembmerList.length > 0 ? true : false
//                           }
//                           CheckMemberListExist={this.CheckMemberListExist.bind(
//                             this
//                           )}
//                           id={this.state.id}
//                           key={index}
//                           add={this.createNotification}
//                           remove={this.removeNotification}
//                           bg={colors.indigo[500]}
//                         />
//                       </div>
//                     );
//                   })
//                 : null}
//             </div>
//           </div>
//         </Paper>
//         <Paper p="xl" radius="md" shadow="xs" mt="xl">
//           <Text size="sm">
//             اندیکاتور های نماد {this.state.stockInfo.name || ''}
//           </Text>
//           <Grid mt="md">
//             {this.state.technicalValueData.map((item, index) => (
//               <>
//                 <Grid.Col sm={12} md={3} key={index}>
//                   <Box
//                     dir="ltr"
//                     className="rounded-sm"
//                     p="md"
//                     style={{ background: colors.slate[200] }}
//                   >
//                     <Text size="sm" color="black">
//                       {item['n0']}
//                     </Text>
//                   </Box>
//                 </Grid.Col>
//                 <Grid.Col sm={12} md={3}>
//                   <Box
//                     dir="ltr"
//                     className="rounded-sm"
//                     p="md"
//                     style={{ background: colors.slate[200] }}
//                   >
//                     <Text size="sm" color="black">
//                       {item['n1']}
//                     </Text>
//                   </Box>
//                 </Grid.Col>
//                 <Grid.Col sm={12} md={3}>
//                   <Box
//                     dir="ltr"
//                     className="rounded-sm"
//                     p="md"
//                     style={{ background: colors.slate[200] }}
//                   >
//                     <Text size="sm" color="black">
//                       {item['n2']}
//                     </Text>
//                   </Box>
//                 </Grid.Col>
//                 <Grid.Col sm={12} md={3}>
//                   <Box
//                     dir="ltr"
//                     className="rounded-sm"
//                     p="md"
//                     style={{ background: colors.slate[200] }}
//                   >
//                     <Text size="sm" color="black">
//                       {item['n3']}
//                     </Text>
//                   </Box>
//                 </Grid.Col>
//               </>
//             ))}
//           </Grid>
//         </Paper>
//       </>
//     );
//   }
// }

const RealMarket = (props) => {
  let { id } = useParams();
  const [modal, setModal] = useState(false);
  let symbolInfo = findConfig(props.chartAndtables, 'symbolInfo');
  let symbolInfo_query = useData(symbolInfo, `/${id}`, {
    refetchInterval: false,
  });

  let symbolClientSummery = findConfig(
    props.chartAndtables,
    'symbolClientSummery'
  );
  let symbolClientSummery_query = useData(symbolClientSummery, `/${id}`);

  let symbolTradeSummery = findConfig(
    props.chartAndtables,
    'symbolTradeSummery'
  );
  let symbolTradeSummery_query = useData(symbolTradeSummery, `/${id}`);

  let symbolBookMarkSummery = findConfig(
    props.chartAndtables,
    'symbolBookMarkSummery'
  );
  let symbolBookMarkSummery_query = useData(symbolBookMarkSummery, `/${id}`);

  let symboltotalBookMarkSummery = findConfig(
    props.chartAndtables,
    'symboltotalBookMarkSummery'
  );
  let symboltotalBookMarkSummery_query = useData(
    symboltotalBookMarkSummery,
    `/${id}`
  );

  let symbolTotalClientSummery = findConfig(
    props.chartAndtables,
    'symbolTotalClientSummery'
  );
  let symbolTotalClientSummery_query = useData(
    symbolTotalClientSummery,
    `/${id}`
  );

  let symbolStatmentPeriod = findConfig(
    props.chartAndtables,
    'symbolStatmentPeriod'
  );
  let symbolStatmentPeriod_query = useData(symbolStatmentPeriod, `/${id}`);

  let symbolSupportResistance = findConfig(
    props.chartAndtables,
    'symbolSupportResistance'
  );
  let symbolSupportResistance_query = useData(
    symbolSupportResistance,
    `/${id}`
  );

  let symbolTechnicalValue = findConfig(
    props.chartAndtables,
    'symbolTechnicalValue'
  );
  let symbolTechnicalValue_query = useData(symbolTechnicalValue, `/${id}`);

  let symbolChangePerfomance = findConfig(
    props.chartAndtables,
    'symbolChangePerfomance'
  );
  let symbolChangePerfomance_query = useData(symbolChangePerfomance, `/${id}`);

  let symbolCombinationAssets = findConfig(
    props.chartAndtables,
    'symbolCombinationAssets'
  );
  let symbolCombinationAssets_query = useData(
    symbolCombinationAssets,
    `/${id}`
  );

  let symbolChart = findConfig(props.chartAndtables, 'symbolChart');
  let symbolChart_query = useData(symbolChart, `/${id}`);

  function createNotification(id, setLoading) {
    if (!id) return null;
    setLoading(true);

    getEveryUser('/user/member-lists/create', {
      token: true,
      method: 'post',
      data: {
        member_list_id: id,
      },
    })
      .then((res) => {
        setLoading();
      })
      .catch((err) => {
        setLoading();
      });
  }

  function removeNotification(id, loadingWorker, setLoading) {
    if (!id) return null;
    setLoading();
    getEveryUser('/user/member-lists/delete', {
      token: true,
      method: 'post',
      data: {
        member_list_id: id,
      },
    })
      .then((res) => {
        loadingWorker();
      })
      .catch((err) => {
        loadingWorker();
      });
  }

  const [allowMemberList, setAllowMemberList] = useState(false);
  let member_lists_query = useQuery({
    queryKey: ['member-lists', id],
    queryFn: async () => {
      let response = await getEveryUser('/member-lists', {
        token: true,
      });
      return response.data;
    },
    staleTime: 90 * 1000,
    retry: 2,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: (e) => {
      setAllowMemberList(true);
    },
    onError: () => {
      setAllowMemberList(false);
    },
  });

  let user_member_lists = useQuery({
    queryKey: ['user_member_lists'],
    queryFn: async () => {
      let response = await getEveryUser('/user/member-lists', {
        token: true,
      });
      return response.data;
    },
  });

  /**
   *
   * @param {string} title
   * @param {string} description
   * @returns
   */
  function CheckMemberListExist(title, description) {
    if (!description) return null;
    if (lodash.isEmpty(member_lists_query.data?.data)) return null;
    let item = member_lists_query.data?.data.find(
      (item) => item.title === title && item.description === description
    );
    if (lodash.isEmpty(item)) return null;

    if (item.active === false) {
      return { id: item.id, type: 'DISABLE' };
    }
    if (lodash.isEmpty(user_member_lists.data?.data)) {
      return { id: item.id, type: 'ADD' };
    }
    let existItemInUserMemberList = user_member_lists.data?.data.find(
      (item) => item.title === title && item.description === description
    );
    if (existItemInUserMemberList)
      return { id: existItemInUserMemberList.member_list_id, type: 'REMOVE' };

    return { id: item.id, type: 'ADD' };
  }

  return (
    <>
      <Helmet>
        <title>{symbolInfo_query.data?.data?.name || ''}</title>
      </Helmet>
      <Group position="apart">
        <Text>{symbolInfo_query.data?.data?.name || ''}</Text>
        <Button onClick={() => setModal(!modal)}>اطلاعات نماد</Button>
      </Group>
      <StockInformation
        opended={modal}
        onClose={() => setModal(!modal)}
        stockId={id}
        fullData={symbolInfo_query?.data?.data}
      />
      <ITable
        data={symbolTradeSummery_query?.data?.data}
        column={traderSummaryHeader}
        title={symbolTradeSummery.title}
      />
      <ITable
        data={symbolClientSummery_query?.data?.data}
        column={clientSummaryHeader}
        title={symbolClientSummery.title}
      />
      <ITable
        data={symbolBookMarkSummery_query?.data?.data}
        column={bookMarkSummary}
        title={symbolBookMarkSummery.title}
      />
      <ITable
        data={symboltotalBookMarkSummery_query?.data?.data}
        column={totlaBookMarkSummary}
        title={symboltotalBookMarkSummery.title}
      />
      <ITable
        data={symbolTotalClientSummery_query?.data?.data}
        column={totalClientSummary}
        title={symbolTotalClientSummery.title}
      />
      <ITable
        data={symbolStatmentPeriod_query?.data?.data}
        column={statementPerdiod}
        title={`آمار های دوره ای ${symbolInfo_query.data?.name || ''}`}
      />
      {!symbolChart_query.data?.fund && (
        <ITable
          data={symbolChangePerfomance_query?.data?.data}
          column={changePerfomance}
          title={`تغییر عملکرد و قیمت ${
            symbolInfo_query?.data?.data.name || ''
          }`}
        />
      )}
      <ITable
        data={symbolCombinationAssets_query?.data?.data}
        column={combinationAssets}
        title={`ترکیب دارایی های ${symbolInfo_query?.data?.data.name || ''}`}
      />
           <LightChart stockId={id} />
     <InstantCharts stockId={id} />
      <Paper p="xl" radius="md" shadow="xs" mt="xl" className="relative">
        <LoadingOverlay visible={false} loaderProps={{ variant: 'dots' }} />
        <Text size="sm">
          حمایت ها و مقاومت های پیش روی {symbolInfo_query.data?.name || ''}
        </Text>
        {symbolSupportResistance_query.isLoading ? (
          <Center>
            <Loader variant="dots" />
          </Center>
        ) : (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Right Section */}
            <div className="w-full space-y-3">
              {'data' in symbolSupportResistance_query.data
                ? symbolSupportResistance_query?.data?.data.n0.map(
                    (item, index) => {
                      return (
                        <div className="w-full h-12">
                          <SupportBox
                            allow={
                              // this.state.allMembmerList.length > 0
                              //   ? true
                              //   : false
                              true
                            }
                            CheckMemberListExist={CheckMemberListExist}
                            id={id}
                            key={index}
                            add={createNotification}
                            remove={removeNotification}
                            item={item}
                            bg={colors.sky[500]}
                          />
                        </div>
                      );
                    }
                  )
                : null}
            </div>
            {/* Left section */}
            <div className="w-full space-y-3">
              {'data' in symbolSupportResistance_query.data
                ? symbolSupportResistance_query?.data?.data?.n1.map(
                    (item, index) => {
                      return (
                        <div className="w-full h-12">
                          <SupportBox
                            item={item}
                            allow={
                              // this.state.allMembmerList.length > 0 ? true : false
                              true
                            }
                            CheckMemberListExist={CheckMemberListExist}
                            id={id}
                            key={index}
                            add={createNotification}
                            remove={removeNotification}
                            bg={colors.indigo[500]}
                          />
                        </div>
                      );
                    }
                  )
                : null}
            </div>
          </div>
        )}
      </Paper>

      <Paper p="xl" radius="md" shadow="xs" mt="xl">
        <Text size="sm">
          اندیکاتور های نماد {symbolInfo_query.data?.name || ''}
        </Text>
        <Grid mt="md">
          {symbolTechnicalValue_query.isLoading ? (
            <Center>
              <Loader variant="dots" />
            </Center>
          ) : (
            <>
              {symbolTechnicalValue_query?.data?.data.map((item, index) => (
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
            </>
          )}
        </Grid>
      </Paper>
    </>
  );
};

const SupportBox = ({
  item,
  bg,
  add,
  remove,
  allow,
  CheckMemberListExist,
  id,
}) => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(null);

  function loadingWorker(status) {
    if (state.type === 'ADD') setState((prev) => ({ ...prev, type: 'REMOVE' }));
    else if (state.type === 'REMOVE')
      setState((prev) => ({ ...prev, type: 'ADD' }));
    else setState((prev) => ({ ...prev, type: 'DISABLE' }));
  }

  useEffect(() => {
    setState(CheckMemberListExist(id, item.id));
    setLoading(!loading);
  }, []);

  return (
    <Box
      className="rounded-sm"
      p="md"
      style={{ background: bg, height: '100%' }}
    >
      <Group position="apart">
        <Text size="sm" color="white">
          {item.label}
        </Text>

        {allow ? (
          <>
            {state !== null
              ? state.type === 'ADD' && (
                  <Tooltip
                    withArrow
                    color="teal"
                    label="فعال کردن اعلان"
                    openDelay={500}
                  >
                    <ActionIcon
                      variant="filled"
                      color="teal"
                      loading={loading}
                      onClick={() =>
                        add(
                          CheckMemberListExist(id, item.id).id,
                          loadingWorker,
                          () => setLoading(!loading)
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
              : ''}

            {state !== null
              ? state.type === 'REMOVE' && (
                  <Tooltip
                    withArrow
                    color="red"
                    label="غیر فعال کردن اعلان"
                    openDelay={500}
                  >
                    <ActionIcon
                      variant="filled"
                      color="red"
                      loading={loading}
                      onClick={() =>
                        remove(
                          CheckMemberListExist(id, item.id).id,
                          loadingWorker,
                          setLoading
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
              : ''}
            {state !== null
              ? state.type === 'DISABLE' && (
                  <Tooltip
                    withArrow
                    color="gray"
                    label="اعلان در دسترس نیست"
                    openDelay={500}
                  >
                    <ActionIcon variant="filled" color="red" disabled>
                      #
                    </ActionIcon>
                  </Tooltip>
                )
              : ''}
          </>
        ) : null}
      </Group>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
});

export default withRouter(withCookies(connect(mapStateToProps)(RealMarket)));
