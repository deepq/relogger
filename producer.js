const {createLogger, createReader} = require("./index");
const logger = createLogger();
let i = 0;
setInterval(() => {
    logger.info({msg: "Some log message", counter: i});
    i++
}, 1000);
