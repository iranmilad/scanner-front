import Mock from "locmock";
import config from "./config.json";


Mock.onGet("/home/data").reply(200,config)