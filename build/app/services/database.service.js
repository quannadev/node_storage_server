"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@foal/core");
const mongoose_1 = require("mongoose");
const logger_service_service_1 = require("./logger-service.service");
class Database {
    constructor() {
        this.logger = new logger_service_service_1.LoggerService();
        this.onConnect();
    }
    onConnect() {
        const uri = process.env.MONGODB || core_1.Config.get('mongodb.uri');
        mongoose_1.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
        this.logger.info_init('Database connected!!!');
    }
    static init() {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }
}
exports.Database = Database;
//# sourceMappingURL=database.service.js.map