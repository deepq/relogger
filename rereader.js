const assert = require("assert");
const redis = require("redis");
const util = require("util");
const createSerializer = require("./serializer");
const createTransport = require("./transports");
const EventEmitter = require("events");

class TransportEmitter extends EventEmitter {
}

/**
 * Consumer logger
 */
class Rereader {
    constructor(configuration = {}) {
        this.queue = configuration.queue;
        this.workerQueue = configuration.workerQueue;
        assert(this.workerQueue, "[workerQueue] name is not defined!");

        this.redis = redis.createClient(configuration.redis);
        this.serializer = createSerializer(configuration.serializer);
        this.transports = configuration.transports;

        this.fetchQueue = util.promisify(this.redis.brpoplpush).bind(this.redis);
        this.transportEmitter = new TransportEmitter();
        this.registerTransports();
    }

    getMessage() {
        return this.fetchQueue(this.queue, this.workerQueue, 0)
            .then(message => this.processMessage(message))
            .then(pkt => this.transportEmitter.emit("message", pkt))
            .then(() => this.getMessage())
    }

    processMessage(message) {
        const pkt = this.serializer.deserialize(message);
        this.redis.lrem(this.workerQueue, -1, message);
        return pkt;
    }

    registerTransports() {
        this.transports.forEach(transport => {
            transport.instance = createTransport(transport, this.transportEmitter);
        })
        console.log(this.transports);
    }

}

module.exports = Rereader;