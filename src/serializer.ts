class Serializer {
    public opts: any;

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


class JSONSerializer extends Serializer {

    serialize(message: any) {
        if (typeof message !== 'object')
            throw new Error('SERIALIZE_ERROR');

        try {
            return JSON.stringify(message);
        } catch (e) {
            throw new Error('SERIALIZE_ERROR');
        }
    }

    deserialize(message: string) {
        if (typeof message !== 'string')
            throw new Error('DESERIALIZE_ERROR');
        try {
            return JSON.parse(message);
        } catch (e) {
            throw new Error('DESERIALIZE_ERROR');
        }
    }
}

export function createSerializer(serializer: string, opts: any) {
    switch (serializer) {
        case 'JSON':
            return new JSONSerializer(opts);
        default:
            return new Serializer(opts);
    }
}

