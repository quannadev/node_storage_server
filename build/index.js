"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
// std
const http = require("http");
// 3p
const core_1 = require("@foal/core");
// App
const app_controller_1 = require("./app/app.controller");
const services_1 = require("./app/services");
async function main() {
    const logger = new services_1.LoggerService();
    const app = core_1.createApp(app_controller_1.AppController);
    await services_1.Database.init();
    const httpServer = http.createServer(app);
    const port = core_1.Config.get2('port', 'number', 3001);
    httpServer.listen(port, () => {
        logger.info_init(`Listening on port ${port}...`);
    });
}
main()
    .catch(err => { console.error(err); process.exit(1); });
//# sourceMappingURL=index.js.map