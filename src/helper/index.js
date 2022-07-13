import colors from 'tailwindcss/colors';
import ls from 'localstorage-slim';
import { Link } from 'react-router-dom';
import { Text } from '@mantine/core';
import {BsArrowUpShort,BsArrowDownShort} from 'react-icons/bs'


// a function for generat 360 random number from 400 to 260 with 10 step
export function randomNumber() {
  let arr = [];
  for (let i = 0; i < 50; i++) {
    arr.push(Math.floor(Math.random() * (400 - 260) + 260));
  }
  return arr;
}
// a function for generate clock time from 9:00 to 13:00 with every 15 minutes
export function clockTime() {
  let arr = [];
  for (let i = 9; i < 14; i++) {
    for (let j = 0; j < 4; j++) {
      arr.push(i + ':' + j * 15);
    }
  }
  return arr;
}

/**
 * Set grid column
 */
export const gridColumn = (tabIndex, setState) => {
  let grid = ls.get('grids');
  if (grid === null) ls.set('grids', tabIndex);
  else ls.set('grids', tabIndex);
};

/**
 * gets data and returns a tag with color
 * @param {string} row text or number for colorization
 * @returns
 */
export function ColorizeTag({ row ,style, ...other}) {

  /**
   * @type {string}
   */
  let number = typeof row === 'string' ? row : row.toString();

  number = number.replace(/[% a-zA-Z]/g,'');
  if (number === 0) {
    return (
      <span className="bg-slate-700 rounded-sm text-white px-1" dir="ltr" style={style} {...other}>
        {row}
      </span>
    );
  } else if (number > 0) {
    return (
      <span className="bg-emerald-500 rounded-sm text-white px-1" dir="ltr" style={style} {...other}>
        {row}
      </span>
    );
  } else if (number < 0) {
    return (
      <span className="bg-red-500 rounded-sm text-white px-1" dir="ltr" style={style} {...other}>
        {row}
      </span>
    );
  }
  return (
    <span className="bg-slate-700 rounded-sm text-white px-1" dir="ltr" style={style} {...other}>
      {row}
    </span>
  );
}

/**
 * creates a link
 * @param {row} link data or specia key
 */
export function LinkTag({ link, text ,style}) {
  return (
    <Link to={link}>
      <Text size="sm" color="blue" sx={{ width: '150px' }} style={style}>
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
 export function ColorizeTagArrow({ row ,style, ...other}) {

  /**
   * @type {string}
   */
  let number = typeof row === 'string' ? row : row.toString();

  number = number.replace(/[% a-zA-Z]/g,'');
  if (number === 0) {
    return (
      <span className="rounded-sm text-white px-1" dir="ltr" style={style} {...other}>
        {row}
      </span>
    );
  } else if (number > 0) {
    return (
      <span className="rounded-sm text-emerald-500 px-1 inline-flex items-center text-sm" dir="ltr" style={style} {...other}>
        <BsArrowUpShort size={15} />
        {row}
      </span>
    );
  } else if (number < 0) {
    return (
      <span className="rounded-sm text-red-500 px-1 inline-flex items-center text-sm" dir="ltr" style={style} {...other}>
        <BsArrowDownShort size={15} />
        {row}
      </span>
    );
  }
  return (
    <span className="rounded-sm text-white px-1" dir="ltr" style={style} {...other}>
      {row}
    </span>
  );
}