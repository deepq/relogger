"use strict";

import {createLogger, createReader} from "../../src";

describe("Test logger and reader", () => {
    it("should create logger proxy instance", () => {
        const logger = createLogger();
        expect(logger).toHaveProperty('log');
        expect(logger).toHaveProperty('trace');
        expect(logger).toHaveProperty('info');
        expect(logger).toHaveProperty('error');
        expect(logger).toHaveProperty('fatal');
        expect(logger).toHaveProperty('warn');
    });

    it("should create reader instance", () => {
        const reader = createReader({workerQueue: "queue-1"});
        expect(reader).toHaveProperty('getMessage');
    });
});
