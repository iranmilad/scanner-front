import React, { useEffect, useState,useContext } from 'react';
import { ActionIcon, Autocomplete, Text } from '@mantine/core';
import { headers, marketHeader } from '../../../../helper/navbar';
import LogoWhite from '../../../../assets/images/login2.png';
import DesktopMenu from './desktopMenu';
import PrivateSection from './PrivateSection';
import { Link,withRouter } from 'react-router-dom';
import { getEveryFeeder } from '../../../../apis/main';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setReportList } from '../../../../redux/reducers/config';
import { matchSorter } from 'match-sorter';
import RoutesContext from "../../../../contexts/routes"

const Header = withRouter((props) => {
  const {headerType,stockID} = useContext(RoutesContext)
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
        let thatItem = props.chartAndtables
        thatItem = thatItem.find(item => item.key === "stockSearch");
        let response = await getEveryFeeder(thatItem.feeder_url);
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
        <div className="container flex flex-row justify-between items-center">
          <div className="lg:hidden">
            <ActionIcon
              size="lg"
              variant="filled"
              color="blue"
              onClick={() => props.setOpen()}
            >
              <svg
                className="w-4 h-4 fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
              </svg>
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
              dir="rtl"
              onItemSubmit={(item) => props.history.push(`/stock/${item.id}`)}
              itemComponent={AutoCompleteItem}
              rightSection={
                <svg className='w-3.5 h-3.5 fill-gray-200' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <defs>
                    <style>{`.fa-secondary{opacity:.4}`}</style>
                  </defs>
                  <path
                    className="fa-primary"
                    d="M500.3 443.7l-119.7-119.7c-15.03 22.3-34.26 41.54-56.57 56.57l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7z"
                  />
                  <path
                    className="fa-secondary"
                    d="M207.1 0C93.12 0-.0002 93.13-.0002 208S93.12 416 207.1 416s208-93.13 208-208S322.9 0 207.1 0zM207.1 336c-70.58 0-128-57.42-128-128c0-70.58 57.42-128 128-128s128 57.42 128 128C335.1 278.6 278.6 336 207.1 336z"
                  />
                </svg>
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
          {headerType === 0 && <DesktopMenu data={headers} />}
          {headerType === 1 && (
            <DesktopMenu data={marketHeader} marketid={stockID} />
          )}
        </div>
      </div>
    </div>
  );
});
const AutoCompleteItem = React.forwardRef(
  ({ id, label, name, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Text size="xs">{label}</Text>
      <Text size="xs" color="gray">
        {name}
      </Text>
    </div>
  )
);

const mapStateToProps = (state) => ({
  reportList: state.config.reportList,
  chartAndtables: state.config.needs.chartAndtables
});

export default connect(mapStateToProps)(Header);
