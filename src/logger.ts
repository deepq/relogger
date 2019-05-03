import {Facility, Severity} from "./interfaces";

export class Logger {
    constructor(private facility: Facility) {
    }

    trace(...args: any) {
        return this.prepareMessage(Date.now(), Severity.Trace, Array.from(args));
    }

    debug(...args: any) {
        return this.prepareMessage(Date.now(), Severity.Debug, Array.from(args));
    }

    warn(...args: any) {
        return this.prepareMessage(Date.now(), Severity.Warn, Array.from(args));
    }

    info(...args: any) {
        return this.prepareMessage(Date.now(), Severity.Info, Array.from(args));
    }

    error(...args: any) {
        return this.prepareMessage(Date.now(), Severity.Error, Array.from(args));
    }

    fatal(...args: any) {
        return this.prepareMessage(Date.now(), Severity.Fatal, Array.from(args));
    }

    prepareMessage(date: number, severity: Severity, message: any) {
        return {
            date,
            facility: this.facility,
            severity,
            message
        };
    }
}
