import { History } from '../../helper/history';
import { Helmet } from 'react-helmet';
import {
  firstChart,
  twoChart,
  threeChart,
  fourchart,
  fiveChart,
  sixChart,
  sevenChart,
  eightChart,
  A9,
  A10,
  A11,
  A12,
  A13,
  A14,
  A15,
  A16,
  A17,
  A18,
} from '../../helper/fakeData';
import {
  summaryOfRetailTable,
  Separated_statistics_micro_transactions,
  Real_Legal,
  Summary_exchanges,
  summary_config
} from '../../helper/statics';
import ITable from '../../components/ITable';
import LoopChart from '../../components/LoopChart';
import { useEffect, useState } from 'react';
import { Modal, Title } from '@mantine/core';
import { useSelector } from 'react-redux';
import { getModal } from '../../redux/reducers/main';
import TreeModal from './treemapModal';
import { useDispatch } from 'react-redux';
import { setModal } from '../../redux/reducers/main';
import {tableWorker} from '../../helper'

export default () => {
  const [charts, setCharts] = useState([]);
  useEffect(() => {
    setCharts([
      firstChart,
      twoChart,
      threeChart,
      fourchart,
      fiveChart,
      sixChart,
      sevenChart,
      eightChart,
      A9,
      A10,
      A11,
      A12,
      A13,
      A14,
      A15,
      A16,
      A17,
      A18,
    ]);
  }, []);

  tableWorker({
    config: summary_config,
    dataSelf: Summary_exchanges.data
  });

  const modal = useSelector((state) => getModal(state));
  const ModalContent = modal.content;
  const dispatch = useDispatch();
  return (
    <>
      <Helmet>
        <title>خانه</title>
      </Helmet>
      <Modal
        opened={modal.show}
        onClose={() => dispatch(setModal({ show: false, content: 'tree'}))}
        centered
        size="70%"
        title="نقشه بازار"
      >
        {ModalContent === 'tree' && <TreeModal />}
      </Modal>
      <Title order={3}>صفحه خانه</Title>
      <ITable
        data={summaryOfRetailTable}
        title="خلاصه معاملات خرد سهام و صندوق ها"
      />
      <ITable
        data={Separated_statistics_micro_transactions}
        title="آمار تفکیک شده معاملات خرد"
      />
      <ITable data={Real_Legal} title="حقیقی حقوقی" />
      <LoopChart charts={charts} />
      <ITable data={Summary_exchanges} title="خلاصه معاملات صنایع بورس (جهت مشاهده دیده بان هر گروه روی نام آن گروه کلیک کنید.)" />
    </>
  );
};
