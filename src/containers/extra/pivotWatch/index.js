import { Group, Input, Text } from '@mantine/core';
import { matchSorter } from 'match-sorter';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import ITable from '../../../components/ITable';
import { useConfig, useData } from '../../../helper';
import { header } from './headers';

// class PivotWatch extends TechnoWatch {
//   constructor(props) {
//     super(props);
//     this.state = {
//       fullData: [],
//       filteredData: [],
//       openedModal: false,
//       header: header,
//       title: 'دیده بان حمایت ها و مقاومت ها',
//       requestURL: 'https://feed.tseshow.com/api/PivotWatch',
//     };
//   }


//   /**
//    * remove first index of array
//    * export array to a select type of data
//    * @returns {Array}
//    */
//   HeadersByName() {
//     /**
//      * All of headers without any filter
//      * @type {Array}
//      */
//     let headers = this.state.header;
//     headers = headers.filter((item, index) => index !== 0 && index !== 1);

//     /**
//      * export all headers by their name
//      * @type {Array}
//      */
//     let headersByName = [];
//     headers.map((item, index) =>
//       headersByName.push({ value: `n${index + 2}`, label: item.name })
//     );
//     return headersByName;
//   }
// }

const PivotWatch = (props) => {
  let [filteredData, setFilteredData] = useState([]);

  const PivotWatch = useConfig(props.chartAndtables, 'PivotWatch');
  const PivotWatch_query = useData(PivotWatch, undefined,{
    staleTime: false,
    refetchInterval:false
  });


  function FilterDataByName(value) {
    let newData = PivotWatch_query.data?.data;
    if (value.length === 0){
      return setFilteredData(newData);
    }

    let filter = matchSorter(newData, value, {
      keys: ['n0'],
    });
    setFilteredData(filter);
  }


  useEffect(() => {
    if (PivotWatch_query.data?.data) {
      setFilteredData(PivotWatch_query.data?.data);
    }
  }, [PivotWatch_query.data?.data]);

  return (
    <>
      <Helmet>
        <title>{PivotWatch.title}</title>
      </Helmet>
      <Text size="sm">{PivotWatch.title}</Text>
      <Group position="apart" mt="md">
        <>
          <Input
            type="text"
            placeholder="جستجو در نماد ها"
            onChange={(e) => FilterDataByName(e.target.value)}
            disabled={PivotWatch_query.isLoading || PivotWatch_query.isError}
          />
        </>
      </Group>
      <ITable
        pagination
        fixedHeader
        fixedHeaderScrollHeight="70vh"
        data={filteredData}
        allow={PivotWatch?.allow}
        error={PivotWatch_query.isError ? PivotWatch_query.error : null}
        isLoading={PivotWatch_query.isLoading}
        isFetching={PivotWatch_query.isFetching}
        column={header}
      />
    </>
  );
};


const mapStateToProps = state => ({
  chartAndtables: state.config.needs.chartAndtables
})

export default connect(mapStateToProps)(PivotWatch);
