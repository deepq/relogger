/**
 * Serializers
 */
export interface SerializerOptions {
    [key: string]: string;
}

export enum SerializerType {
    Base = "",
    JSON = "JSON"
}

export interface Serializer {
    serialize: (message: any) => any;
    deserialize: (message: any) => any;
}

/**
 * Transports
 */
export enum TransportType {
    Console = "console"
}

export interface TransportConfiguration {
    formatter: TransportFormatter,
    type: TransportType,
    instance?: Transport;
}

export type TransportFormatter = (message: any) => any;

export interface Transport {
    processMessage: (message: LogPacket) => void;
}

/**
 * General interfaces
 */

export type Facility = string;

export enum Severity {
    Trace = "trace",
    Debug = "debug",
    Info = "info",
    Warn = "warn",
    Error = "error",
    Fatal = "fatal",
    Log = "log"
}

export interface LogPacket {
    date: number,
    facility: Facility,
    severity: Severity,
    message: string[]
}

interface RedisConfiguration {
    host: string,
    port: number,
    prefix: string
}

export interface LoggerConfiguration {
    redis: RedisConfiguration,
    facility: Facility,
    queue: string,
    serializer: SerializerType,
    transports: TransportConfiguration[],
    workerQueue?: string
}
