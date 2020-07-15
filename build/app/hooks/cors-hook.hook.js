"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@foal/core");
function CorsHook() {
    return core_1.Hook(() => response => {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
        response.setHeader('Access-Control-Allow-Credentials', 'true');
    });
}
exports.CorsHook = CorsHook;
//# sourceMappingURL=cors-hook.hook.js.map