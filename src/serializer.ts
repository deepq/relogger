import {Serializer, SerializerOptions, SerializerType} from "./interfaces";

export class BaseSerializer implements Serializer {
    public opts: SerializerOptions;

    constructor(opts = {}) {
        this.opts = opts;
    }

    serialize(message: any) {
        return message;
    }

    deserialize(message: any) {
        return message;
    }
}


export class JSONSerializer extends BaseSerializer {

    serialize(message: any): string {
        if (typeof message !== 'object')
            throw new Error('SERIALIZE_ERROR');

        try {
            return JSON.stringify(message);
        } catch (e) {
            throw new Error('SERIALIZE_ERROR');
        }
    }

    deserialize(message: string): any {
        if (typeof message !== 'string')
            throw new Error('DESERIALIZE_ERROR');
        try {
            return JSON.parse(message);
        } catch (e) {
            throw new Error('DESERIALIZE_ERROR');
        }
    }
}

export function createSerializer(serializer: SerializerType, opts?: SerializerOptions): Serializer {
    switch (serializer) {
        case SerializerType.JSON:
            return new JSONSerializer(opts);
        default:
            return new BaseSerializer(opts);
    }
}

