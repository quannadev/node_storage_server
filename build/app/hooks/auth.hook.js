"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@foal/core");
const services_1 = require("../services");
function Auth() {
    return core_1.Hook(async (ctx, services) => {
        const auth = ctx.request.header('Authorization');
        if (auth) {
            const token = auth.split(' ')[1];
            const user = await new services_1.UserService().decodeToken(token);
            if (user) {
                ctx.user = user;
            }
            else {
                return new core_1.HttpResponseUnauthorized({
                    message: 'Token Invalid'
                });
            }
        }
        else {
            return new core_1.HttpResponseUnauthorized({
                message: 'UnAuth'
            });
        }
    });
}
exports.Auth = Auth;
//# sourceMappingURL=auth.hook.js.map