import colors from "tailwindcss/colors";

// a function for generat 360 random number from 400 to 260 with 10 step
export function randomNumber(){
  let arr = [];
  for (let i = 0; i < 50; i++) {
    arr.push(Math.floor(Math.random() * (400 - 260) + 260));
  }
  return arr;
};
// a function for generate clock time from 9:00 to 13:00 with every 15 minutes
export function clockTime(){
  let arr = [];
  for (let i = 9; i < 14; i++) {
    for (let j = 0; j < 4; j++) {
      arr.push(i + ":" + (j * 15));
    }
  }
  return arr;
};
// export function clockTime(){
//   let arr = [];
//   for (let i = 9; i < 15; i++) {
//     for (let j = 0; j < 60; j++) {
//       arr.push(`${i}:${j}`);
//     }
//   }
//   return arr;
// };

/**
 * change data format for table
 * @param {object} param - Object params
 * @param {array} param.dataSelf
 * @param {object} param.config
 * @returns {object} 
 */
export function tableWorker({config,dataSelf}){
  if(! config) Error('config is not defined');
  if(! dataSelf) Error('data is not defined');
  let instanceOfData = [...dataSelf];
  instanceOfData.map((item,index)=>{
    for(let [key,value] of Object.entries(item)){
      if(config[key]){
        if(config[key].link){
          instanceOfData[index][key] = <a target="_blank" style={{color:colors.blue[500]}} href={`${config[key]?.href}/${item.originalId}`}>{value}</a>
        }
        else if (config[key].colorize){
          /**
           * @type {string}
           */
          let dataNumber = value;
          dataNumber = dataNumber.replace(/[a-zA-Z]/g, '');
        }
      }
    }
  });
}