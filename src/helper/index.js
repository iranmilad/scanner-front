import colors from 'tailwindcss/colors';
import ls from 'localstorage-slim';
import { Link } from 'react-router-dom';
import { Text } from '@mantine/core';

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
export function ColorizeTag({ row, style, ...other }) {
  /**
   * @type {string}
   */
  let number = typeof row === 'string' ? row : `${row}`;

  // console.log((1.2).toString)

  number = number.replace(/[% a-zA-Z]/g, '');
  if (number === 0) {
    return (
      <span
        className="text-slate-700"
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
        className="text-emerald-500"
        dir="ltr"
        style={style}
        {...other}
      >
        {row}
      </span>
    );
  } else if (number < 0) {
    return (
      <span
        className="text-red-500"
        dir="ltr"
        style={style}
        {...other}
      >
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

const minAndMax = (arr, min, max) =>
  arr.map((e) => ({
    ...e,
    points: e.points.filter(
      ({ y }) => (min === null || y >= min) && (max === null || y <= max)
    ),
  }));
