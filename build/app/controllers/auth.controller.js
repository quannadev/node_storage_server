"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@foal/core");
const services_1 = require("../services");
class AuthController {
    foo() {
        return new core_1.HttpResponseOK();
    }
    async doLogin(ctx) {
        const { email, password } = ctx.request.body;
        const data = await new services_1.UserService().doLogin(email, password);
        if (data.status) {
            return new core_1.HttpResponseOK(data);
        }
        return new core_1.HttpResponseBadRequest(data);
    }
    async doSignUp(ctx) {
        const { email, password, role } = ctx.request.body;
        const data = await new services_1.UserService().addUser(email, password, role);
        if (data.status) {
            return new core_1.HttpResponseOK(data);
        }
        return new core_1.HttpResponseBadRequest(data);
    }
}
__decorate([
    core_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "foo", null);
__decorate([
    core_1.Post('/sign_in'),
    core_1.ValidateBody({
        additionalProperties: false,
        properties: {
            email: {
                type: 'string',
                format: 'email'
            },
            password: { type: 'string' }
        },
        required: [
            'email',
            'password'
        ],
        type: 'object',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.Context]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "doLogin", null);
__decorate([
    core_1.Post('/sign_up'),
    core_1.ValidateBody({
        additionalProperties: false,
        properties: {
            email: {
                type: 'string',
                format: 'email'
            },
            password: { type: 'string' }
        },
        required: [
            'email',
            'password'
        ],
        type: 'object',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.Context]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "doSignUp", null);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map