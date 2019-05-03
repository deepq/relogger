import {EventEmitter} from "events";
import {LogPacket, Severity, TransportConfiguration, Transport, TransportFormatter, TransportType} from "./interfaces";

class ConsoleTransport implements Transport {
    public formatter: TransportFormatter;

    constructor(transport: TransportConfiguration, emitter: EventEmitter) {
        this.formatter = transport.formatter;
        emitter.on("message", (message) => this.processMessage(message));
    }

    processMessage(message: LogPacket) {
        switch (message.severity) {
            case Severity.Error:
                console.error(message);
                break;
            case Severity.Info:
                console.info(message);
                break;
            case Severity.Warn:
                console.warn(message);
                break;
            case Severity.Debug:
                console.debug(message);
                break;
            default:
                console.log(message);
        }
    }

}

export function createTransport(transport: TransportConfiguration, emitter: EventEmitter) {
    switch (transport.type) {
        case TransportType.Console: {
            return new ConsoleTransport(transport, emitter)
        }
    }
}
