// a function for generat 360 random number from 400 to 260 with 10 step
export function randomNumber(){
  let arr = [];
  for (let i = 0; i < 50; i++) {
    arr.push(Math.floor(Math.random() * (400 - 260) + 260));
  }
  return arr;
};
// a function for generate clock time from 9:00 to 14:00 with every 1 min
export function clockTime(){
  let arr = [];
  for (let i = 9; i < 15; i++) {
    for (let j = 0; j < 60; j++) {
      arr.push(`${i}:${j}`);
    }
  }
  return arr;
};
