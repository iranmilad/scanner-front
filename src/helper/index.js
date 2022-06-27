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
export function ColorizeTag({ row }) {
  // remove letters from row and convert to number
  let regex = new RegExp(/[a-zA-Z]/, 'g');
  let number = row;
  regex.exec(row)
    ? (number = row.replace(row.match(regex), ''))
    : (number = row);
  if (number === 0) {
    return (
      <span className="bg-slate-700 rounded-sm text-white px-1" dir="ltr">
        {row}
      </span>
    );
  } else if (number > 0) {
    return (
      <span className="bg-emerald-500 rounded-sm text-white px-1" dir="ltr">
        {row}
      </span>
    );
  } else if (number < 0) {
    return (
      <span className="bg-red-500 rounded-sm text-white px-1" dir="ltr">
        {row}
      </span>
    );
  }
  return (
    <span className="bg-slate-700 rounded-sm text-white px-1" dir="ltr">
      {row}
    </span>
  );
}

/**
 * creates a link
 * @param {row} link data or specia key
 */
export function LinkTag({ link, text }) {
  return (
    <Link to={link}>
      <Text size="sm" color="blue" sx={{ width: '150px' }}>
        {text}
      </Text>
    </Link>
  );
}
