class ConsoleTransport {
    constructor(transport, emitter) {
        this.formatter = transport.formatter;
        emitter.on("message", (message) => this.processMessage(message));
    }

    processMessage(message) {
        const severity = message.severity;
        if (console[severity]) {
            console[severity](message);
        } else {
            console.log(message);
        }
    }

}

function createTransport(transport, emitter) {
    switch (transport.type) {
        case "console": {
            return new ConsoleTransport(transport, emitter)
        }
    }
}

module.exports = createTransport;