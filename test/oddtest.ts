import { STATUS_CODES } from "node:http"

const statusArray = Object.entries(STATUS_CODES)

statusArray.forEach((index) => {
    console.log(index[0])
})

