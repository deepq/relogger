class Logger {
    constructor(configuration = {}) {
        this.facility = configuration.facility || "app";
    }

    trace() {
        return this.prepareMessage(new Date(), "trace", Array.from(arguments));
    }

    debug() {
        return this.prepareMessage(new Date(), "debug", Array.from(arguments));
    }

    warn() {
        return this.prepareMessage(new Date(), "warn", Array.from(arguments));
    }

    info() {
        return this.prepareMessage(new Date(), "info", Array.from(arguments));
    }

    error() {
        return this.prepareMessage(new Date(), "error", Array.from(arguments));
    }

    fatal() {
        return this.prepareMessage(new Date(), "fatal", Array.from(arguments));
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