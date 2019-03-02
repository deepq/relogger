const Relogger = require("./relogger");
const Rereader = require("./rereader");

const methods = {
    'debug': 'debug',
    'info': 'info',
    'warning': 'warning',
    'error': 'error',
    'log': 'info',
    'trace': 'trace',
    'fatal': 'fatal'
};

const defaultConfiguration = {
    //redis configuration
    redis: {
        host: "localhost",
        port: 6379,
        prefix: "relogger:"
    },
    facility: "app",
    queue: "queue",
    //workerQueue: "" //to be defined by rereader instance
    serializer: "JSON",
    transports: [
        {type: "console", formatter: null},
        //{type: "file", formatter: null},
    ],
};

function createLogger(configuration) {
    const handler = {
        get(target, method) {
            if (!methods.hasOwnProperty(method)) return;
            return (...args) => {
                const message = target.logger[methods[method]](...args);
                target.pushMessage(message);
            };
        }
    };
    return new Proxy(new Relogger({...defaultConfiguration, ...configuration}), handler);
}

function createReader(configuration) {
    return new Rereader({...defaultConfiguration, ...configuration});
}

module.exports = {
    createLogger,
    createReader
};