import React, { useEffect, useState } from 'react';
import { ActionIcon, Autocomplete, Text } from '@mantine/core';
import { headers, marketHeader } from '../../../../helper/navbar';
import LogoWhite from '../../../../assets/images/logo-white.png';
import DesktopMenu from './desktopMenu';
import PrivateSection from './PrivateSection';
import { Link } from 'react-router-dom';
import { getEveryFeeder } from '../../../../apis/main/main';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setReportList } from '../../../../redux/reducers/config';
import { matchSorter } from 'match-sorter';
import { withRouter } from 'react-router-dom';

const Header = withRouter((props) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [search, setSearch] = useState([]);

  /**
   * search dynamic data
   * @param {string} value - autocomplete value
   */
  const searchSymbol = async (value) => {
    setSearchValue(value);
    if (value.length < 2) setSearch([]);
    /**
     * when user type something if there isnt any data in the report list
     * then get the data from the server
     */
    if (value.length > 2) {
      // match sorter with label and name
      let result = matchSorter(props.reportList, value, {
        keys: ['label', 'name'],
      });
      result.length > 0 ? setSearch(result) : setSearch([]);
    }
  };

  const setStocks = async () => {
    if (props.reportList.length === 0) {
      try {
        let response = await getEveryFeeder('/totalStockSearch');
        dispatch(setReportList(response.data.data));
      } catch (error) {}
    }
  };

  useEffect(() => {
    setStocks();
  }, []);

  return (
    <div className=" bg-gray-100">
      <div
        className="flex flex-row justify-between items-center bg-slate-800 h-16 shadow-sm fixed top-0 w-full"
        style={{ zIndex: 999999 }}
      >
        <div className="container flex flex-row justify-between items-center space-x-2">
          <div className="block lg:hidden">
            <ActionIcon
              size="lg"
              mr="7px"
              variant="filled"
              color="blue"
              onClick={() => props.setOpen()}
            >
              <i className="fa-solid fa-bars text-lg"></i>
            </ActionIcon>
          </div>
          <div className="hidden lg:block">
            <Link to="/">
              <img src={LogoWhite} width="150" />
            </Link>
          </div>
          <div className="md:flex w-[70%] sm:w-60 md:w-80 lg:w-96 items-center bg-slate-700 rounded-md">
            <Autocomplete
              zIndex={9999999}
              color="blue"
              placeholder="جستجوی نماد / شرکت"
              value={searchValue}
              onChange={searchSymbol}
              onItemSubmit={(item) => props.history.push(`/market/real/${item.id}`)}
              itemComponent={AutoCompleteItem}
              rightSection={
                <ActionIcon variant="transparent">
                  <i className="fa-duotone fa-magnifying-glass text-slate-300 w[10%] mx-auto"></i>
                </ActionIcon>
              }
              filter={(value, item) =>
                item.label.toLowerCase().includes(value.toLowerCase().trim())
              }
              data={search}
              sx={(theme) => ({
                width: '100%',
                background: 'transparent',
                '& .mantine-Autocomplete-input': {
                  background: 'transparent',
                  color: 'white',
                  fontSize: '13px',
                },
                '& .mantine-Autocomplete-input:focus': {
                  borderColor: `${theme.colors.blue[6]} !important`,
                },
              })}
              variant="filled"
            />
          </div>
          <PrivateSection />
        </div>
      </div>
      <div
        className="w-full bg-white hidden shadow-sm py-2 h-16 lg:flex justify-between fixed top-16"
        style={{ zIndex: 999999 }}
      >
        <div className="container flex justify-between items-center flex-row bg-white ">
          {props.marketHeader === 0 && <DesktopMenu data={headers} />}
          {props.marketHeader === 1 && (
            <DesktopMenu data={marketHeader} marketid={props.marketId} />
          )}
        </div>
      </div>
    </div>
  );
});
const AutoCompleteItem = React.forwardRef(
  ({ id, label, name, ...others }, ref) => (
    <div ref={ref} {...others} onClick={() => console.log('hello')}>
      <Text size="xs">{label}</Text>
      <Text size="xs" color="gray">
        {name}
      </Text>
    </div>
  )
);

const mapStateToProps = (state) => ({
  reportList: state.config.reportList,
  marketHeader: state.main.mainHeaders,
  marketId: state.main.marketId,
});

export default connect(mapStateToProps)(Header);
