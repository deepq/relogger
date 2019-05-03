import {Relogger} from "./relogger";
import {Rereader} from "./rereader";

const methods: any = {
    'debug': 'debug',
    'info': 'info',
    'warn': 'warn',
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

export function createLogger(configuration: any = {}) {
    const handler = {
        get(target: any, method: string) {
            if (!methods.hasOwnProperty(method)) return;
            return (...args: any) => {
                const message = target.logger[methods[method]](...args);
                target.pushMessage(message);
            };
        }
    };
    return new Proxy(new Relogger({...defaultConfiguration, ...configuration}), handler);
}

export function createReader(configuration: any = {}): Rereader {
    return new Rereader({...defaultConfiguration, ...configuration});
}
