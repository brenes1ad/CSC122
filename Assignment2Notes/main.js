import { addup } from "./mylib.js"
//import * as mylib from "./mylib.js"

console.log(addup(2,9))
//console.log(mylib.addup(2,9))

//When using JavaScript within the browser(into HTML)     -CommonJS
//cost addup = require("./mylib.js").addup



import dayjs from "dayjs"
let today = dayjs()
console.log(today)
