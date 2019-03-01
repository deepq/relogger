const Relogger = require("./relogger");

const methods = {
    'debug': 'debug',
    'info': 'info',
    'warning': 'warning',
    'error': 'error',
    'log': 'info',
    'trace': 'trace',
    'fatal': 'fatal'
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
    return new Proxy(new Relogger(configuration), handler);
}

module.exports = {
    createLogger
};