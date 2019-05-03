import {createClient, RedisClient} from "redis";
import {createSerializer} from "./serializer";
import {Logger} from "./logger";
import {LoggerConfiguration, Serializer} from "./interfaces";

/**
 * Producer logger
 */
export class Relogger {
    private readonly queue: string;
    private redis: RedisClient;
    public logger: Logger;
    private serializer: Serializer;

    constructor(configuration: LoggerConfiguration) {
        this.queue = configuration.queue;
        this.redis = createClient(configuration.redis);

        this.logger = new Logger(configuration.facility);
        this.serializer = createSerializer(configuration.serializer);
    }

    public pushMessage(message: any) {
        this.redis.lpush(this.queue, this.serializer.serialize(message));
    }
}
