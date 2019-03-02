const assert = require("assert");

class Logger {
    constructor(configuration = {}) {
        this.facility = configuration.facility;
        assert(this.facility, "[facility] name is not defined!");
    }

    trace() {
        return this.prepareMessage(Date.now(), "trace", Array.from(arguments));
    }

    debug() {
        return this.prepareMessage(Date.now(), "debug", Array.from(arguments));
    }

    warn() {
        return this.prepareMessage(Date.now(), "warn", Array.from(arguments));
    }

    info() {
        return this.prepareMessage(Date.now(), "info", Array.from(arguments));
    }

    error() {
        return this.prepareMessage(Date.now(), "error", Array.from(arguments));
    }

    fatal() {
        return this.prepareMessage(Date.now(), "fatal", Array.from(arguments));
    }

    prepareMessage(date, severity, message) {
        return {
            date,
            facility: this.facility,
            severity,
            message
        };
    }
}

module.exports = Logger;