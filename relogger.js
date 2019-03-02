const redis = require("redis");
const Logger = require("./logger");
const createSerializer = require("./serializer");

/**
 * Producer logger
 */
class Relogger {
    constructor(configuration = {}) {
        this.queue = configuration.queue;
        this.redis = redis.createClient(configuration.redis);

        this.logger = new Logger({facility: configuration.facility});
        this.serializer = createSerializer(configuration.serializer);
    }

    pushMessage(message) {
        this.redis.lpush(this.queue, this.serializer.serialize(message));
    }
}

module.exports = Relogger;