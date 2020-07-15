"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@foal/core");
const controllers_1 = require("./controllers");
class AppController {
    constructor() {
        this.subControllers = [
            core_1.controller('/api', controllers_1.ApiController),
            core_1.controller('/auth', controllers_1.AuthController),
        ];
    }
}
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map