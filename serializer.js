class Serializer {
    constructor(opts = {}) {
        this.opts = opts;
    }

    serialize(message) {
        return message;
    }

    deserialize(message) {
        return message;
    }
}


class JSONSerializer extends Serializer {

    serialize(message) {
        if (typeof message !== 'object')
            throw new Error('SERIALIZE_ERROR');

        try {
            return JSON.stringify(message);
        } catch (e) {
            throw new Error('SERIALIZE_ERROR');
        }
    }

    deserialize(message) {
        if (typeof message !== 'string')
            throw new Error('DESERIALIZE_ERROR');

        try {
            return JSON.parse(message);
        } catch (e) {
            throw new Error('DESERIALIZE_ERROR');
        }
    }
}

module.exports = (serializer, opts) => {
    switch (serializer) {
        case 'JSON':
            return new JSONSerializer(opts);
        default:
            return new Serializer(opts);
    }
};