import {Config} from '@foal/core';
import { connect } from 'mongoose';
import {LoggerService} from './logger-service.service';
export class Database {
    private static instance: Database;
    private logger: LoggerService;
    
    constructor() {
        this.logger = new LoggerService();
        this.onConnect();
    }
    onConnect() {
        const uri = Config.getOrThrow('mongodb.uri', 'string');
        connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
        this.logger.info_init('Database connected!!!')
    }
    static init() {
        if (!this.instance) {
            this.instance = new Database()
        }
        return this.instance;
    }
}
