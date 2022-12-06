import { Modal } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getEveryFeeder } from '../../../../apis/main';
import ITable from '../../../../components/ITable';
import { useConfig, useData } from '../../../../helper';
import { setModal } from '../../../../redux/reducers/chartable/chart';
import { header, tableHeader } from './header';

// class Index extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: false,
//       data: [],
//     };
//   }
//   async getData(chartId = this.props.chart.id,chartPointIndex = this.props.chart.pointIndex) {
//     let thatItem = this.props.subTable;
//     this.setState({ loading: true });
//     thatItem = thatItem.find((item) => item.key === 'subTableController');
//     try {
//       let response = await getEveryFeeder(
//         `${thatItem.feeder_url}/${chartId}/${chartPointIndex}`
//       );
//       this.setState({ data: response.data.data, loading: false });
//     } catch (error) {
//       this.setState({ loading: false });
//       console.log(error);
//     }
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     if (nextProps.modalStatus !== this.props.modalStatus) {
//       if (nextProps.modalStatus) {
//         this.getData(nextProps.chart.id,nextProps.chart.pointIndex);
//       }
//       return true;
//     } else if (nextState.data !== this.state.data) {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   onClose() {
//     this.setState({ data: [] ,loading:false});
//     this.props.setModal();
//   }

//   render() {
//     return (
//       <Modal
//         zIndex={99999999999}
//         size="90%"
//         overflow="outside"
//         opened={this.props.modalStatus}
//         title={this.props.chart.label}
//         dir="rtl"
//         onClose={() => this.onClose()}
//       >
//         {this.state.loading ? (
//           <Center>
//             <Loader variant="dots" />
//           </Center>
//         ) : (
//           <ITable
//             column={this.props.chart.id === 'tb-GroupState' ? tableHeader : header}
//             data={this.state.data}
//             pagination
//             fixedHeader
//             fixedHeaderScrollHeight="70vh"
//           />
//         )}
//       </Modal>
//     );
//   }
// }

const Index = (props) => {
  let chartId = props.chart.id,
    chartPointIndex = props.chart.pointIndex;

  let subTableController = useConfig(
    props.chartAndtables,
    'subTableController'
  );
  let subTableController_query = useQuery({
    enabled: props.modalStatus,
    queryKey: [subTableController.key, `/${chartId}/${chartPointIndex}`],
    queryFn: async () => {
      try{
        let {data} = await getEveryFeeder(`${subTableController.feeder_url}/${chartId}/${chartPointIndex}`);
        return data;
      }
      catch(err){
        console.log(err)
      }
    },
    staleTime: subTableController.refresh_time * 1000,
    refetchInterval: subTableController.refresh_time * 1000,
    retry: 2,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  })



  function onClose() {
    props.setModal();
  }

  return (
    <Modal
      zIndex={99999999999}
      size="90%"
      overflow="outside"
      opened={props.modalStatus}
      title={props.chart.label}
      dir="rtl"
      onClose={() => onClose()}
    >
      <ITable
        column={props.chart.id === 'tb-GroupState' ? tableHeader : header}
        data={subTableController_query.data?.data}
        allow={subTableController?.allow}
        isLoading={subTableController_query.isLoading}
        isFetching={subTableController_query.isFetching}
        error={
          subTableController_query.isError
            ? subTableController_query.error
            : null
        }
        pagination
        fixedHeader
        fixedHeaderScrollHeight="70vh"
      />
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
  modalStatus: state.chartable_chart.modal,
  chart: state.chartable_chart.chart,
});

const mapDispatchToProps = (dispatch) => ({
  setModal: (data) => dispatch(setModal(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
