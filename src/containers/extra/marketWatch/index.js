import { Button, Group, Input, Select, Text } from '@mantine/core';
import { matchSorter } from 'match-sorter';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect, useSelector } from 'react-redux';
import ITable from '../../../components/ITable';
import ModalFilter from '../../../components/modalFilter';
import { useConfig, useData , modalOnSubmit,mainFilterOfModal} from '../../../helper';
import { header } from './header';
import {registerModal} from "../../../redux/reducers/filterModal"
import { useParams } from 'react-router-dom';


const MarketWatch = (props) => {
  let {date} = useParams();
  // get MW with findModal and useSelector redux
  let MW = useSelector((state) => state.filterModal['mw'] || []);
  let [oragh, setOragh] = useState('M00');
  let [filter, setFilter] = useState('0');
  let [modal, setModal] = useState(false);
  let [filteredData, setFilteredData] = useState([]);
  let [filters, setFilters] = useState(MW);

  const marketWatch = useConfig(props.chartAndtables, 'MarketWatch');
  const marketWatch_query = useData(marketWatch, `/${oragh}/${filter}${date ? `/${date}` : ''}`,{
    staleTime: false,
    refetchInterval:false
  });

  const marketWatchGroup = useConfig(props.chartAndtables, 'MarketWatchGroup');
  const marketWatchGroup_query = useData(marketWatchGroup);

  const marketWatchFilter = useConfig(
    props.chartAndtables,
    'MarketWatchFilter'
  );
  const marketWatchFilter_query = useData(marketWatchFilter);

  function FilterDataByName(value) {
    if (value.length === 0){
      let newData = marketWatch_query.data?.data;
      newData = mainFilterOfModal({array:filters, data:newData})
      return setFilteredData(newData);
    }
    let newData = marketWatch_query.data?.data
    newData = mainFilterOfModal({array:filters,data:newData})

    let filter = matchSorter(newData, value, {
      keys: ['n0'],
    });
    setFilteredData(filter);
  }

  function changeHeader() {
    let splited = header.map((item, id) => ({ value: id, label: item.name }));
    splited.shift();
    splited.shift();
    return splited;
  }

  useEffect(() => {
    if (marketWatch_query.data?.data) {
      setFilteredData(marketWatch_query.data?.data);
    }
  }, [marketWatch_query.data?.data]);

  return (
    <>
      <Helmet>
        <title>{marketWatch.title}</title>
      </Helmet>
      <Text size="sm">{marketWatch.title}</Text>
      <Group position="apart" mt="md">
        <>
          <Input
            type="text"
            placeholder="جستجو در نماد ها"
            onChange={(e) => FilterDataByName(e.target.value)}
            disabled={marketWatch_query.isLoading || marketWatch_query.isError}
            className="w-full sm:w-1/2 md:w-1/4 lg:w-auto"
          />
          <Select
            disabled={marketWatchGroup_query.loading || marketWatch_query.isLoading}
            onChange={(value) => setOragh(value)}
            placeholder="نوع اوراق"
            data={marketWatchGroup_query.data?.data || []}
            defaultValue={marketWatchGroup_query.data?.data[0]?.value || ''}
            className="w-full sm:w-2/5 md:w-1/4 lg:w-auto"
          />
          <Select
            disabled={marketWatchFilter_query.loading || marketWatch_query.isLoading}
            onChange={(value) => setFilter(value)}
            placeholder="فیلتر جدول"
            data={marketWatchFilter_query.data?.data || []}
            defaultValue={marketWatchFilter_query.data?.data[0]?.value || ''}
            className="w-full sm:w-2/4 md:w-1/4 lg:w-auto"
          />
          <Button
            className='w-full sm:w-2/5 md:w-1/4 lg:w-auto'
            size="sm"
            onClick={() => setModal((prev) => !prev)}
            disabled={marketWatch_query.loading}
          >
            فیلتر ستون ها
          </Button>
        </>
      </Group>
      <ITable
        pagination
        fixedHeader
        fixedHeaderScrollHeight="70vh"
        data={filteredData}
        allow={marketWatch?.allow}
        error={marketWatch_query.isError ? marketWatch_query.error : null}
        isLoading={marketWatch_query.isLoading}
        isFetching={marketWatch_query.isFetching}
        column={header}
      />
      <ModalFilter
        opened={modal}
        ModalAction={() => setModal((prev) => !prev)}
        onSubmit={(values) => modalOnSubmit({filters:values.filters,setModal,setFilters,setFilteredData,id:'mw',setModalFilter:registerModal,fullData:marketWatch_query.data?.data})}
        headers={changeHeader()}
        filters={filters}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  chartAndtables: state.config.needs.chartAndtables,
});

export default connect(mapStateToProps)(MarketWatch);
