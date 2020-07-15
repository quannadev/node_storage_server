"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const { timestamp, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
class LoggerService {
    constructor() {
        this.logger = winston.createLogger({
            format: winston.format.combine(timestamp(), myFormat),
            transports: [
                new winston.transports.Console({
                    level: 'info',
                    format: winston.format.simple(),
                }),
            ]
        });
    }
    info(msg) {
        this.logger.info(msg);
    }
    info_init(msg) {
        this.logger.info(`>>> ${msg}`);
    }
    warn(msg) {
        this.logger.warn(msg);
    }
    error(msg) {
        this.logger.error(msg);
    }
}
exports.LoggerService = LoggerService;
//# sourceMappingURL=logger-service.service.js.map