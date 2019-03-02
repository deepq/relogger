const {createLogger, createReader} = require("./index");
const reader = createReader({workerQueue:'worker-1'});
reader.getMessage();