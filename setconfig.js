// This file fetchs main config from server and will write in a file

const axios = require("axios");
const dotenv = require("dotenv");
const fs = require("fs");
const Url = require("url-parse");
dotenv.config();



async function run() {
  try {
    console.log('FETCHING ...');
    let login = null;
    if (process.argv.includes('login')) {
      login = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_USER_FEED_URL}/auth/login`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          mobile: '09374039436',
          password: 'dedsec00',
        }),
      });
    }
    let configres = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_USER_FEED_URL}/home/data`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${login && login.data.data.access_token}`,
      },
    });
    let chartAndtables = configres.data.chartAndtables ;
    chartAndtables.map(item => {
      let url = new Url(item.feeder_url);
      item.feeder_url = item.feeder_url.replace(url.origin,"")
      return item;
    });
    configres.data.chartAndtables = chartAndtables;
    await fs.writeFileSync(
      './src/mock/config.json',
      JSON.stringify(configres.data, null, 4),
      (err) => {
        if (err) throw err;
      }
    );
    console.log("DONE !")
  } catch (error) {
    console.log('FAILED');
    console.log(error)
  }
}

run();