import { Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { getEveryFeeder } from '../apis/main';

// a function for generat 360 random number from 400 to 260 with 10 step
export function randomNumber() {
  let arr = [];
  for (let i = 0; i < 50; i++) {
    arr.push(Math.floor(Math.random() * (400 - 260) + 260));
  }
  return arr;
}
// a function for generate clock time from 9:00 to 13:00 with every 15 minutes
export function clockTime(start, end, step) {
  let begin = moment().startOf('day').add(start, 'hours');

  let arr = [];
  for (
    let i = 1, x = begin;
    x.diff(moment().startOf('day').add(end), 'minutes') <= 0;
    i++
  ) {
    arr.push(x.format('HH:mm'));
    x.add(step, 'minutes');
  }

  return arr;
}

/**
 * gets data and returns a tag with color
 * @param {string} row text or number for colorization
 * @returns
 */
export function ColorizeTag({ row, style, ...other }) {
  /**
   * @type {string}
   */
  let number = typeof row === 'string' ? row : `${row}`;

  // console.log((1.2).toString)

  number = number.replace(/[% a-zA-Z]/g, '');
  if (number === 0) {
    return (
      <span className="text-slate-700" dir="ltr" style={style} {...other}>
        {row}
      </span>
    );
  } else if (number > 0) {
    return (
      <span className="text-emerald-500" dir="ltr" style={style} {...other}>
        {row}
      </span>
    );
  } else if (number < 0) {
    return (
      <span className="text-red-500" dir="ltr" style={style} {...other}>
        {row}
      </span>
    );
  }
  return (
    <span
      className="bg-slate-700 rounded-sm text-white px-1"
      dir="ltr"
      style={style}
      {...other}
    >
      {row}
    </span>
  );
}

/**
 * creates a link
 * @param {row} link data or specia key
 */
export function LinkTag({ link, text, style }) {
  return (
    <Link to={link}>
      <Text size="sm" color="blue" style={style}>
        {text}
      </Text>
    </Link>
  );
}

/**
 * gets data and returns a tag with color and an arrow top or bottom
 * @param {string} row text or number for colorization
 * @returns
 */
export function ColorizeTagArrow({ row, style, ...other }) {
  /**
   * @type {string}
   */
  let number = typeof row === 'string' ? row : row.toString();

  number = number.replace(/[% a-zA-Z]/g, '');
  if (number === 0) {
    return (
      <span
        className="rounded-sm text-white px-1"
        dir="ltr"
        style={style}
        {...other}
      >
        {row}
      </span>
    );
  } else if (number > 0) {
    return (
      <span
        className="rounded-sm text-emerald-500 px-1 inline-flex items-center text-sm"
        dir="ltr"
        style={style}
        {...other}
      >
        <svg
          className="w-2 h-2 fill-emerald-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path d="M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z" />
        </svg>
        {row}
      </span>
    );
  } else if (number < 0) {
    return (
      <span
        className="rounded-sm text-red-500 px-1 inline-flex items-center text-sm"
        dir="ltr"
        style={style}
        {...other}
      >
        <svg
          className="w-2 h-2 fill-red-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z" />
        </svg>
        {row}
      </span>
    );
  }
  return (
    <span
      className="rounded-sm text-white px-1"
      dir="ltr"
      style={style}
      {...other}
    >
      {row}
    </span>
  );
}

export function useConfig(array, key, callback) {
  const [cookies] = useCookies(['token']);
  let item = array;
  function checker(item) {
    if (cookies.token && cookies.token !== '') {
      if (item.active) return item;
      else return { ...item, allow: 'sub' };
    } else {
      if (item.active) return item;
      else return { ...item, allow: 'login' };
    }
  }
  if (callback) return callback(checker);
  item = item.find((item) => item.key === key);
  return checker(item);
}

export function useData(item, params, ...other) {
  return useQuery({
    ...other,
    enabled: item.allow ? false : true,
    queryKey: [item.key, params],
    queryFn: async (key, page) => {
      try {
        let { data, status } = await getEveryFeeder(
          `${item.feeder_url}${params ? params : ''}`
        );
        if (status === 204) throw { response: { status: 204 } };
        return data;
      } catch (error) {
        let {
          response: { status },
        } = error;
        if (status === 404) throw new Error(404);
        throw new Error(status);
      }
    },
    staleTime: item.refresh_time * 1000,
    refetchInterval: item.refresh_time * 1000,
    retry: 2,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    onError: (err) => {
      return err;
    },
  });
}

export function ShowErrors({ status }) {
  switch (status.message) {
    case '404':
      return <Text>آدرس درخواستی اشتباه است</Text>;
    case '204':
      return <Text>داده ای برای نمایش وجود ندارد</Text>;
    default:
      return <Text>مشکلی پیش آمده است</Text>;
  }
}

function containsNumbers(str) {
  return /\d/.test(str);
}

/**
 *
 * @param {*} number  number to be formatted
 * @returns
 */
export function convertNumber(number) {
  if (containsNumbers(number) === false) return number;
  let convertedNumber = number;
  if (/M/g.test(number))
    convertedNumber = +number.replace(/[% a-zA-Z]/g, '') * 1000000;
  else if (/B/g.test(number))
    convertedNumber = +number.replace(/[% a-zA-Z]/g, '') * 1000000000;
  else if (/K/g.test(number))
    convertedNumber = +number.replace(/[% a-zA-Z]/g, '') * 1000;
  return convertedNumber;
}

/**
 *
 * @param {array} arr array of objects
 * @param {number} min minimum value
 * @param {number} max maximum value
 * @param {string} row key of row
 * @returns
 */
export function filterWithMinAndMax(arr, min, max, row) {
  return arr.filter(
    (x) =>
      (min === null || convertNumber(x[row]) >= convertNumber(min)) &&
      (max === null || convertNumber(x[row]) <= convertNumber(max))
  );
}

export function modalOnSubmit({
  filters,
  setFilters,
  setModal,
  setFilteredData,
  fullData,
  id,
  setModalFilter,
}) {
  // this.setState({filters});
  /**
   * filter each row depends row
   * @param {array} arr
   * @param {number} min
   * @param {number} max
   * @param {string} row
   * @returns
   */
  setModal((prev) => !prev);
  if (filters.length === 0) {
    setFilteredData(fullData);
    setFilters([]);
    return;
  }

  let data;
  setFilteredData((prev) => {
    data = prev;
    return data;
  });
  data = mainFilterOfModal({ array: filters, data });
  setFilters(filters);
  setFilteredData(data);
  setModalFilter({ id, filters });
}

export function mainFilterOfModal({ array, data }) {
  array.map((item) => {
    data = filterWithMinAndMax(
      data,
      item.min !== '' ? item.min : null,
      item.max !== '' ? item.max : null,
      `n${+item.name - 1}`
    );
  });
  return data;
}

/**
 * custom sort
 * it will use convert number function to convert numbers with M,B,K to real number
 * also it can sort string
 * @param {array} rows array of objects
 * @param {any} selector
 * @param {string} direction
 */

export function customSort(rows, selector, direction) {
  const sortedRows = [...rows];
  sortedRows.sort((a, b) => {
    const aVal = convertNumber(selector(a));
    const bVal = convertNumber(selector(b));

    let compare = 0;

    if (aVal < bVal) compare = -1;
    if (aVal > bVal) compare = 1;
    return direction === 'desc' ? compare * -1 : compare;
  });
  return sortedRows;
}
