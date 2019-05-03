import {createLogger} from "./src";

const logger = createLogger();
console.dir(logger,{depth:4})
const producer = process.env.PRODUCER || 'producer-1';

let i = 0;
setInterval(() => {
    logger.trace({msg: "Some log message", producer: producer, counter: i});
    i++
}, 1000);
