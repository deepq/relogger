import {createClient, RedisClient} from "redis";
import {createSerializer} from "./serializer";
import * as util from 'util'
import {LoggerConfiguration, LogPacket, Serializer, TransportConfiguration} from "./interfaces";
import {createTransport} from "./transports";
import {EventEmitter} from "events";

class TransportEmitter extends EventEmitter {
}

/**
 * Consumer logger
 */
export class Rereader {
    private queue: string;
    private readonly workerQueue: string;
    private readonly redis: RedisClient;
    private serializer: Serializer;
    private readonly transports: TransportConfiguration[];
    private fetchQueue: (queue: string, workerQueue: string, count: number) => Promise<any>;
    private readonly transportEmitter: TransportEmitter;

    constructor(configuration: LoggerConfiguration) {
        this.queue = configuration.queue;
        this.workerQueue = configuration.workerQueue || "";
        if (!this.workerQueue) {
            throw new Error("NO_WORKER_QUEUE");
        }
        this.redis = createClient(configuration.redis);
        this.serializer = createSerializer(configuration.serializer);
        this.transports = configuration.transports;

        this.fetchQueue = util.promisify(this.redis.brpoplpush).bind(this.redis);
        this.transportEmitter = new TransportEmitter();
        this.registerTransports();
    }

    public getMessage(): Promise<any> {
        return this.fetchQueue(this.queue, this.workerQueue, 0)
            .then((message: string) => this.processMessage(message))
            .then((pkt: LogPacket) => this.transportEmitter.emit("message", pkt))
            .then(() => this.getMessage())
    }

    private processMessage(message: string): LogPacket {
        const pkt = this.serializer.deserialize(message);
        this.redis.lrem(this.workerQueue, -1, message);
        return pkt;
    }

    private registerTransports() {
        this.transports.forEach(transport => {
            transport.instance = createTransport(transport, this.transportEmitter);
        });
    }

}
