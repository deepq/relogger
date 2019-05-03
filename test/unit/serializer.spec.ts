"use strict";

import {BaseSerializer, createSerializer, JSONSerializer} from "../../src/serializer";
import {SerializerType} from "../../src/interfaces";

describe("Base serializer test", () => {
    it("should create instance of base serializer", () => {
        const baseSerializer = createSerializer(SerializerType.Base);
        expect(baseSerializer).toBeInstanceOf(BaseSerializer);
        expect(baseSerializer).toHaveProperty('serialize');
        expect(baseSerializer).toHaveProperty('deserialize');
    });

    it("should serialize message", () => {
        const baseSerializer = createSerializer(SerializerType.Base);
        expect(baseSerializer.serialize("Test message")).toEqual("Test message");
        expect(baseSerializer.serialize({msg: "Test message"})).toEqual({msg: "Test message"});
    });

    it("should deserialize message", () => {
        const baseSerializer = createSerializer(SerializerType.Base);
        expect(baseSerializer.deserialize("Test message")).toEqual("Test message");
        expect(baseSerializer.deserialize({msg: "Test message"})).toEqual({msg: "Test message"});
    });
});

describe("JSON serializer test", () => {
    it("should create instance of json serializer", () => {
        const baseSerializer = createSerializer(SerializerType.JSON);
        expect(baseSerializer).toBeInstanceOf(JSONSerializer);
        expect(baseSerializer).toHaveProperty('serialize');
        expect(baseSerializer).toHaveProperty('deserialize');
    });

    it("should serialize message", () => {
        const jsonSerializer = createSerializer(SerializerType.JSON);
        const src = {msg: "Test message"};
        const dst = '{"msg":"Test message"}';
        expect(jsonSerializer.serialize(src)).toEqual(dst);
    });

    it("should deserialize message", () => {
        const jsonSerializer = createSerializer(SerializerType.JSON);
        const dst = {msg: "Test message"};
        const src = '{"msg":"Test message"}';
        expect(jsonSerializer.deserialize(src)).toEqual(dst);

    });

    it("should throw SERIALIZE_ERROR", () => {
        const jsonSerializer = createSerializer(SerializerType.JSON);
        expect(() => jsonSerializer.serialize("test")).toThrow("SERIALIZE_ERROR");

        function circular() {
            // @ts-ignore
            this.msg = "test";
            // @ts-ignore
            this.circular = this;
        }

        // @ts-ignore
        expect(() => jsonSerializer.serialize(new circular())).toThrow("SERIALIZE_ERROR")
    });

    it("should throw DESERIALIZE_ERROR", () => {
        const jsonSerializer = createSerializer(SerializerType.JSON);
        expect(() => jsonSerializer.deserialize({msg:"test"})).toThrow("DESERIALIZE_ERROR");
        expect(() => jsonSerializer.deserialize('{"a:1}')).toThrow("DESERIALIZE_ERROR");
    });
});
