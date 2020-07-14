import * as winston from 'winston';

const {timestamp, printf} = winston.format;

const myFormat = printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

export class LoggerService {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            format    : winston.format.combine(
                timestamp(),
                myFormat),
            transports: [
                new winston.transports.Console({
                    level : 'info',
                    format: winston.format.simple(),
                }),
            ]

        });
    }

    info(msg: string) {
        this.logger.info(msg);
    }
    info_init(msg: string) {
        this.logger.info(`>>> ${msg}`)
    }
    warn(msg: string) {
        this.logger.warn(msg);
    }

    error(msg: string) {
        this.logger.error(msg);
    }


}
