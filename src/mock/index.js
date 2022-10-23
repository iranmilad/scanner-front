import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import feeder from "./feeders.json" assert {type: "json"}


let mock = new MockAdapter(axios);

let feeds = feeder.item;
/**
 * @type {array}
 */
let items = feeds.find(item => item.name === "data").item;

items = items.map(item => {
  if("item" in item){
    item.map(children => {
      let url = children.request.url.raw.replace(children.request.url.host[0],"");
      let regex = /:[a-zA-Z]*/gm;
      url = url
    })
  }
})

console.log(items)


export default mock;