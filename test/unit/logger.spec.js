"use strict";
const Logger = require("../../logger");

describe("Test logger", () => {

    it("should log message with 'trace' severity", () => {
        const logger = new Logger();
        const sourceMessage = "some log message";
        const destMessage = {
            date: new Date(),
            facility: 'app',
            severity: 'trace',
            message: ['some log message']
        };
        expect(logger.trace(sourceMessage)).toEqual(destMessage);
    });

    it("should format message", () => {
        const logger = new Logger();
        const sourceMessage = "some log message";
        expect(logger.prepareMessage(sourceMessage)).toHaveProperty('date');
        expect(logger.prepareMessage(sourceMessage)).toHaveProperty('facility');
        expect(logger.prepareMessage(sourceMessage)).toHaveProperty('severity');
        expect(logger.prepareMessage(sourceMessage)).toHaveProperty('message');
    });

    it("should pass facility from configuration", () => {
        const logger = new Logger({facility:'myapp'});
        const expected = "myapp";
        expect(logger.facility).toEqual(expected);
    });

});