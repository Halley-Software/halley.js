import { STATUS_CODES } from "node:http";

/* if (Object.getPrototypeOf(STATUS_CODES) === Object.prototype) {
    console.log("LOL");
}; */

const statusArray = Object.entries(STATUS_CODES)

statusArray.forEach((index) => {
    console.log(index[0])
})