"use strict";

import {Logger} from "../../src/logger";
import {Severity} from "../../src/interfaces";

describe("Test logger", () => {

    it("should log message with 'trace' severity", () => {
        const logger = new Logger('app');
        const sourceMessage = "some log message";
        const destMessage = {
            facility: 'app',
            severity: 'trace',
            message: ['some log message']
        };
        expect(logger.trace(sourceMessage)).toMatchObject(destMessage);
        expect(logger.trace(sourceMessage)).toHaveProperty('date');
    });

    it("should log message with 'debug' severity", () => {
        const logger = new Logger('app');
        const sourceMessage = "some log message";
        const destMessage = {
            facility: 'app',
            severity: 'debug',
            message: ['some log message']
        };
        expect(logger.debug(sourceMessage)).toMatchObject(destMessage);
        expect(logger.debug(sourceMessage)).toHaveProperty('date');
    });

    it("should log message with 'warn' severity", () => {
        const logger = new Logger('app');
        const sourceMessage = "some log message";
        const destMessage = {
            facility: 'app',
            severity: 'warn',
            message: ['some log message']
        };
        expect(logger.warn(sourceMessage)).toMatchObject(destMessage);
        expect(logger.warn(sourceMessage)).toHaveProperty('date');
    });

    it("should log message with 'info' severity", () => {
        const logger = new Logger('app');
        const sourceMessage = "some log message";
        const destMessage = {
            facility: 'app',
            severity: 'info',
            message: ['some log message']
        };
        expect(logger.info(sourceMessage)).toMatchObject(destMessage);
        expect(logger.info(sourceMessage)).toHaveProperty('date');
    });

    it("should log message with 'error' severity", () => {
        const logger = new Logger('app');
        const sourceMessage = "some log message";
        const destMessage = {
            facility: 'app',
            severity: 'error',
            message: ['some log message']
        };
        expect(logger.error(sourceMessage)).toMatchObject(destMessage);
        expect(logger.error(sourceMessage)).toHaveProperty('date');
    });

    it("should log message with 'fatal' severity", () => {
        const logger = new Logger('app');
        const sourceMessage = "some log message";
        const destMessage = {
            facility: 'app',
            severity: 'fatal',
            message: ['some log message']
        };
        expect(logger.fatal(sourceMessage)).toMatchObject(destMessage);
        expect(logger.fatal(sourceMessage)).toHaveProperty('date');
    });

    it("should format message", () => {
        const logger = new Logger('app');
        const sourceMessage = "some log message";
        expect(logger.prepareMessage(Date.now(), Severity.Debug, sourceMessage)).toHaveProperty('date');
        expect(logger.prepareMessage(Date.now(), Severity.Debug, sourceMessage)).toHaveProperty('facility');
        expect(logger.prepareMessage(Date.now(), Severity.Debug, sourceMessage)).toHaveProperty('severity');
        expect(logger.prepareMessage(Date.now(), Severity.Debug, sourceMessage)).toHaveProperty('message');
    });

});
