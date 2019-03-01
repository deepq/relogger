const redis = require("redis");
const Logger = require("./logger");
const createSerializer = require("./serializer");

/**
 * Producer logger
 */
class Relogger {
    constructor(configuration = {}) {
        const redisConfiguration = {
            host: 'localhost',
            port: 6379,
            prefix: "relogger:",
            ...configuration.redis || {}
        };

        this.queue = configuration.queue || "queue";
        this.redis = redis.createClient(redisConfiguration);

        this.logger = new Logger({facility: configuration.facility});
        this.serializer = createSerializer(configuration.serializer || 'JSON');
    }

    pushMessage(message) {
        this.redis.lpush(this.queue, this.serializer.serialize(message));
    }
}

module.exports = Relogger;